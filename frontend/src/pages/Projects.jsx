import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../services/projectService";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { getUsers } from "../services/userService";


const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingProject, setEditingProject] = useState(null);


  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProjects();
    fetchUsers()
  }, [page, search, status, priority]);

  useEffect(() => {

    setCurrentPage(1);

  }, [search, status, priority]);

  const handleCreateProject = async (projectData) => {
    try {

      const response = await createProject(projectData);

      alert(response.message);

      setIsModalOpen(false);

      fetchProjects();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create project"
      );

    }
  };

  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchProjects = async () => {

    try {

      const response = await getProjects({
        page: currentPage,
        search,
        status,
        priority
      });

      setProjects(response.data);
      setTotalPages(response.totalPages);
      setTotalProjects(response.totalProjects);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleEditClick = (project) => {

    setEditingProject(project);

    setIsModalOpen(true);

  };

  const handleUpdateProject = async (projectData) => {
    try {

      const response = await updateProject(
        editingProject._id,
        projectData
      );

      alert(response.message);

      setEditingProject(null);

      setIsModalOpen(false);

      fetchProjects();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update project"
      );

    }
  };

  // delete the project
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

      const response = await deleteProject(id);

      alert(response.message);

      fetchProjects();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete project"
      );

    }

  };



  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Project
        </button>

      </div>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Status</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

      </div>

      {
        projects.length === 0 ? (

          <p>No Projects Found</p>

        ) : (

          <div className="grid gap-6">

            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}

          </div>

        )
      }

      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>

          Page {currentPage} of {totalPages}

        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={
          editingProject
            ? handleUpdateProject
            : handleCreateProject
        }
        initialData={editingProject}
        buttonText={
          editingProject
            ? "Update"
            : "Create"
        }
        users={users}
      />

    </div>
  );
};

export default Projects;
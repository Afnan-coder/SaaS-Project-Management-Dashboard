import { useEffect, useState } from "react";
import { getProjects, createProject,updateProject } from "../services/projectService";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { getUsers } from "../services/userService";


const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchUsers()
  }, [page]);

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
        page,
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
                // onDelete={handleDelete}
              />
            ))}

          </div>

        )
      }

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
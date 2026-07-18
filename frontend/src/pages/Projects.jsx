import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [page]);

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

            {
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))
            }

            <ProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={(data) => console.log(data)}
              buttonText="Create"
            />

          </div>

        )
      }

    </div>

  );
};

export default Projects;
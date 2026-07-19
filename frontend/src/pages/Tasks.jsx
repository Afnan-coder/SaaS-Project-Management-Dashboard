import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import { getUsers } from "../services/userService";
import { getProjects } from "../services/projectService";

import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [projects, setProjects] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);


  const fetchTasks = async () => {

    try {

      const response = await getTasks();

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchUsers = async () => {

    try {

      const response = await getUsers();

      setUsers(response);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchProjects = async () => {

    try {

      const response = await getProjects();

      setProjects(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleCreateTask = async (taskData) => {

    try {

      const response = await createTask(taskData);

      alert(response.message);

      setIsModalOpen(false);

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create task"
      );

    }

  };

  const handleEditClick = (task) => {

    setEditingTask(task);

    setIsModalOpen(true);

  };

  const handleUpdateTask = async (taskData) => {

    try {

      const response = await updateTask(
        editingTask._id,
        taskData
      );

      alert(response.message);

      setEditingTask(null);

      setIsModalOpen(false);

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update task"
      );

    }

  };

  const handleDeleteTask = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

      const response = await deleteTask(id);

      alert(response.message);

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete task"
      );

    }

  };

  useEffect(() => {

    fetchTasks();

    fetchUsers();

    fetchProjects();

  }, []);

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Task
        </button>

      </div>

      <div className="grid gap-6">

        {tasks.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />

        ))}

      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={
          editingTask
            ? handleUpdateTask
            : handleCreateTask
        }
        initialData={editingTask}
        buttonText={
          editingTask
            ? "Update"
            : "Create"
        }
        users={users}
        projects={projects}
      />

    </div>

  );

};

export default Tasks;
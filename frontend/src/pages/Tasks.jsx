import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";

const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {

    try {

      const response = await getTasks();

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">

          Add Task

        </button>

      </div>

      <div className="grid gap-6">

        {tasks.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => { }}
            onDelete={() => { }}
          />

        ))}

      </div>

    </div>

  );

};

export default Tasks;
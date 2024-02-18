import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import ModalForAddTask from "../../components/AddTask";
import TaskCard from "../../components/TaskCard";
import { completeTask } from "../../utils/completeTask";
import { FaRegFlag } from "react-icons/fa";

function HomePage() {
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [complete, setCompleteTasks] = useState(0);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [filterData, setFilterData] = useState([]);

  const handleOpenModalToAddTask = () => {
    setVisible(true);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setData(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    filterTasks();
  }, [selectedPriority, data]); 

  const handleTaskSaved = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setData(JSON.parse(storedTasks));
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = data.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setData(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setVisible(true);
  };
  const handleCompleteTask = (task) => {
    const updatedTasks = data.map((storedTask) => {
      if (storedTask.id === task.id) {
        const updatedIsComplete = !storedTask.isComplete;
        setCompleteTasks((prevComplete) =>
          updatedIsComplete ? prevComplete + 1 : prevComplete - 1
        );

        return {
          ...storedTask,
          isComplete: updatedIsComplete
        };
      }
      return storedTask;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setData(updatedTasks);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedPriority(value);
  };

  const filterTasks = () => {
    let filteredTasks = data;
    if (selectedPriority !== "All") {
      filteredTasks = data.filter((task) => task.priority === selectedPriority);
    }
    setFilterData(filteredTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-3xl mb-10">Task Management</h1>
      <div className="flex flex-col gap-4 items-center md:flex-row md:gap-40 ">
        <Button
          title="Add task"
          color="primary"
          size="large"
          onClick={handleOpenModalToAddTask}
        />
        <div>
          <h4>Total Task: {filterData.length}</h4>
          <h4>Complete Task: {completeTask(filterData)}</h4>
        </div>
        <div className="flex flex-row gap-3 border-2 px-4 items-center ">
          <FaRegFlag className="mr-2" />
          <select
            name="priority"
            value={selectedPriority}
            onChange={handleChange}
            className="border-1 py-2 text-sm focus:border-transparent outline-none w-full"
          >
            <option value="All">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {visible && (
        <ModalForAddTask
          visible={visible}
          setVisible={setVisible}
          onTaskSaved={handleTaskSaved}
          task={editedTask}
          setEditedTask={setEditedTask}
        />
      )}

      {filterData.map((task, index) => (
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mt-5" key={index}>
          <TaskCard
            task={task}
            onDelete={() => handleDeleteTask(task.id)}
            onEdit={() => handleEditTask(task)}
            onCompleteTask = {()=>handleCompleteTask(task)}
          />
        </div>
      ))}
    </div>
  );
}

export default HomePage;

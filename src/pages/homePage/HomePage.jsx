import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import ModalForAddTask from "../../components/AddTask";
import TaskCard from "../../components/TaskCard";
import { completeTask } from "../../utils/completeTask";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [complete, setCompleteTasks] = useState(0);

  const handleOpenModalToAddTask = () => {
    setVisible(true);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setData(JSON.parse(storedTasks));
    }
  }, []);


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
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = storedTasks.map(storedTask => {
      if (storedTask.id === task.id) {
        const updatedIsComplete = !storedTask.isComplete;
        setCompleteTasks(prevComplete => updatedIsComplete ? prevComplete + 1 : prevComplete - 1);
  
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
          <h4>Total Task: {data.length}</h4>
          <h4>Complete Task: {completeTask(data)}</h4>
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

      {data.map((task, index) => (
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

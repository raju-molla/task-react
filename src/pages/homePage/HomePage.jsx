import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import ModalForAddTask from "../../components/AddTask";
import TaskCard from "../../components/TaskCard";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

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
    setEditedTask(task)
    setVisible(true); 
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-3xl mb-10">Task Management</h1>
      <Button
        title="Add task"
        color="primary"
        size="large"
        onClick={handleOpenModalToAddTask}
      />

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
          />
        </div>
      ))}
    </div>
  );
}

export default HomePage;

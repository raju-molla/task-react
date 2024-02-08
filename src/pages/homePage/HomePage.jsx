import React, { useEffect,useState } from "react";
import Button from "../../components/Button";
import ModalForAddTask from "../../components/AddTask";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const handleOpenModalToAddTask = () => {
    setVisible(true);
  };
  useEffect(()=>{
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setData(JSON.parse(storedTasks));
    }
    // just for remove my meaningless data
    // localStorage.removeItem('tasks');  
  },[])

  const handleTaskSaved = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setData(JSON.parse(storedTasks));
    }

  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl mb-10">Task Management</h1>
      <Button
        title="Add task"
        color="primary"
        size="large"
        onClick={handleOpenModalToAddTask}
      />
    
      {visible &&   <ModalForAddTask
          visible={visible}
          setVisible={setVisible}
          onTaskSaved={handleTaskSaved} 
        />}
      
      <div>
        {data.map((task, index) => (
          <div key={index}>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;


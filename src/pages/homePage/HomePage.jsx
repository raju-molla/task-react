import React from "react";
import { useState } from "react";
import Button from "../../components/Button";
import ModalForAddTask from "../../components/AddTask";

function HomePage() {
  const [visible, setVisible] = useState(false)

  const handleOpenModalToAddTask = () => {
    setVisible(true);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl mb-10">Task Management</h1>
      <Button title="Add task" color="primary" size="large" onClick={handleOpenModalToAddTask} />
    
      {
        visible && <ModalForAddTask visible={visible} setVisible={setVisible} />
      }
    </div>
  );
}

export default HomePage;

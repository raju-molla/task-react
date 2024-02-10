import React, { useEffect, useState } from "react";
import { FaRegFlag } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import Button from "./Button";

function ModalForAddTask({ visible, setVisible, onTaskSaved, task,setEditedTask }) {
  const [data, setData] = useState({
    id: 0,
    title: "",
    description: "",
    priority: "low",
    isComplete: false,
  });

  useEffect(() => {
    if (task) {
      setData(task);
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = () => {
    let updatedTasks;
    const storedTasks = localStorage.getItem("tasks");
    
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      if (task) {
        updatedTasks = parsedTasks.map((t) =>
          t.id === data.id ? data : t
        );
      } else {
        updatedTasks = [
          ...parsedTasks,
          { ...data, id: Date.now() },
        ];
      }
    } else {
      updatedTasks = [ { ...data, id: Date.now() } ];
    }
  
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditedTask(null);
  
    setData({
      id: 0,
      title: "",
      description: "",
      priority: "low",
      isComplete: false,
    });
    onTaskSaved();
    // setVisible();
  };
  

  const handleCancel = () => {
    setData({
      id: 0,
      title: "",
      description: "",
      priority: "low",
      isComplete: false,
    });
    setVisible(false);
  };

  return (
    <div
      className={`flex flex-col gap-3 border-2 rounded-md mt-5 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-5 py-4 ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <input
            type="text"
            name="title"
            className="border-0 font-bold text-base focus:border-transparent outline-none py-2 px-3"
            placeholder="Task name"
            value={data.title}
            onChange={handleChange}
          />
          <RxCross2 className="cursor-pointer" onClick={handleCancel} />
        </div>
        <textarea
          name="description"
          className="border-0 text-sm focus:border-transparent outline-none resize-none py-2 px-3"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          rows={2}
        />
      </div>
      <div className="flex flex-row justify-between  w-full">
        <div className="flex flex-row gap-3 border-2 px-4 items-center ">
          <FaRegFlag className="mr-2" />
          <select
            name="priority"
            value={data.priority}
            onChange={handleChange}
            className="border-1 py-2 text-sm focus:border-transparent outline-none w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <Button onClick={handleSave} title="Save" color="secondary" size="large" />
      </div>
    </div>
  );
}

export default ModalForAddTask;

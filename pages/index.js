import React, { useState, useEffect } from "react";
import { load } from "../src/funcs";

function index() {
  const [inputTask, setInputTask] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [addressAccount, setAddressAccount] = useState("");
  const [contracts, setContracts] = useState();
  const [tasks, setTask] = useState();

  const addTaskHandler = async () => {
    if (!inputTask) return;
    await contracts.addTask(inputTask, { from: addressAccount });
    setInputTask("");
    setRefresh(true);
  };
  const completeTaskHandler = async (_id) => {
    await contracts.completedTask(_id, { from: addressAccount });
    setRefresh(true);
  };
  const undoneTaskHandler = async (_id) => {
    await contracts.undoneTask(_id, { from: addressAccount });
    setRefresh(true);
  };

  useEffect(() => {
    if (!refresh) return;
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setContracts(e.todoContract);
      setTask(e.tasks);
    });
    setRefresh(false);
  }, []);

  return (
    <div className="">
      <div className="flex justify-center items-center text-4xl font-bold text-teal-500 mt-10">
        Todo List
      </div>
      <div className="flex justify-center items-center text-2xl font-bold text-teal-500 mt-10">
        Add Task
      </div>
      <div className="flex justify-center items-center mt-5">
        <div>
          <input
            type="text"
            value={inputTask}
            className="border-2 h-12 w-96 rounded-lg"
            onChange={(e) => setInputTask(e.target.value)}
          />
        </div>
        <button
          className="rounded-lg ml-10 border-2 border-teal-500 px-3 py-2 hover:border-teal-100"
          onClick={addTaskHandler}
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-center items-center text-2xl font-bold text-teal-500 mt-10">
        Task Left
      </div>
      {tasks
        ? tasks.map((task) =>
            !task.status ? (
              <div key={task.id}>
                <div className="flex justify-center items-center mt-10">
                  <div className="border-2 h-12 w-96 rounded-lg flex pl-2 text-lg items-center">
                    {task.content}
                  </div>
                  <button
                    className="rounded-lg ml-10 border-2 border-teal-500 px-3 py-2 hover:border-teal-100"
                    onClick={() => completeTaskHandler(task.id.toNumber())}
                  >
                    Completed
                  </button>
                </div>
              </div>
            ) : (
              ""
            )
          )
        : ""}
      <div className="flex justify-center items-center text-2xl font-bold text-teal-500 mt-10">
        Completed Tasks
      </div>
      {tasks
        ? tasks.map((task) =>
            task.status ? (
              <div key={task.id}>
                <div className="flex justify-center items-center mt-10">
                  <div className="border-2 h-12 w-96 rounded-lg flex pl-2 text-lg items-center">
                    {task.content}
                  </div>
                  <button
                    className="rounded-lg ml-10 border-2 bg-teal-600 hover:bg-red-500 px-3 py-2 text-white"
                    onClick={() => undoneTaskHandler(task.id.toNumber())}
                  >
                    Undone
                  </button>
                </div>
              </div>
            ) : (
              ""
            )
          )
        : ""}
    </div>
  );
}

export default index;

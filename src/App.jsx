import React, { useState } from 'react';
import Form from './components/taskInput.jsx';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [taskStatus, setTaskStatus] = useState([]);

  function addTask(inputText) {
    setTasks(prevItems => {
      return [...prevItems, inputText];
    });
    setTaskStatus(prevStatus => {
      return [...prevStatus, false]; 
    });
  }

  function deleteTask(index) {
    setTasks(prevItems => prevItems.filter((_, idx) => idx !== index));
    setTaskStatus(prevStatus => prevStatus.filter((_, idx) => idx !== index));
  }

  function editTask(index, newText) {
    setTasks(prevItems =>
      prevItems.map((item, idx) => (idx === index ? newText : item))
    );
    setEditingIndex(null);
    setEditingText('');
  }

  function toggleTaskStatus(index) {
    setTaskStatus(prevStatus =>
      prevStatus.map((status, idx) => (idx === index ? !status : status))
    );
  }

  console.log(tasks);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="mx-auto w-6/12 rounded-xl bg-slate-50">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-center mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-10 pt-10">
              note-App
            </h1>
            <Form onAdd={addTask} className="divide-y-2 divide-gray-800 mb-3" />
          </div>

          <ul role="list" className="divide-y-2 divide-gray-600">
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5 pl-8 pr-4">
                <span
                  style={{ textDecoration: taskStatus[index] ? 'line-through' : 'none' }}
                >
                  {index === editingIndex ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                    />
                  ) : (
                    task
                  )}
                </span>
                <div>
                  {taskStatus[index] ? (
                    <button
                      className="px-4 rounded-lg bg-gray-500 text-gray-800 font-bold uppercase mr-2"
                      onClick={() => toggleTaskStatus(index)}
                    >
                      Undone
                    </button>
                  ) : (
                    <button
                      className="px-4 rounded-lg bg-green-500 text-gray-800 font-bold uppercase mr-2"
                      onClick={() => toggleTaskStatus(index)}
                    >
                      Done
                    </button>
                  )}
                  {index === editingIndex ? (
                    <button
                      className="px-4 rounded-lg bg-green-500 text-gray-800 font-bold uppercase mr-2"
                      onClick={() => editTask(index, editingText)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="px-4 rounded-lg bg-yellow-500 text-gray-800 font-bold uppercase mr-2"
                      onClick={() => {
                        setEditingIndex(index);
                        setEditingText(task);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="px-4 rounded-lg bg-blue-500 text-gray-800 font-bold uppercase "
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

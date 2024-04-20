import React, { useState } from 'react';

export default function Form(props) {
  const [task, setTask] = useState('');

  function handleChange(event) {
    const newValue = event.target.value;
    setTask(newValue);
  }

  function handleSubmit() {
    if (task.trim() !== '') { 
        props.onAdd(task);
        setTask('');
      }
    else{
        {alert("Alerta: Cadena vacia no es valida")}
    }
  }

  return (
    <form className="m-4 flex justify-center ">
      <input
        type="text"
        value={task}ad
        className="w-full rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="Type todo"
        onChange={handleChange}
      />
      <button
        type="button" // Cambiado de type="submit" a type="button"
        className="px-8 rounded-r-lg bg-gray-500 text-gray-800 font-bold p-4 uppercase border-t border-b border-r"
        onClick={handleSubmit} // Llama a handleSubmit directamente en onClick
      >
        Submit
      </button>
    </form>
  );
}

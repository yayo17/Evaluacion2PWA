
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty, size } from 'lodash';
import { addDocument, getCollection, updateDocument } from './actions';
//import shortid from "shortid";

function App() {

  const [task, setTask] = useState("")
  const [task2, setTask2] = useState("")
  const [task3, setTask3] = useState("")
  const [task4, setTask4] = useState("")
  const [task5, setTask5] = useState("")
  const [task6, setTask6] = useState("")

  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")

  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      console.log(result)
      if (result.statusResponse) {
        setTasks(result.data)

      }
    })()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Task vacío")
      return
    }

    const result = await addDocument("tasks", { name: task, descripcion: task2, fecha: task3, profe: task4, cuatri: task5, minombre: task6 })
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    /* const newTask={
     id:shortid.generate(),
     name: task
     }*/

    setTasks([...tasks, { id: result.data.id, name: task }])
    setTask("")

  }

  const saveTask = async (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Task vacío")
      return
    }

    const result = await updateDocument("tasks", id, { name: task }, { descripcion: task2 }, { fecha: task3 }, { profe: task4 }, { cuatri: task5 }, { minombre: task6 })
    if (!result.statusResponse) {
      setError(result.error)

      return
    }


    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = async (id) => {
    const result = await deleteDocument("tasks", id)
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (tarea) => {
    setTask(tarea.name)
    setEditMode(true)
    setId(tarea.id)
  }

  return (
    <>

      <div className="container mt-5">
        <h1>Tareas</h1>
        <hr />
        <div className="row align-items-start">
          <div className="col-8">
            <h4 className="text-center">Actividades</h4>
            {
              size(tasks) === 0 ? (
                <h5 className="text-center">Aún no hay tareas</h5>
              ) : (
                <ul className="list-group">
                  {
                    tasks.map((task) => (
                      <li className="list-group-item" key={task.id}>
                        {task.name}
                        <button
                          className="btn btn-danger btn-sm float-right mx-2"
                          onclick={() => deleteTask(task.id)}
                        >Eliminar</button>
                        <button className="btn btn-warning btn-sm float-right"
                          onclick={() => editTask(task)}
                        >
                          Editar
                        </button>
                      </li>
                    ))
                  }
                </ul>
              )}
          </div>
          <div className="col-4">
            <h4 className="text-center">{editMode ? "Modificar tarea" : "Agregar Tarea"}</h4>
            <form onSubmit={editMode ? saveTask : addTask}>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresar una tarea..."
                onChange={(text) => setTask(text.target.value)}
                value={task}
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresa descripción"
                onChange={(text) => setTask2(text.target.value)}
                value={task2}
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresa el nombre del profesor"
                onChange={(text) => setTask4(text.target.value)}
                value={task4}
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresa el cuatrimestre"
                onChange={(text) => setTask5(text.target.value)}
                value={task5}
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingresa tu nombre"
                onChange={(text) => setTask6(text.target.value)}
                value={task6}
              />

              <input
                type="date"
                className="form-control mb-2"
                placeholder="Ingresa "
                onChange={(text) => setTask3(text.target.value)}
                value={task3}
              />


              <button className={editMode ? "btn btn-info btn-block" : "btn btn-primary btn-block"}
                type="submit"> {editMode ? "Guardar" : "Agregar"} </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default App;

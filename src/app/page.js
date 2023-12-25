'use client'

import { useState , useEffect} from 'react'

const initialTasks = []

function Header() {
  return (
    <header className="p-3 bg-zinc-900 text-zinc-200 font-bold flex justify-between leading-6 content-center">
      <h1 className="text-4xl px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        Gestor de Tareas</h1>      
      <nav className="p-2 inline-block">
        <ul>
          <li className='inline mx-5'><a href="/">Inicio</a></li>
          <li className='inline'><a href="/juegos">Juegos</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-200 text-xs absolute bottom-0.5">
      Elaborado por Edalmava con ❤️
    </footer>
  )
}

function Tasks() {
  const [tasks, setTasks] = useState(
    initialTasks
  )

  const [task, setTask] = useState('')
  const [terminated, setTerminated] = useState(false)

  useEffect(() => {
    if (tasks.length) setTerminated(tasks.every((t) => t.esTerminada))
  }, [tasks])

  function addTask(e) {
    e.preventDefault()
    if (task.length) {
      setTasks([...tasks, {id: tasks.length, taskdes: task, esTerminada: false}])
      setTask('')
    }    
  }

  const listItems = tasks.length?(<ListTasks tasks={tasks} onTasksChange={setTasks} />):''

  return (
    <main className="bg-white px-4 py-6">
      {  tasks.length ?
            terminated
              ? <h2 className='my-5'>¡Todas las tareas se han completado!</h2> 
              : <h2 className='my-5'>Faltan tareas por completar</h2>
           : <h2 className='my-5'>No ha agregado tareas</h2>}
      <AddTask task={task} onTaskChange={setTask} addTask={addTask} />
      {listItems}
    </main>
  )
}

function AddTask({task, onTaskChange, addTask}) {
  return (
    <form className="space-x-2">
      <label>Tarea
        <input required className="border-2" type="text" id="task" name="task" placeholder="Descripción de la tarea" value={task} onChange={(e) => onTaskChange(e.target.value)} />
      </label>
      <button className="transition ease-in-out delay-150 bg-sky-500 px-1 rounded-md text-sky-50 shadow-lg hover:bg-sky-800 hover:-translate-y-1 hover:scale-110 duration-300" onClick={addTask}>Añadir tarea</button>
    </form>
  )
}

function ListTasks({tasks, onTasksChange}) {
  return (
    <table className="border-collapse table-fixed">
      <thead>
        <tr>
          <th></th>
          <th>Descripción</th>
        </tr>
      </thead>
      <ListItems tasks={tasks} onTasksChange={onTasksChange} />
    </table>
  )
}

function ListItems({tasks, onTasksChange}) {
  const taskTerminated = (index) => {
    const updatedTasks = [ ...tasks ]

    updatedTasks[index].esTerminada = !updatedTasks[index].esTerminada
    
    onTasksChange(updatedTasks) 
  }
  const listItems = tasks.map(task => (
    <tr key={task.id}>
      <td><input name={task.id} type="checkbox" checked={task.esTerminada} onChange={(e) => { taskTerminated(task.id) }} /></td>
      <td>{task.taskdes}</td>
    </tr>
  ))

  return (
    <tbody>
      {listItems}
    </tbody>
  )
}

export default function Home() {
  return (
    <div className="container p-4">
      <Header />
      <Tasks />
      <Footer />
    </div>
  )
}
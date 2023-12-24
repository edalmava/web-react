'use client'

import { useState , useEffect} from 'react'

const initialTasks = []

function Header() {
  return (
    <header className="bg-zinc-900 text-zinc-200 font-bold flex justify-between leading-6 content-center">
      <h1 className="text-4xl px-2">Gestor de Tareas</h1>
      <nav className="p-2">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/juegos">Juegos</a></li>
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
      { terminated 
          ? <h2>¡Todas las tareas se han completado!</h2> 
          : <h2>Faltan tareas por completar</h2>}
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
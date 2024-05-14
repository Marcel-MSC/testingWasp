import {
  updateTask,
  createTask,
  getTasks,
  useQuery
} from 'wasp/client/operations';
import './Main.css';
import { logout } from 'wasp/client/auth';
import { NavBar } from './NavBar';

export const MainPage = ({ user }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks)
  return (
    <div>
      <NavBar></NavBar>
      {/* <div class="flex flex-no-wrap justify-around">
        <div class="">
          <h1>Task App</h1>
        </div>
        <div class="">
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold pl-4 py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
      </div> */}

      {/* <h1> Testing input tailwind</h1>
      <TestingInputTailwind /> */}
      <br></br>
      <div class="flex flex-no-wrap justify-around">
        <div class="flex-column">
          <div class="">
            <div>
              <h3>New Task</h3>
            </div>
            <div>
              <NewTaskForm></NewTaskForm>
            </div>
          </div>
          <br></br>
          <div class="flex-column">
            <div>
              <h1>Task list</h1>
            </div>
            <div>
              {tasks && <TasksList tasks={tasks} />}
            </div>
          </div>
        </div>
      </div>
      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
    </div >
  )
}

const TestingInputTailwind = () => {
  return (
    <div>
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
        New Task
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <input id="taskCheckbox" aria-describedby="checkbox task" name="checkbox" type="checkbox" class="nw rx adp afv ayg bnq"/>
        </div> */}
        <input
          type="text"
          name="newTask"
          id="newTask"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Title here"
        />
      </div>
    </div>
  )
}

const TaskView = ({ task }) => {
  const handleIsDoneChange = async (event) => {
    try {
      await updateTask({
        id: task.id,
        isDone: event.target.checked,
      })
    } catch (error) {
      window.alert('Error while updating task: ' + error.message)
    }
  }
  return (
    <div>
      <input
        aria-describedby="checkbox task"
        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="checkbox"
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      />
      <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {task.description}
      </label>
      
      {/* <input
        type="checkbox"
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      /> */}
    </div>
  )
}

const TasksList = ({ tasks }) => {
  if (!tasks?.length) return <div>No tasks</div>
  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskView task={task} key={idx} />
      ))}
    </div>
  )
}

const NewTaskForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const target = event.target
      const description = target.description.value
      target.reset()
      await createTask({ description })
    } catch (err) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        id="newTask"
        className="relative rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="describre your task here"
      />
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold pl-4 py-2 px-4 rounded"> Create Task</button>
    </form>
  )
}
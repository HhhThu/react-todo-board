import { useEffect, useState } from 'react'
import TaskColumn from './components/TaskColumn'
import TaskForm from './components/TaskForm'
import { columns } from './data/columns'
import type { Task, TaskStatus } from './types/task'

const initialTasks: Task[] = [
  {
    id: 1,
    title: '学习 React 组件',
    description: '理解组件拆分、props 和 JSX 的基本写法。',
    status: 'todo',
  },
  {
    id: 2,
    title: '配置 Tailwind CSS',
    description: '完成 Vite 项目的 Tailwind 接入。',
    status: 'doing',
  },
  {
    id: 3,
    title: '推送项目到 GitHub',
    description: '把初始化项目提交并推送到远程仓库。',
    status: 'done',
  },
]

const STORAGE_KEY = 'react-todo-board-tasks'

const getInitialTasks = () => {
  const savedTasks = localStorage.getItem(STORAGE_KEY)

  if (!savedTasks) {
    return initialTasks
  }

  try {
    return JSON.parse(savedTasks) as Task[]
  } catch {
    return initialTasks
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newStatus, setNewStatus] = useState<TaskStatus>('todo')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (!newTitle.trim()) {
      return
    }

    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim() || '暂无描述',
      status: newStatus,
    }

    setTasks((currentTasks) => [task, ...currentTasks])
    setNewTitle('')
    setNewDescription('')
    setNewStatus('todo')
  }

  const handleChangeTaskStatus = (taskId: number, status: TaskStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        return {
          ...task,
          status,
        }
      }),
    )
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            React Todo Board
          </p>
          <h1 className="text-4xl font-bold tracking-tight">我的任务看板</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            用 React、TypeScript 和 Tailwind CSS 搭建一个可持续迭代的任务管理项目。
          </p>
        </div>

        <TaskForm
          title={newTitle}
          description={newDescription}
          status={newStatus}
          onTitleChange={setNewTitle}
          onDescriptionChange={setNewDescription}
          onStatusChange={setNewStatus}
          onAddTask={handleAddTask}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((column) => (
            <TaskColumn
              key={column.status}
              column={column}
              tasks={tasks.filter((task) => task.status === column.status)}
              onChangeStatus={handleChangeTaskStatus}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App

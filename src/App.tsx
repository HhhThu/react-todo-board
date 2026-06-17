import { useEffect, useState } from 'react'
import TaskColumn from './components/TaskColumn'
import TaskForm from './components/TaskForm'
import { columns } from './data/columns'
import type { Task, TaskFilter, TaskStatus } from './types/task'

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
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<TaskFilter>('all')

  const isEditing = editingTaskId !== null

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const visibleTasks = tasks.filter((task) => {
  const matchesSearch = `${task.title} ${task.description}`
    .toLowerCase()
    .includes(searchTerm.trim().toLowerCase())

  const matchesFilter = filter === 'all' || task.status === filter

  return matchesSearch && matchesFilter
})

  const resetForm = () => {
    setNewTitle('')
    setNewDescription('')
    setNewStatus('todo')
    setEditingTaskId(null)
}

const handleSubmitTask = () => {
  if (!newTitle.trim()) {
    return
  }

  if (editingTaskId !== null) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== editingTaskId) {
          return task
        }

        return {
          ...task,
          title: newTitle.trim(),
          description: newDescription.trim() || '暂无描述',
          status: newStatus,
        }
      }),
    )

    resetForm()
    return
  }

  const task: Task = {
    id: Date.now(),
    title: newTitle.trim(),
    description: newDescription.trim() || '暂无描述',
    status: newStatus,
  }

  setTasks((currentTasks) => [task, ...currentTasks])
  resetForm()
}

  const handleStartEdit = (task: Task) => {
  setEditingTaskId(task.id)
  setNewTitle(task.title)
  setNewDescription(task.description)
  setNewStatus(task.status)

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

  const handleCancelEdit = () => {
  resetForm()
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

  if (editingTaskId === taskId) {
    resetForm()
  }
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
          isEditing={isEditing}
          onTitleChange={setNewTitle}
          onDescriptionChange={setNewDescription}
          onStatusChange={setNewStatus}
          onSubmitTask={handleSubmitTask}
          onCancelEdit={handleCancelEdit}
        />

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
  <div className="mb-4 grid gap-4 md:grid-cols-3">
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-sm text-slate-400">全部任务</p>
      <p className="mt-2 text-2xl font-bold text-slate-100">{tasks.length}</p>
    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-sm text-slate-400">进行中</p>
      <p className="mt-2 text-2xl font-bold text-amber-300">
        {tasks.filter((task) => task.status === 'doing').length}
      </p>
    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-sm text-slate-400">已完成</p>
      <p className="mt-2 text-2xl font-bold text-emerald-300">
        {tasks.filter((task) => task.status === 'done').length}
      </p>
    </div>
  </div>

  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <input
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      placeholder="搜索任务标题或描述"
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 md:max-w-md"
    />

    <div className="flex flex-wrap gap-2">
      {[
        { label: '全部', value: 'all' },
        { label: 'Todo', value: 'todo' },
        { label: 'Doing', value: 'doing' },
        { label: 'Done', value: 'done' },
      ].map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => setFilter(item.value as TaskFilter)}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            filter === item.value
              ? 'bg-cyan-400 text-slate-950'
              : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
</div>


        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((column) => (
            <TaskColumn
              key={column.status}
              column={column}
              tasks={visibleTasks.filter((task) => task.status === column.status)}
              onEdit={handleStartEdit}
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
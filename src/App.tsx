import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type TaskStatus = 'todo' | 'doing' | 'done'

type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
}

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


const columns: { title: string; status: TaskStatus; badgeClass: string }[] = [
  {
    title: 'Todo',
    status: 'todo',
    badgeClass: 'bg-sky-500/20 text-sky-300',
  },
  {
    title: 'Doing',
    status: 'doing',
    badgeClass: 'bg-amber-500/20 text-amber-300',
  },
  {
    title: 'Done',
    status: 'done',
    badgeClass: 'bg-emerald-500/20 text-emerald-300',
  },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newStatus, setNewStatus] = useState<TaskStatus>('todo')

  useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}, [tasks])

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!newTitle.trim()) {
      return
    }

    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim() || '暂无描述',
      status: newStatus,
    }

    setTasks([task, ...tasks])
    setNewTitle('')
    setNewDescription('')
    setNewStatus('todo')
  }

  const handleChangeTaskStatus = (taskId: number, status: TaskStatus) => {
    const nextTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      return {
        ...task,
        status,
      }
    })

    setTasks(nextTasks)
  }

  const handleDeleteTask = (taskId: number) => {
    const nextTasks = tasks.filter((task) => task.id !== taskId)

    setTasks(nextTasks)
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

        <form
          onSubmit={handleAddTask}
          className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_160px_auto]">
            <input
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="任务标题"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />

            <input
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              placeholder="任务描述"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />

            <select
              value={newStatus}
              onChange={(event) => setNewStatus(event.target.value as TaskStatus)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>

            <button
              type="submit"
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              添加任务
            </button>
          </div>
        </form>

        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column.status)

            return (
              <section
                key={column.status}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{column.title}</h2>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${column.badgeClass}`}>
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {columnTasks.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-500">
                      暂无任务
                    </p>
                  ) : (
                    columnTasks.map((task) => (
                      <article
                        key={task.id}
                        className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                      >
                        <h3 className="font-semibold text-slate-100">{task.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {task.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {task.status === 'todo' && (
                            <button
                              type="button"
                              onClick={() => handleChangeTaskStatus(task.id, 'doing')}
                              className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-300"
                            >
                              开始
                            </button>
                          )}

                          {task.status === 'doing' && (
                            <button
                              type="button"
                              onClick={() => handleChangeTaskStatus(task.id, 'done')}
                              className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300"
                            >
                              完成
                            </button>
                          )}

                          {task.status === 'done' && (
                            <button
                              type="button"
                              onClick={() => handleChangeTaskStatus(task.id, 'todo')}
                              className="rounded-lg bg-sky-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-sky-300"
                            >
                              重做
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            className="rounded-lg border border-red-500/40 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
                          >
                            删除
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App

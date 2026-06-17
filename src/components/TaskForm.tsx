import type { FormEvent } from 'react'
import type { TaskStatus } from '../types/task'

type TaskFormProps = {
  title: string
  description: string
  status: TaskStatus
  isEditing: boolean
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onStatusChange: (status: TaskStatus) => void
  onSubmitTask: () => void
  onCancelEdit: () => void
}

function TaskForm({
  title,
  description,
  status,
  isEditing,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onSubmitTask,
  onCancelEdit,
}: TaskFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmitTask()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isEditing ? '编辑任务' : '新增任务'}
        </h2>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm font-semibold text-slate-400 transition hover:text-slate-200"
          >
            取消编辑
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr_160px_auto]">
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="任务标题"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />

        <input
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="任务描述"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
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
          {isEditing ? '保存修改' : '添加任务'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm

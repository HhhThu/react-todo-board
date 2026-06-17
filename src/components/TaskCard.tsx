import type { Task, TaskStatus } from '../types/task'

type TaskCardProps = {
  task: Task
  onChangeStatus: (taskId: number, status: TaskStatus) => void
  onDelete: (taskId: number) => void
}

function TaskCard({ task, onChangeStatus, onDelete }: TaskCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <h3 className="font-semibold text-slate-100">{task.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{task.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.status === 'todo' && (
          <button
            type="button"
            onClick={() => onChangeStatus(task.id, 'doing')}
            className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            开始
          </button>
        )}

        {task.status === 'doing' && (
          <button
            type="button"
            onClick={() => onChangeStatus(task.id, 'done')}
            className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            完成
          </button>
        )}

        {task.status === 'done' && (
          <button
            type="button"
            onClick={() => onChangeStatus(task.id, 'todo')}
            className="rounded-lg bg-sky-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            重做
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg border border-red-500/40 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
        >
          删除
        </button>
      </div>
    </article>
  )
}

export default TaskCard

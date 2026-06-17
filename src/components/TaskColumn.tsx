import type { Column } from '../data/columns'
import type { Task, TaskStatus } from '../types/task'
import TaskCard from './TaskCard'

type TaskColumnProps = {
  column: Column
  tasks: Task[]
  onEdit: (task: Task) => void
  onChangeStatus: (taskId: number, status: TaskStatus) => void
  onDelete: (taskId: number) => void
}

function TaskColumn({
  column,
  tasks,
  onEdit,
  onChangeStatus,
  onDelete,
}: TaskColumnProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/30">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{column.title}</h2>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${column.badgeClass}`}>
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-500">
            暂无任务
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onChangeStatus={onChangeStatus}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default TaskColumn

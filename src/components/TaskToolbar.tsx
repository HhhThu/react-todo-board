import type { TaskFilter } from '../types/task'

type TaskStats = {
  total: number
  doing: number
  done: number
  visible: number
}

type TaskToolbarProps = {
  stats: TaskStats
  searchTerm: string
  filter: TaskFilter
  hasActiveFilter: boolean
  onSearchTermChange: (value: string) => void
  onFilterChange: (filter: TaskFilter) => void
  onClearFilters: () => void
}

const filterOptions: { label: string; value: TaskFilter }[] = [
  { label: '全部', value: 'all' },
  { label: 'Todo', value: 'todo' },
  { label: 'Doing', value: 'doing' },
  { label: 'Done', value: 'done' },
]

function TaskToolbar({
  stats,
  searchTerm,
  filter,
  hasActiveFilter,
  onSearchTermChange,
  onFilterChange,
  onClearFilters,
}: TaskToolbarProps) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">全部任务</p>
          <p className="mt-2 text-2xl font-bold text-slate-100">
            {stats.total}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">进行中</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">
            {stats.doing}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">已完成</p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">
            {stats.done}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:max-w-md">
          <input
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="搜索任务标题或描述"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />

          <p className="mt-2 text-sm text-slate-500">
            当前显示 {stats.visible} / {stats.total} 个任务
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                filter === item.value
                  ? 'bg-cyan-400 text-slate-950'
                  : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          {hasActiveFilter && (
            <button
              type="button"
              onClick={onClearFilters}
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
            >
              清空筛选
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskToolbar

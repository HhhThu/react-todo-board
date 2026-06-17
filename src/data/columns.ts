import type { TaskStatus } from '../types/task'

export type Column = {
  title: string
  status: TaskStatus
  badgeClass: string
}

export const columns: Column[] = [
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

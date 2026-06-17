export type TaskStatus = 'todo' | 'doing' | 'done'

export type TaskFilter = 'all' | TaskStatus

export type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
}

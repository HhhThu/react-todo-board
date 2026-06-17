export type TaskStatus = 'todo' | 'doing' | 'done'

export type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
}

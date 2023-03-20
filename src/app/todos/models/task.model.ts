export interface Task extends UpdateTaskModel {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
}

export interface UpdateTaskModel {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
}

export interface GetTasksResponse {
  items: Task[];
  totalCount: number;
  error: string;
}

export interface TodoTasks {
  [key: string]: Task[];
}

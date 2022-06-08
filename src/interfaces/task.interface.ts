export interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
}

export interface Tasks {
  tasks: Task[];
}

export type Todo = {
    title: string;
    duedate: string;
    priority: string;
  }
  
  export type ToDoTableProps = {
    todos: Todo[];
    handleDelete: (row: number) => void;
  }
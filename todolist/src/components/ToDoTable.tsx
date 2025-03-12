import { ToDoTableProps } from "../types";

export default function ToDoTable(props: ToDoTableProps) {
  return (
    <>
      <table>
        <thead>
          <th>Title</th>
          <th>Priority</th>
          <th>Duedate</th>
          <th>Actions</th>
        </thead>
      </table>
      <tbody>
        {props.todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.title}</td>
            <td>{todo.priority}</td>
            <td>{todo.duedate}</td>
            <td>
              <button onClick={() => props.handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

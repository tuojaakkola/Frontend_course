import { useState } from "react";
import {Todo} from "../types";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react';


ModuleRegistry.registerModules([AllCommunityModule]);   

function ToDoList() {
    const [todo, setTodo] = useState<Todo>({
        title:"",
        duedate: "",
        priority: ""
    });
    const [todos, setTodos] = useState<Todo[]>([]);

    const [colDefs, setColDefs] = useState<ColDef[]>([
        {field: "title", filter: true, floatingFilter: true, editable: true},
        {
            field: "priority", 
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,
            cellStyle: (params) => params.value === "High" ? {color: "red"} : {color: "black"},
        },
        {field: "duedate", headerName: "Date", filter: true, floatingFilter: true, editable: true},
    ]);

    const handleAdd = () => {
        if (!todo.title || !todo.duedate) {
            alert("Enter values first");
        } else {
            setTodos([todo, ...todos]);
            setTodo({title: "", duedate: "", priority: ""});
        }
    }

    const handleDelete = (row: number) => {
        setTodos(todos.filter((todo, index) => row !== index));
    }

    return(
        <>
        <h3>My Todos</h3>
        <input
            placeholder="Title"
            value={todo.title}
            onChange={event => setTodo({ ...todo, title: event.target.value})}
        />
         <input
            placeholder="Priority"
            value={todo.priority}
            onChange={event => setTodo({ ...todo, priority: event.target.value})}
        />
        <input
            placeholder="Duedate"
            type="date"
            value={todo.duedate}
            onChange={event => setTodo({ ...todo, duedate: event.target.value})}
        />
        <button onClick={handleAdd}>Add</button>
        <div style={{ width: 700, height: 500 }}>
        <AgGridReact
            rowData={todos}
            columnDefs={colDefs}
            theme= {themeMaterial}
        />
        </div>
        </>
    );
}

export default ToDoList;
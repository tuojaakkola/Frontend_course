import { useState, useRef } from "react";
import * as React from 'react';
import { Todo } from "../types";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

ModuleRegistry.registerModules([AllCommunityModule]);

function ToDoList() {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const gridRef = useRef<AgGridReact>(null);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "title", filter: true, floatingFilter: true, editable: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      editable: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
    {
      field: "duedate",
      headerName: "Date",
      filter: true,
      floatingFilter: true,
      editable: true,
    },
  ]);

  const handleAdd = () => {
    if (!todo.title || !todo.duedate) {
      alert("Enter values first");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ title: "", duedate: "", priority: "" });
    }
  };

  const handleDelete = () => {
    //Optional chaining (?)
    //console.log(gridRef.current?.api.getSelectedNodes());
    setTodos(
      todos.filter(
        (_, index) =>
          gridRef.current?.api.getSelectedNodes()[0].rowIndex !== index
      )
    );
  };

  const handleDateChange = (date: Dayjs | null) => {
    setTodo({ ...todo, duedate: date ? date.format("YYYY-MM-DD") : "" });
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <TextField
          label="Title"
          value={todo.title}
          onChange={(event) => setTodo({ ...todo, title: event.target.value })}
        />
        <TextField
          label="Priority"
          value={todo.priority}
          onChange={(event) =>
            setTodo({ ...todo, priority: event.target.value })
          }
        />
          <DatePicker
          label="Due Date"
          value={todo.duedate ? dayjs(todo.duedate) : null}
          onChange={handleDateChange}
        />
        <Button onClick={handleAdd}>Add</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowSelection={"single"}
          rowData={todos}
          columnDefs={colDefs}
          theme={themeMaterial}
        />
      </div>
      </LocalizationProvider>
    </>
  );
}

export default ToDoList;

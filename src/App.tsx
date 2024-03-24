import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import useLocalStorage from "@/hooks/useLocalStorage";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */
const initialData: ReadonlyArray<Todo> = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    created_at: "",
    completed_at: "",
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    created_at: "",
    completed_at: "",
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    created_at: "",
    completed_at: "",
  },
];

function App() {
  const [todos, setTodos] = useLocalStorage("todo-list", initialData);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
        created_at: Date.now(),
        completed_at: "",
      },
      ...prev,
    ]);
  }, []);

  const handleChange = useCallback((id: string, checked: boolean) => {
    setTodos((prev) =>
      prev
        .map((item) => {
          if (id !== item.id) {
            return item;
          }
          return { ...item, checked, completed_at: checked ? Date.now() : "" };
        })
        .sort((a, b) => {
          if (a.checked && !b.checked) {
            return 1;
          } else if (!a.checked && b.checked) {
            return -1;
          }
          if (a.checked) {
            return b.completed_at - a.completed_at;
          } else {
            return a.created_at - b.created_at;
          }

          return 0;
        })
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            {...todo}
            onChange={handleChange}
            onDelete={handleDelete}
            key={todo.id}
          />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;

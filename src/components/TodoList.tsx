import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { useTodosContext } from '../store'

function TodoListItems() {

  const { todos, toggleTodo, updateTodo, removeTodo } = useTodosContext()

  return (
    <>
      {todos.map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox 
            onChange={() => toggleTodo(todo.id)}
          />
          <Input 
            onChange={(evt) => updateTodo(todo.id, evt.target.value)}
            mx={2} value={todo.text} 
          />
          <Button 
            onClick={() => removeTodo(todo.id)}
          >
            Delete
          </Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;

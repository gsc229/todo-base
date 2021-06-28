import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { removeTodo, toggleTodo, updateTodo, useTodosContext } from '../store'

function TodoListItems() {

  const [ todos, todosSet ] = useTodosContext()

  return (
    <>
      {todos.map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox 
          onChange={() => todosSet(toggleTodo(todos, todo.id))}
          />
          <Input 
          onChange={(evt) => todosSet(updateTodo(todos, todo.id, evt.target.value))}
          mx={2} value={todo.text} />
          <Button 
          onClick={() => todosSet(removeTodo(todos, todo.id))}
          >Delete</Button>
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

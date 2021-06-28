import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { removeTodo, SetTodosType, TodosType, toggleTodo, updateTodo } from '../store'

function TodoListItems({ todos, todosSet }: { todos: TodosType, todosSet: SetTodosType }) {


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

function TodoList({ todos, todosSet }: { todos: TodosType, todosSet: SetTodosType }) {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems todos={todos} todosSet={todosSet} />
    </>
  );
}

export default TodoList;

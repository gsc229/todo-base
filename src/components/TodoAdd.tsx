import React, { useState } from "react";
import { Button, Input, Grid } from "@chakra-ui/react";
import { addTodo, SetTodosType, TodosType } from '../store'

function TodoAdd({ todosSet, todos }: { todosSet: SetTodosType, todos: TodosType }) {

  const [newTodo, newTodoSet] = useState("")

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input value={newTodo} onChange={(evt) => newTodoSet(evt.target.value)} placeholder="New todo" />
      <Button
      onClick={() => todosSet(addTodo(todos, newTodo))}
      >Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;

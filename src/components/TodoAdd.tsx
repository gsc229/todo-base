import React, { useState } from "react";
import { Button, Input, Grid } from "@chakra-ui/react";
import { useTodosContext, addTodo } from '../store'

function TodoAdd() {

  const [newTodo, newTodoSet] = useState("")
  const [ todos, todosSet ] = useTodosContext()

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

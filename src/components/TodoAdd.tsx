import React, { useState } from "react";
import { Button, Input, Grid } from "@chakra-ui/react";
import { useTodosContext } from '../store'

function TodoAdd() {

  const { newTodo, newTodoSet, addTodo } = useTodosContext()

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input 
        value={newTodo} 
        onChange={(evt) => newTodoSet(evt.target.value)} 
        placeholder="New todo" 
      />
      <Button
        onClick={() => addTodo()}
      >
        Add Todo
      </Button>
    </Grid>
  );
}

export default TodoAdd;

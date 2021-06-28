import * as React from "react";
import { Button, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SetTodosType, TodosType } from '../store'

/*
JSON source: https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json
*/

function TopBar({ todos, todosSet }: { todos: TodosType, todosSet: SetTodosType }) {
  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <ColorModeSwitcher />
      <Button>Load</Button>
    </Grid>
  );
}

export default TopBar;

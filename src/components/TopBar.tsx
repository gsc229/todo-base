import * as React from "react";
import { Button, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SetTodosType, TodosType } from '../store'

/*
JSON source: https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json
*/

function TopBar({ todosSet }: { todosSet: SetTodosType }) {

  const onLoad = () => {
    fetch('https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json')
    .then(resp => resp.json())
    .then(data => todosSet(data))
  }

  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <ColorModeSwitcher />
      <Button onClick={onLoad}>Load</Button>
    </Grid>
  );
}

export default TopBar;

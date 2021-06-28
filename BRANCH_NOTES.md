>## useState and Prop-drilling:
> Refactoring todos and todosSet to a custom hook, useTodos, in store.tsx. From the hook we are extracting the types from useTodos (UseTodoType). 
> 
>
> The React SetStateAction Type (seen below) is the return type of our custom hook, useTodos, and our UseTodosType:
> ```
> React.Dispatch<React.SetStateAction<Todo[]>>
> ```
>From  UseTodoType we are extracting the TodosType and the, native React setter (setState) function and calling it >SetTodosType.
>```
>// Native React Types
> export const useTodos = (initial: Todo[]) => useState<Todo[]>(initial)
> export type UseTodosType = ReturnType<typeof useTodos>
> export type TodosType = UseTodosType[0]
> export type SetTodosType = UseTodosType[1]
>```
> There's still a lot of prop drilling going on from app to TodoList --> TodoItems
> and other places. 

>## useContext:
> First need to change store.ts to store.tsx --> will probably break the build, so restart the server --> yarn start 
> To prevent this error:<br/> 
> 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.ts(2686)<br/>
> Do:<br/>
> import * as React from 'react' --> then React.useContext, React.useState etc. 
>```
> // Context:
>
> const TodosContext = React.createContext<UseTodosType | null>(null);
>
> export const useTodosContext = () => React.useContext(TodosContext)!;
>```
>Notice the exclamation point at the end of useTodosContext's return. 
> Since we know that there will always be something at runtime, the exclamation coerces the TodoContext so that it doesn't always
> have to go checking for null. Video timestamp: 17:00 <br/>
> Next Create the Provider:
>```
>// Context:
>
> const TodosContext = React.createContext<UseTodosType | null>(null);
>
> export const useTodosContext = () => React.useContext(TodosContext)!;
>
> export const TodosProvider = ({ children }: { children: React.ReactNode }) => (
>   <TodosContext.Provider value={ useTodos([]) }>
>     { children }
>   </TodosContext.Provider>
> )
> ```
><br/>
> The value in TodosContext provider is "the result of useTodos. It's just like calling a 'useState' at the top of your function.Doing right here is not going to get re-invoked on ever single re-render".<br/>
> Now we can wrap child components in the TodosContext.Provider in App and remove the props from the children components and thus no prop-drilling 
><br/>
> App.tsx
>
>```
>import React from "react";
>import { ChakraProvider, Box, theme } from "@chakra-ui/react";
>import TopBar from "./components/TopBar";
>import TodoList from "./components/TodoList";
>import TodoAdd from "./components/TodoAdd";
>import { TodosProvider } from './store'
>
>export function App() {
>
>  return (
>    <ChakraProvider theme={theme}>
>      <TodosProvider>
>        <Box maxWidth="8xl" margin="auto" p={5}>
>          <TopBar  />
>          <TodoList />
>          <TodoAdd />
>        </Box>
>        {/* <pre>
>          {JSON.stringify(todos, null, 2)}
>        </pre> */}
>      </TodosProvider>
>    </ChakraProvider>
>  );
> }
>```
>TodoList.tsx:
>
>```
>import * as React from "react";
>import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/>react";
>import { removeTodo, toggleTodo, updateTodo, useTodosContext } >from '../store'
>
>function TodoListItems() {
>
>  const [ todos, todosSet ] = useTodosContext()
>
>  return (
>    <>
>      {todos.map((todo: { id: number; text: string }) => (
>        <Flex pt={2} key={todo.id}>
>          <Checkbox 
>          onChange={() => todosSet(toggleTodo(todos, todo.id))}
>          />
>          <Input 
>          onChange={(evt) => todosSet(updateTodo(todos, todo.id, >evt.target.value))}
>          mx={2} value={todo.text} />
>          <Button 
>          onClick={() => todosSet(removeTodo(todos, todo.id))}
>          >Delete</Button>
>        </Flex>
>      ))}
>    </>
>  );
>}
>
>function TodoList() {
>  return (
>    <>
>      <Heading>Todo List</Heading>
>      <TodoListItems />
>    </>
>  );
>}
>
>export default TodoList;
>
>```

>## Adding the To Do App's Functions to the Context:

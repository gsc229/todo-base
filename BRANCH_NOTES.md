## useState and Prop-drilling:
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
>
## useContext:
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
> have to go checking for null. Video timestamp: 17:00
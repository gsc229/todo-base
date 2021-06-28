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
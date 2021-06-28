import * as React from 'react'
// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Native React Types
export const useTodos = (initial: Todo[]) => {
  const [todos, todosSet] = React.useState<Todo[]>(initial)
  const [newTodo, newTodoSet] = React.useState("")

  return {
    todos,
    newTodo,
    newTodoSet,
    addTodo(){
      todosSet(tdlist => addTodo(tdlist, newTodo))
    },
    updateTodo(id: number, text: string){
      todosSet(tdlist => updateTodo(tdlist, id, text))
    },
    toggleTodo(id: number){
      todosSet(tdlist => toggleTodo(tdlist, id))
    },
    removeTodo(id: number){
      todosSet(tdlist => removeTodo(tdlist, id))
    },
    load(inTodos: Todo[]){
      todosSet(inTodos)
    }
  }
}

type UseTodosType = ReturnType<typeof useTodos>

// Context:
export const TodosContext = React.createContext<UseTodosType | null>(null);

export const useTodosContext = () => React.useContext(TodosContext)!;

export const TodosProvider = ({ children }: { children: React.ReactNode }) => (
  <TodosContext.Provider value={ useTodos([]) }>
    { children }
  </TodosContext.Provider>
)
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Todos {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

function ApiExample() {
  const [todos, setTodos] = useState<Todos>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTodos() {
      const todos = await apiGetTodos(); // lekérjük az adatokat
      setTodos(todos); // eltároljuk az adatot
      setIsLoading(false); // amikor befejeztük, akkor leállítjuk a loadingot
    }

    getTodos();
  }, []);

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div>
      <h1 className="text-3xl">A Todok:</h1>
      <div className="flex flex-col">
        {todos?.todos.map((todo, idx) => (
          <p key={idx}>{todo.todo}</p>
        ))}
      </div>
    </div>
  );
}
export default ApiExample;

async function apiGetTodos(): Promise<Todos> {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  return data as Todos;
}

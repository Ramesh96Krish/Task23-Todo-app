import React,{ useEffect, useState } from "react"
import "./App.css"
import Tasks from "./components/Tasks/tasks";




function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: null,
    name: "",
    description: "",
    status: "NOT COMPLETED",
  });

  const [filteredTodos, setFilteredTodos] = useState([]);

  const [filterBy, setFilterBy] = useState("ALL");

  const handleTodoForm = (value) => {
    let todoData = { ...value, id: todos.length + 1 };
    setTodo((todo) => {
      return { ...todo, ...todoData };
    });
  };

  const addTodo = (e) => {
    e.preventDefault();

    if (todo.name && todo.description) {
      setTodos((todos) => {
        return [...todos, todo];
      });
    }

    setTodo({
      id: null,
      name: "",
      description: "",
      status: "NOT COMPLETED",
    });
  };

  const editTodo = (editPayload) => {
    setTodos((todo_list) =>
      todo_list.map((todo_item) => {
        if (todo_item.id === editPayload.id) {
          return {
            ...todo_item,
            ...editPayload,
          };
        }
        return todo_item;
      })
    );
  };

  const deleteTodo = (deletePayload) => {
    setTodos((todo_list) =>
      todo_list.filter((todo_item) => {
        if (todo_item.id !== deletePayload.id) {
          return {
            ...todo_item,
          };
        }
      })
    );
  };

  useEffect(() => {
    setFilteredTodos(todos);
  }, []);

  useEffect(() => {
    if (filterBy !== "ALL") {
      let filtered = todos.filter((item) => item.status === filterBy);
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos);
    }
  }, [filterBy, todos]);


  return (
    <div className="App">
      <form onSubmit={addTodo}>
      <div className="input-area">
            <div className="title">
                <h1 className="todo-txt">My Todo</h1>
            </div>
            <div className="input-container">
                <div className="todo-name-container">
                    <input className="todo-name" 
                    value={todo.name} 
                    onChange={(e) => handleTodoForm({name: e.target.value})} 
                    type="text" 
                    placeholder="Todo Name"/>
                </div>
                <div className="todo-name-description">
                    <input className="todo-description" 
                    value={todo.description} 
                    onChange={(e) =>handleTodoForm({description: e.target.value})} 
                    type="text" 
                    placeholder="Todo Description"/>
                </div>
                <div className="todo-btn-container">
                    <button className="todo-btn" type="submit">
                        Add Todo
                    </button>
                </div>
            </div>
        </div>
        <div className="status-filter-container">
            <div className="my-todos">
                <h1>My Todos</h1>
            </div>
            <div className="status-filter">
                <label>Status Filter : </label>
                <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value={"ALL"}>All</option>
                    <option value={"COMPLETED"}>Completed</option>
                    <option value={"NOT COMPLETED"}>Not Completed</option>
                </select>
            </div>
        </div>
        <div className="todo-container">
            {filteredTodos.length ? (
              filteredTodos.map((item, index) => (
                <Tasks
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                  todo={item}
                  key={index}
                />
              ))
            ) : (
              <div> No Todo's available. </div>
            )}
        </div>
      </form>
    </div>
  );
}

export default App;

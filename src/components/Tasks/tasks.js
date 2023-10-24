import "./task.css"
import { useEffect, useState } from "react";



const Tasks = (props)=>{

    const { todo, editTodo, deleteTodo } = props;
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      setStatus(todo.status);
    }, []);
  
    const handleEditTodo = () => {
      const editPayload = { ...todo, status: status };
  
      editTodo(editPayload);
    };
    const handleDeleteTodo = () => {
      const deletePayload = { ...todo};
      deleteTodo(deletePayload);
    };


    return(
        <div className="todo-container">
            <div className="tasks-container">
            <div className="name">Name: {todo.name}</div>
            <div className="details">Description: {todo.description}</div>
            <div className="status-task">
                Status: {" "}
                <select  value={todo.status} onChange={(e) => setStatus(e.target.value)}>
                <option  value={"COMPLETED"}>Completed</option>
                <option  value={"NOT COMPLETED"}>Not Completed</option>
            </select>
            </div>
            <div className="button-container">
                <button onClick={handleEditTodo} className="edit-btn">
                    Edit
                </button>
                <button onClick={handleDeleteTodo} className="del-btn">
                    Delete
                </button>
            </div>
        </div>
        </div>
    )
}
export default Tasks;
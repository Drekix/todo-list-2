import { useState } from "react"
import "./style.css"



export default function App() {
  const [newItem, setNewItem] = useState("");
  //useState, newitem and onChange allows us to send and update to item form as we go
  const [todos, setTodos] = useState([]);


  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed:
        false },
      ]
    })

    setNewItem("")
  }
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodos(id) {
    setTodos(currentTodos =>{
      return (
        currentTodos.filter(todo => todo.id !== id)
      )
    })
  }
  
  return (
  <> 
  <a href="/" className="logo"><img src="/images/jamie-h-logo-3.png" alt="" className="logo"/></a>
  <form onSubmit={handleSubmit} className="new-item-form"> 
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input value={newItem} 
        onChange={e => setNewItem(e.target.value)} 
        type="text" 
        id="item" 
      />
    </div>
    <button className="btn">Add</button>
    
  </form>
  <h1 className="header">Todo List</h1>
  <ul className="list">
    {todos.length === 0 && "no todos"}
    {todos.map(todo => {
      return (
        <li key={todo.id}>
          <label className="todo-label">
          <input type="checkbox" checked={todo.completed}
          onChange={e => toggleTodo(todo.id, e.target.checked)}/>
          {todo.title}
        </label>
        <button 
        onClick={() => deleteTodos(todo.id)}
        className="btn btn-danger">Delete</button>
      </li>
      )
    })}
  </ul>
  </>
  )
}
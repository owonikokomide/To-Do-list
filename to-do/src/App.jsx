import React, {useEffect, useState} from 'react'
import './App.css'

function App(){ 
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return [] 
    return JSON.parse(localValue) 
  });

  useEffect(()=>{
  localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos((currentTodos)=>{
     return [
       ...currentTodos,
       { id: crypto.randomUUID(), title: newItem, completed: false },
     ];
    })
  setNewItem("");

  }
  function toggleTodo(id, completed){
     setTodos(currentTodos => {
      return currentTodos.map(todo =>{
        if (todo.id === id ){
         return {...todo, completed}
         
        }
        return todo; 
      })
     })
  }

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !==id)
    })
  }

return (
  <div className="All">
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form-data">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input className="input-text" type="text" name="" id="item" 
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
           />
        </div>
        <button className="btn">Add</button>
      </form>
    </div>
    <h1>To-do List</h1>
    <ul className="list">
      {todos.length === 0 && "No To-dos"}
      {todos.map(todo =>{
        return (
          <li key={todo.id}>
            <label htmlFor="">
              <input
                className="check"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            <button className="btn-danger" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        );
      })}
     
      {/* <li>
        <label htmlFor="">
          <input className="check" type="checkbox" />
          Item 2
        </label>
        <button className="btn-danger">Delete</button>
      </li> */}
    </ul>
  </div>
);
}

export default App;

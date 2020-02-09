import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_ID = 'todoApp.todos'

function App() {

  const [ todos, setTodos ] = useState([]);
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      })
       return todoNameRef.current.value = null
  }
  return (
    <main>
      
      <input className="inpt" placeholder="text" ref={todoNameRef}></input>
      <button className="add-btn" onClick={handleAddTodo}>Adicionar</button>
      <button className="remove-btn" onClick={handleClearTodos}>Limpar</button>
      <TodoList className="todo-list" todos={todos} toggleTodo={toggleTodo}/>
      <div className="count">{todos.filter(todo => !todo.complete).length} restantes</div>
    </main>
  );
}

export default App;

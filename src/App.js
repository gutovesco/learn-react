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
      <TodoList todos={todos}/>
      <input placeholder="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>Adicionar</button>
      <button>Limpar</button>
      <div>0 restantes</div>
    </main>
  );
}

export default App;

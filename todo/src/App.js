import React, { useState, useEffect } from 'react';
import './App.css';

import {
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import firebase from 'firebase';
import { Gradient } from 'react-gradient';

import db from './firebase';
import Todo from './components/Todo';

function App() {

  const gradients =
    [
      ['#F50057', '#FF4B2B'],
      ['#e53935', '#e35d5b'],
    ];

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })));
    });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className="App">
      <Gradient
        gradients={gradients}
        property="text"
        element="h1"
        angle="30deg"
        className="h1_todo"
      >Todo App</Gradient>
      <Gradient
        gradients={gradients}
        property="text"
        element="h4"
        angle="30deg"
        className="h4_todo"
      >Done by Kareem Krayem</Gradient>

      <div className="formCard">
        <form>
          <FormControl>
            <InputLabel color="secondary"> Write a Todo...</InputLabel>
            <Input color="secondary" value={input} onChange={event => setInput(event.target.value)} className="todo_input" />
            <Button disabled={!input} variant="contained" type='submit' onClick={addTodo} color="secondary">
              Add TODO
          </Button>
          </FormControl>
        </form>
      </div>

      <ul className="todo_list">
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div >
  );
}

export default App;

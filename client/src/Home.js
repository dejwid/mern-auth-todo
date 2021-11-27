import {useContext, useEffect, useState} from "react";
import UserContext from "./UserContext";
import axios from "axios";

function Home() {
  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState('');
  const [todos,setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/todos', {withCredentials:true})
      .then(response => {
        setTodos(response.data);
      })
  }, []);

  if (!userInfo.email) {
    return 'Your need to be logged in to see this page';
  }

  function addTodo(e) {
    e.preventDefault();
    axios.put('http://localhost:4000/todos', {text:inputVal}, {withCredentials:true})
      .then(response => {
        setTodos([...todos, response.data]);
        setInputVal('');
      })

  }

  function updateTodo(todo) {
    const data = {id:todo._id,done:!todo.done};
    axios.post('http://localhost:4000/todos', data, {withCredentials:true})
      .then(() => {
        const newTodos = todos.map(t => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  }

  return <div>
    <form onSubmit={e => addTodo(e)}>
      <input placeholder={'What do you want to do?'}
             value={inputVal}
             onChange={e => setInputVal(e.target.value)}/>
    </form>
    <ul>
      {todos.map(todo => (
        <li>
          <input type={'checkbox'}
                 checked={todo.done}
                 onClick={() => updateTodo(todo)}
          />
          {todo.done ? <del>{todo.text}</del> : todo.text}
        </li>
      ))}

    </ul>
  </div>
}

export default Home;
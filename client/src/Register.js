import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from "react-router-dom";

function Register() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setRedirect(true);
      });
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (
    <form action="" onSubmit={e => registerUser(e)}>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
      <button type="submit">register</button>
    </form>
  );
}

export default Register;
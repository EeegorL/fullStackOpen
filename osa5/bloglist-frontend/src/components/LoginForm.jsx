import {useState} from "react";
import loginService from "../services/login";

const LoginForm = ({setUser,  notify}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await loginService.login({username, password});
      setUsername("");
      setPassword("");

      const userData = {
        token: login.data.token,
        id: login.data.data.id,
        username: login.data.data.username
      };
      setUser(userData);
      window.localStorage.setItem("blogAppUser", JSON.stringify(userData));

    }
    catch(err) {
      notify(err.toString(), 1);
    }
  };

  return <div>
    <form onSubmit={onSubmit}>
      <label>Username <input onChange={e => setUsername(e.target.value)}/></label>
      <label>Password <input onChange={e => setPassword(e.target.value)}/></label>
      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default LoginForm;
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const authObject = {
      "project-ID": "b372d6e4-a569-4115-9fb8-6d10f0db84da",
      "User-Name": userName,
      "User-Secret": password,
    };
    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      localStorage.setItem("username", userName);
      localStorage.setItem("password", password);
      window.location.reload();
    } catch (error) {
      setError("oops, incorrect username or password");
    }
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Book Face</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            value={userName}
            className="input"
            placeholder="username"
            required={true}
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type="password"
            name=""
            value={password}
            className="input"
            placeholder="password"
            required={true}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

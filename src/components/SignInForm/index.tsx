/**
 * SignInForm component.
 * This component renders a form for user sign-in, including input fields for username and password,
 * a "Remember me" checkbox, a "Sign In" button, and an error message section.
 * On submit it sends API requests to authenticate the user.
 * If success it sets the authentication token and login status in Redux, and navigates to the user page.
 */

import "./style.css";

import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Imports relative to the global state management
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setToken } from "../../slices/userSlice";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redux dispatch hook for global state update
  const dispatch = useDispatch();
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Return true if username and password are both NOT empty
  function validateInputs(): boolean {
    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
      return false;
    }
    setErrorMessage("");
    return true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.body.token;
        dispatch(setToken({ token, rememberMe }));
        dispatch(setIsLoggedIn());
        navigate("/user");
      } else {
        if (response.status === 400) {
          setErrorMessage("Incorrect credentials");
        } else if (response.status === 500) {
          setErrorMessage("Error 500: Server Error");
        } else {
          setErrorMessage("Unknown Error");
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Oops an error occurred. You can retry or check the logs for more details.");
    }

    setUsername("");
    setPassword("");
    setRememberMe(false);
  }

  return (
    <form className='SignInForm' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        />
      </div>
      <div className='input-remember'>
        <input
          type='checkbox'
          id='remember-me'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor='remember-me'>Remember me</label>
      </div>
      <button type='submit' className='sign-in-button'>
        Sign In
      </button>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  );
}

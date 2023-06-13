/**
 * UserDetails component.
 * This component renders the user details section at the top of the user page. 
 * It includes the user's first name, last name, and an option to edit the name. 
 * It makes API calls to update the user's profile.
 * It also utilizes Redux for accessing global state data such as the user's first name, last name, and token.
 */

import "./style.css";

import { useState } from "react";

// Imports relative to the global state management
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/types";
import { updateUserName } from "../../slices/userSlice";

export default function UserDetails() {
  // Global state data
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);
  const token = useSelector((state: RootState) => state.user.token);

  // Local state data
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");

  // Redux dispatch hook for global state update
  const dispatch = useDispatch();

  /**
   * Return true if an input has content and that content has at least a length of 2 chars.
   * This allow the user to only change his first name or his last name.
   */
  function validateInputFields() {
    const isFirstNameValid = !updatedFirstName || updatedFirstName.length >= 2;
    const isLastNameValid = !updatedLastName || updatedLastName.length >= 2;

    if (!isFirstNameValid || !isLastNameValid) {
      setErrorMessage("The first name and last name must have a minimum of two characters.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  }

  function saveChanges() {
    if (!validateInputFields()) return;

    // If both inputs are empty we just cancel the edition and API request is not done.
    if (!updatedFirstName && !updatedLastName) {
      return setIsEditing(false);
    }

    // If a field is empty we just replace it with the current data allowing the user to change only his first name or his last name.
    const updatedUser = {
      firstName: updatedFirstName || firstName,
      lastName: updatedLastName || lastName,
    };

    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          // Update global state
          dispatch(updateUserName(updatedUser));
          // Reset form and editing status
          setUpdatedFirstName("");
          setUpdatedLastName("");
          setIsEditing(false);
        } else {
          if (response.status === 401) {
            setErrorMessage("Error 401: Unauthorized");
          } else if (response.status === 400) {
            setErrorMessage("Error 400: Bad Request");
          } else if (response.status === 500) {
            setErrorMessage("Error 500: Server Error");
          } else {
            setErrorMessage("Unknown Error");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Oops an error occurred. You can retry or check the logs for more details.");
      });
  }

  if (!isEditing) {
    return (
      <>
        <h1>
          Welcome back
          <br />
          {firstName + " " + lastName}
        </h1>
        <button className='edit-button' onClick={() => setIsEditing(true)}>
          Edit Name
        </button>
      </>
    );
  } else {
    return (
      <div className='UserDetails'>
        <h1>Welcome back</h1>
        <div className='input-container'>
          <input
            type='text'
            placeholder={firstName}
            value={updatedFirstName}
            onChange={(e) => setUpdatedFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder={lastName}
            value={updatedLastName}
            onChange={(e) => setUpdatedLastName(e.target.value)}
          />
        </div>
        <div className='edit-button-container'>
          <button className='edit-button' onClick={() => saveChanges()}>
            Save
          </button>
          <button
            className='edit-button'
            onClick={() => {
              setIsEditing(false);
              setErrorMessage("");
            }}
          >
            Cancel
          </button>
        </div>
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
      </div>
    );
  }
}

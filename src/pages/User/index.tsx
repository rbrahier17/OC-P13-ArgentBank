/**
 * User Page
 * This page displays the user's details and a transaction list.
 * User details are fetched from the server using the token provided by Redux.
 */

import "./style.css";

// Import components
import UserDetails from "../../components/UserDetails";
import AccountItem from "../../components/AccountItem";

// Imports relative to the global state management
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { RootState } from "../../store/types";

import { useEffect, useState } from "react";

export default function UserPage() {
  // Global state data
  const token = useSelector((state: RootState) => state.user.token);

  // Local state data
  const [errorMessage, setErrorMessage] = useState("");

  // Redux dispatch hook for global state update
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = (await response.json()).body;
          dispatch(
            setUser({
              firstName: data.firstName,
              lastName: data.lastName,
            })
          );
        } else {
          if (response.status === 401) {
            setErrorMessage("Token error - Unauthorized");
          } else if (response.status === 500) {
            setErrorMessage("Internal Server Error");
          }
        }
      } catch (error) {
        setErrorMessage("An error while retrieving user data. Please try again");
      }
    }

    fetchData();
  }, []);

  const accountData = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  if (errorMessage) return <p className='error-message'>{errorMessage}</p>;

  return (
    <main className='UserPage main bg-dark'>
      <div className='header'>
        <UserDetails />
      </div>

      {accountData.map((account, index) => (
        <AccountItem key={index} title={account.title} amount={account.amount} description={account.description} />
      ))}
    </main>
  );
}

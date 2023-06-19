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

// Import getUserData function (this function is handling the API request)
import getUserData from "../../api/user/getUserData";

import { useEffect, useState } from "react";

export default function UserPage() {
  // Global state data
  const token = useSelector((state: RootState) => state.user.token);

  // Local state data
  const [errorMessage, setErrorMessage] = useState("");

  // Redux dispatch hook for global state update
  const dispatch = useDispatch();

  useEffect(() => {
    async function setUserData() {
      try {
          const data = await getUserData(token);
          dispatch(
            setUser({
              firstName: data.firstName,
              lastName: data.lastName,
            })
          );
      } catch (error:any) {
        setErrorMessage(error.toString());
      }
    }
    setUserData();
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

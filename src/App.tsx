import { Routes, Route, Navigate } from "react-router-dom";

// Imports relative to the global state management
import { useSelector } from "react-redux";
import { RootState } from "./store/types";

// Import page components
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import UserPage from "./pages/User";

function App() {
  // Retrieve the user's login status from the global state
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      {/* 
        If the user is already logged in, redirect to the User page, otherwise show the Sign In page.
      */}
      <Route path='/sign-in' element={isLoggedIn ? <Navigate to='/user' replace /> : <SignInPage />} />
      {/* 
        If the user is logged in, show the UserPage component, otherwise redirect to the Sign In page.
      */}
      <Route path='/user' element={isLoggedIn ? <UserPage /> : <Navigate to='/sign-in' replace />} />
    </Routes>
  );
}

export default App;

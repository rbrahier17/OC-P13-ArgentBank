/**
 * Header component.
 * This component displays the header navigation bar, including the logo, user icon and first name, and sign in and out button.
 * The rendering of these elements is conditionally based on the user's login status, which is retrieved from Redux.
 */

import "./style.css";

// Import icons
import ArgentBankLogo from "../../assets/argent-bank-logo.png";
import UserIcon from "../../assets/icon-user.svg";
import SignOutIcon from "../../assets/icon-sign-out.svg";

// Imports relative to the global state management
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/types";
import { logoutUser } from "../../slices/userSlice";

import { Link } from "react-router-dom";

export default function Header() {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);
  const firstName: string = useSelector((state: RootState) => state.user.firstName);

  // Redux dispatch hook for global state update
  const dispatch = useDispatch();

  return (
    <header className='Header'>
      <nav className='main-nav'>
        <Link className='main-nav-logo' to='/'>
          <img className='main-nav-logo-image' src={ArgentBankLogo} alt='Logo Argent Bank' />
        </Link>

        <div className='main-nav-item-container'>
          <Link className='main-nav-item' to={isLoggedIn ? "/user" : "/sign-in"}>
            <img src={UserIcon} alt='User icon' />
            {isLoggedIn ? firstName : "Sign In"}
          </Link>
          {isLoggedIn && (
            <button className='main-nav-item sign-out-btn' onClick={() => dispatch(logoutUser())}>
              <img src={SignOutIcon} alt='Sign out icon' />
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
/**
 * SignIn Page
 */

import "./style.css";

import UserIcon from "../../assets/icon-user.svg";

import SignInForm from '../../components/SignInForm'

export default function SignInPage() {
  return (
    <main className='SignInPage main bg-dark'>
      <section className='sign-in-content'>
        <img src={UserIcon} alt='User icon' />
        <h1>Sign In</h1>
        <SignInForm />
      </section>
    </main>
  );
}

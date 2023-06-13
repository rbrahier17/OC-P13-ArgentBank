// Footer component

import "./style.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='Footer'>
      <p className='footer-text'>Copyright {currentYear} Argent Bank</p>
    </footer>
  );
}

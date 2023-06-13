/**
 * AccountItem component.
 * Component for displaying information about a transaction on the /user page.
 */

import "./style.css";

interface AccountItemProps {
  title: string;
  amount: string;
  description: string;
}

export default function AccountItem({ title, amount, description }: AccountItemProps) {
  return (
    <section className='AccountItem'>
      <div className='account-content-wrapper'>
        <h3 className='account-title'>{title}</h3>
        <p className='account-amount'>{amount}</p>
        <p className='account-amount-description'>{description}</p>
      </div>
      <div className='account-content-wrapper cta'>
        <button className='transaction-button'>View transactions</button>
      </div>
    </section>
  );
}

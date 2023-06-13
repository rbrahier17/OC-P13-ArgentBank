/**
 * FeatureItem component.
 * Component for displaying the bank main features on the homepage.
 */

import "./style.css";

interface FeatureItemProps {
  icon: string;
  iconAlt: string;
  title: string;
  text: string;
}

export default function FeatureItem({ icon, iconAlt, title, text }: FeatureItemProps) {
  return (
    <div className='FeatureItem'>
      <img src={icon} alt={iconAlt} className='feature-icon' />
      <h3 className='feature-item-title'>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

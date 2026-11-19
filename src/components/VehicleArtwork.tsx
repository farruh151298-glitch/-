import React from 'react';
import { TariffId } from '../types/delivery';

interface VehicleArtworkProps {
  type: TariffId;
  className?: string;
}

export const VehicleArtwork: React.FC<VehicleArtworkProps> = ({ type, className = 'w-16 h-10' }) => {
  if (type === 'scooter') {
    return (
      <svg
        viewBox="0 0 96 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <ellipse cx="48" cy="53" rx="34" ry="3.5" fill="#15201B" fillOpacity="0.1" />
        {/* Tajik Emerald insulated delivery box with Saffron Gold trim */}
        <rect x="14" y="13" width="24" height="20" rx="3" fill="#0B6E4F" stroke="#15201B" strokeWidth="2" />
        <path d="M14 20H38" stroke="#E89E24" strokeWidth="2" />
        <rect x="22" y="15.5" width="8" height="2" rx="1" fill="#FFFFFF" />
        {/* Rear wheel */}
        <circle cx="26" cy="45" r="8" fill="#15201B" />
        <circle cx="26" cy="45" r="3.5" fill="#F6F5F0" />
        {/* Front wheel */}
        <circle cx="72" cy="45" r="8" fill="#15201B" />
        <circle cx="72" cy="45" r="3.5" fill="#F6F5F0" />
        {/* Frame */}
        <path
          d="M26 45L33 35H53L62 21H68L72 45"
          stroke="#15201B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 35C20 31 24 29 30 29H43L47 36H22C20.8 36 20 35.6 20 35Z"
          fill="#26332D"
        />
        <path
          d="M35 28C35 26.5 37 25.5 40 25.5H49C51 25.5 52 27 51 28.5H35V28Z"
          fill="#15201B"
        />
        <path d="M59 22L64 15H70" stroke="#15201B" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M61 23C66 23 70 28 72 37L65 37L61 23Z"
          fill="#0B6E4F"
          stroke="#15201B"
          strokeWidth="1.8"
        />
        <circle cx="69" cy="24" r="2.2" fill="#FDE68A" stroke="#15201B" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'car') {
    return (
      <svg
        viewBox="0 0 96 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <ellipse cx="48" cy="52" rx="38" ry="3.5" fill="#15201B" fillOpacity="0.1" />
        <path
          d="M12 39C12 34 15 31 21 30L31 20C33.5 17.5 37 16.5 42 16.5H59C64.5 16.5 68 18.5 72 23L80 30C84 31 86 33.5 86 38V43C86 44.5 84.5 45.5 83 45.5H15C13.5 45.5 12 44.5 12 43V39Z"
          fill="#FFFFFF"
          stroke="#15201B"
          strokeWidth="2"
        />
        {/* Emerald & Gold livery stripe */}
        <path d="M14 35.5H84V39.5H14V35.5Z" fill="#0B6E4F" />
        <path d="M14 39.5H84V41.5H14V39.5Z" fill="#E89E24" />
        <path
          d="M33 21.5C34.5 19.8 36.8 19 40 19H49V29H26L33 21.5Z"
          fill="#D7E6DF"
          stroke="#15201B"
          strokeWidth="1.6"
        />
        <path
          d="M52 19H59C62.5 19 65 20.5 67.5 23.5L72.5 29H52V19Z"
          fill="#D7E6DF"
          stroke="#15201B"
          strokeWidth="1.6"
        />
        <circle cx="27" cy="45" r="7.5" fill="#15201B" />
        <circle cx="27" cy="45" r="3" fill="#F6F5F0" />
        <circle cx="71" cy="45" r="7.5" fill="#15201B" />
        <circle cx="71" cy="45" r="3" fill="#F6F5F0" />
        <rect x="44" y="12.5" width="12" height="4" rx="1.5" fill="#0B6E4F" stroke="#15201B" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 96 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="48" cy="52" rx="39" ry="3.5" fill="#15201B" fillOpacity="0.1" />
      <rect x="11" y="14" width="46" height="26" rx="2.5" fill="#0B6E4F" stroke="#15201B" strokeWidth="2" />
      <path d="M11 21H57" stroke="#E89E24" strokeWidth="2" />
      <path d="M22 27H38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 32H31" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M57 20H71C75.5 20 79 23 81.5 28L85 33.5V43C85 44.5 83.8 45.5 82 45.5H57V20Z"
        fill="#FFFFFF"
        stroke="#15201B"
        strokeWidth="2"
      />
      <rect x="11" y="40" width="46" height="5.5" fill="#26332D" />
      <path
        d="M61 23H70C73 23 75.5 25 77.5 29L79 32H61V23Z"
        fill="#D7E6DF"
        stroke="#15201B"
        strokeWidth="1.6"
      />
      <circle cx="25" cy="45.5" r="7" fill="#15201B" />
      <circle cx="25" cy="45.5" r="2.8" fill="#F6F5F0" />
      <circle cx="72" cy="45.5" r="7" fill="#15201B" />
      <circle cx="72" cy="45.5" r="2.8" fill="#F6F5F0" />
    </svg>
  );
};

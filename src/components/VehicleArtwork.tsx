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
        {/* Ground shadow */}
        <ellipse cx="48" cy="53" rx="34" ry="3.5" fill="#141413" fillOpacity="0.1" />
        {/* Thermal delivery box on rear rack */}
        <rect x="14" y="13" width="24" height="20" rx="3" fill="#FFCC00" stroke="#141413" strokeWidth="2" />
        <path d="M14 20H38" stroke="#141413" strokeWidth="1.5" />
        <rect x="23" y="16" width="6" height="2" rx="1" fill="#141413" />
        {/* Rear wheel */}
        <circle cx="26" cy="45" r="8" fill="#141413" />
        <circle cx="26" cy="45" r="3.5" fill="#ECEBE6" />
        {/* Front wheel */}
        <circle cx="72" cy="45" r="8" fill="#141413" />
        <circle cx="72" cy="45" r="3.5" fill="#ECEBE6" />
        {/* Scooter frame & floorboard */}
        <path
          d="M26 45L33 35H53L62 21H68L72 45"
          stroke="#141413"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Body fairing */}
        <path
          d="M20 35C20 31 24 29 30 29H43L47 36H22C20.8 36 20 35.6 20 35Z"
          fill="#2B2B28"
        />
        {/* Seat */}
        <path
          d="M35 28C35 26.5 37 25.5 40 25.5H49C51 25.5 52 27 51 28.5H35V28Z"
          fill="#141413"
        />
        {/* Front shield & handlebar */}
        <path
          d="M59 22L64 15H70"
          stroke="#141413"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M61 23C66 23 70 28 72 37L65 37L61 23Z"
          fill="#FFCC00"
          stroke="#141413"
          strokeWidth="1.8"
        />
        {/* Headlight */}
        <circle cx="69" cy="24" r="2.2" fill="#FFFFFF" stroke="#141413" strokeWidth="1.5" />
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
        <ellipse cx="48" cy="52" rx="38" ry="3.5" fill="#141413" fillOpacity="0.1" />
        {/* Car silhouette */}
        <path
          d="M12 39C12 34 15 31 21 30L31 20C33.5 17.5 37 16.5 42 16.5H59C64.5 16.5 68 18.5 72 23L80 30C84 31 86 33.5 86 38V43C86 44.5 84.5 45.5 83 45.5H15C13.5 45.5 12 44.5 12 43V39Z"
          fill="#FFFFFF"
          stroke="#141413"
          strokeWidth="2"
        />
        {/* Branded yellow side stripe */}
        <path d="M14 36H84V40.5H14V36Z" fill="#FFCC00" />
        {/* Windows */}
        <path
          d="M33 21.5C34.5 19.8 36.8 19 40 19H49V29H26L33 21.5Z"
          fill="#DCE3E8"
          stroke="#141413"
          strokeWidth="1.6"
        />
        <path
          d="M52 19H59C62.5 19 65 20.5 67.5 23.5L72.5 29H52V19Z"
          fill="#DCE3E8"
          stroke="#141413"
          strokeWidth="1.6"
        />
        {/* Wheels */}
        <circle cx="27" cy="45" r="7.5" fill="#141413" />
        <circle cx="27" cy="45" r="3" fill="#ECEBE6" />
        <circle cx="71" cy="45" r="7.5" fill="#141413" />
        <circle cx="71" cy="45" r="3" fill="#ECEBE6" />
        {/* Roof delivery sign */}
        <rect x="44" y="12.5" width="12" height="4" rx="1.5" fill="#FFCC00" stroke="#141413" strokeWidth="1.5" />
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
      <ellipse cx="48" cy="52" rx="39" ry="3.5" fill="#141413" fillOpacity="0.1" />
      {/* Cargo box */}
      <rect x="11" y="14" width="46" height="26" rx="2.5" fill="#FFCC00" stroke="#141413" strokeWidth="2" />
      <path d="M11 22H57" stroke="#141413" strokeWidth="1.4" strokeOpacity="0.35" />
      <path d="M22 27H38" stroke="#141413" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 32H31" stroke="#141413" strokeWidth="2" strokeLinecap="round" />
      {/* Cabin */}
      <path
        d="M57 20H71C75.5 20 79 23 81.5 28L85 33.5V43C85 44.5 83.8 45.5 82 45.5H57V20Z"
        fill="#FFFFFF"
        stroke="#141413"
        strokeWidth="2"
      />
      {/* Chassis bar */}
      <rect x="11" y="40" width="46" height="5.5" fill="#2B2B28" />
      {/* Cabin window */}
      <path
        d="M61 23H70C73 23 75.5 25 77.5 29L79 32H61V23Z"
        fill="#DCE3E8"
        stroke="#141413"
        strokeWidth="1.6"
      />
      {/* Wheels */}
      <circle cx="25" cy="45.5" r="7" fill="#141413" />
      <circle cx="25" cy="45.5" r="2.8" fill="#ECEBE6" />
      <circle cx="72" cy="45.5" r="7" fill="#141413" />
      <circle cx="72" cy="45.5" r="2.8" fill="#ECEBE6" />
    </svg>
  );
};

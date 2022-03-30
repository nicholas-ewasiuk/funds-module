import React from 'react';

export const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 32, height = 32 }) => {
  return (
    <svg width={width} height={height} version="1.1" viewBox="0 0 8.4667 8.4667" xmlns="http://www.w3.org/2000/svg">
    <defs>
     <linearGradient id="linearGradient1300" x1="9.9767" x2="22.466" y1="1.6429" y2="42.689" gradientUnits="userSpaceOnUse">
      <stop stopColor="#06d6a0" offset="0"/>
      <stop stopColor="#b2b2b2" stopOpacity="0" offset="1"/>
     </linearGradient>
    </defs>
    <path transform="scale(.26458)" d="m16 1.584a14.415 14.415 0 0 0-14.416 14.416 14.415 14.415 0 0 0 14.416 14.416 14.415 14.415 0 0 0 14.416-14.416 14.415 14.415 0 0 0-14.416-14.416zm0 4.5059a9.911 9.911 0 0 1 9.9102 9.9102 9.911 9.911 0 0 1-9.9102 9.9102 9.911 9.911 0 0 1-9.9102-9.9102 9.911 9.911 0 0 1 9.9102-9.9102z" fill="url(#linearGradient1300)" strokeWidth="2.8356"/>
   </svg>
  );
};
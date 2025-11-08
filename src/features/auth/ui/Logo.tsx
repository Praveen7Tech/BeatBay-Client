
import React from 'react';

export const AppLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="\logos\logo-w.png"
        alt="BeatBay Logo"
        width={80} 
        height={80} 
      />
      <p className="text-sm text-white mt-1">BeatBay</p>
    </div>
  );
};

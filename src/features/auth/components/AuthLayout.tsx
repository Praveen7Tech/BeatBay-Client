import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-green-600 to-green-900 rounded-2xl p-8 text-white">
        {/* logo, input, button add */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;


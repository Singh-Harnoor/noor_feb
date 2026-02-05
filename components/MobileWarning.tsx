
import React from 'react';

const MobileWarning: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-600 p-8 text-center">
      <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
        Noor,<br />
        <span className="bg-white text-red-600 px-4 mt-4 inline-block transform -rotate-2">
          USE COMPUTER!!
        </span>
      </h1>
    </div>
  );
};

export default MobileWarning;

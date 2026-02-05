import React, { useState, useCallback, useRef } from 'react';
import { Position } from '../types';

interface Props {
  onAccept: () => void;
}

const ValentineProposal: React.FC<Props> = ({ onAccept }) => {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    // Use window dimensions to ensure it stays in the "visual display" (viewport)
    const padding = 60; // Extra padding to keep it well within view
    const buttonWidth = 100 * noScale;
    const buttonHeight = 50 * noScale;

    // Calculate maximum safe bounds based on current window size
    const maxWidth = window.innerWidth - buttonWidth - padding;
    const maxHeight = window.innerHeight - buttonHeight - padding;
    
    // Fallback for very small containers
    const safeMaxX = Math.max(padding, maxWidth);
    const safeMaxY = Math.max(padding, maxHeight);

    // Randomize position within the safe viewport area
    const randomX = Math.floor(Math.random() * (safeMaxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (safeMaxY - padding)) + padding;

    setNoPosition({ x: randomX, y: randomY });
    
    // Increase Yes button size and decrease No button size
    setYesScale(prev => Math.min(prev + 0.4, 12));
    setNoScale(prev => Math.max(prev * 0.85, 0.15));
  }, [noScale]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center p-4 z-10"
    >
      <div className="text-center mb-12 select-none">
        <h2 className="font-romantic text-7xl md:text-8xl text-red-600 mb-4 drop-shadow-md">
          Noor,
        </h2>
        <p className="font-dancing text-4xl md:text-5xl text-red-500 px-4">
          would you be the valentine of Noor?
        </p>
      </div>

      <div className="flex items-center justify-center gap-12 relative min-h-[300px] w-full max-w-4xl">
        {/* Yes Button */}
        <button
          onClick={onAccept}
          style={{ 
            transform: `scale(${yesScale})`,
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl z-20 whitespace-nowrap active:scale-95"
        >
          YES ❤️
        </button>

        {/* No Button */}
        <button
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          style={{
            position: noPosition ? 'fixed' : 'static',
            left: noPosition ? `${noPosition.x}px` : 'auto',
            top: noPosition ? `${noPosition.y}px` : 'auto',
            transform: `scale(${noScale})`,
            transition: noPosition ? 'all 0.15s ease-out' : 'transform 0.3s ease-out',
            pointerEvents: noScale < 0.15 ? 'none' : 'auto',
            opacity: noScale < 0.2 ? 0.3 : 1
          }}
          className="bg-gray-400 text-white font-bold py-4 px-10 rounded-full shadow-lg z-50 transition-colors hover:bg-gray-500"
        >
          No
        </button>
      </div>

      {/* Helper text when No button starts running */}
      {noPosition && (
        <p className="absolute bottom-10 text-gray-400 italic font-medium animate-pulse select-none text-center">
          Hint: The "No" button is playing hard to catch!
        </p>
      )}
    </div>
  );
};

export default ValentineProposal;
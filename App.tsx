
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import MobileWarning from './components/MobileWarning';
import ValentineProposal from './components/ValentineProposal';
import Celebration from './components/Celebration';

const App: React.FC = () => {
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [viewState, setViewState] = useState<ViewState>(ViewState.PROPOSAL);

  useEffect(() => {
    const checkDevice = () => {
      // Standard breakpoint for phones is usually below 640px. 
      // Tablets (like iPads) typically start at 768px.
      const isSmallScreen = window.innerWidth < 640;
      setIsPhone(isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isPhone) {
    return <MobileWarning />;
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-red-200 animate-pulse text-6xl opacity-30">❤</div>
      <div className="absolute bottom-10 right-10 text-red-200 animate-pulse text-6xl opacity-30">❤</div>
      <div className="absolute top-1/4 right-1/4 text-red-100 animate-float text-8xl opacity-20">❤</div>
      <div className="absolute bottom-1/4 left-1/4 text-red-100 animate-float text-8xl opacity-20" style={{ animationDelay: '1s' }}>❤</div>

      {viewState === ViewState.PROPOSAL && (
        <ValentineProposal onAccept={() => setViewState(ViewState.ACCEPTED)} />
      )}

      {viewState === ViewState.ACCEPTED && (
        <Celebration />
      )}
    </div>
  );
};

export default App;

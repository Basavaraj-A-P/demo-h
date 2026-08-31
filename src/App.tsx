import { Square, Pause, Music } from 'lucide-react';
import { useBreathingSession, BREATHING_PATTERN, SESSION_LENGTHS } from './hooks/useBreathingSession';
import { useAmbientAudio } from './hooks/useAmbientAudio';
import { AmbientBackground } from './components/AmbientBackground';
import { BreathingCore } from './components/BreathingCore';

function App() {
  const {
    phase,
    timeLeft,
    currentRound,
    totalRounds,
    sessionLengthMin,
    isPaused,
    isFinished,
    setSessionLengthMin,
    setIsPaused,
    quitSession,
    resetSession,
  } = useBreathingSession(2);

  const { isAudioEnabled, setIsAudioEnabled } = useAmbientAudio('/assets/audio/ambient.mp3', isPaused);

  // If session finishes naturally, we show a completed state.
  if (isFinished) {
    return (
      <div className="min-h-[100dvh] relative flex flex-col items-center justify-center font-sans text-brand bg-[#EFE9FB]">
        <AmbientBackground />
        <div className="relative z-10 glass-panel rounded-[2rem] p-8 flex flex-col items-center text-center max-w-sm mx-4">
          <h1 className="text-3xl font-bold mb-4">Session Complete</h1>
          <p className="text-gray-600 mb-8 font-medium">You completed {currentRound - 1} rounds. Take a moment to notice how you feel.</p>
          <button 
            onClick={resetSession}
            className="bg-brand text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:0${secs}`.slice(-5);
  };

  const getPhaseDots = () => {
    return (
      <div className="flex gap-2.5 mt-2">
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'Inhale' ? 'bg-brand' : 'bg-[#D1C5E8]'}`}></div>
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'Hold' ? 'bg-brand' : 'bg-[#D1C5E8]'}`}></div>
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'Exhale' ? 'bg-brand' : 'bg-[#D1C5E8]'}`}></div>
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden font-sans flex flex-col justify-between pt-6 pb-6 px-4 sm:px-12 text-[#2a1a5e]">
      
      <AmbientBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto justify-between">
        
        {/* Central Visualization (pushes down slightly but stays compact) */}
        <div className="flex-1 flex flex-col items-center justify-center relative mt-2">
          
          {/* We slightly scale down BreathingCore on very short screens if needed, but flex handles it */}
             <BreathingCore phase={phase} isPaused={isPaused} />

          {/* Phase Text */}
          <div className="mt-2 flex flex-col items-center">
            <div className="flex items-center gap-3 text-[20px] sm:text-[24px] font-semibold mb-0 text-[#200E4A]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9C77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
              <span>{phase === 'Inhale' ? 'Breathe In' : phase === 'Hold' ? 'Hold' : 'Breathe Out'}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9C77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
            </div>
            <div className="text-[32px] sm:text-[36px] text-brand font-medium mb-1 tracking-wide font-['Plus_Jakarta_Sans']">
              {formatTime(timeLeft)}
            </div>
            {getPhaseDots()}
          </div>
        </div>

        {/* Bottom Section Wrapper */}
        <div className="flex flex-col gap-2 mt-2 shrink-0">
          
          {/* Phase Timeline Slider */}
          <div className="glass-panel rounded-full h-[54px] flex items-center justify-between relative shadow-sm px-1.5 overflow-hidden">
             
             {/* Background Track Line connecting Inhale and Exhale */}
             <div className="absolute left-[20%] right-[20%] top-1/2 transform -translate-y-1/2 h-[3px] bg-[#D1C5E8] rounded-full z-0">
                <div className="h-full bg-brand rounded-full transition-all duration-[1000ms] ease-linear" 
                     style={{ 
                       width: phase === 'Inhale' ? '0%' : phase === 'Hold' ? '50%' : '100%',
                     }}></div>
             </div>

             {/* Inhale */}
             <div className={`relative flex items-center gap-2 pl-3 z-10 w-1/3 transition-opacity bg-transparent ${phase === 'Inhale' ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-6 h-6 rounded-full border-[1.5px] border-[#9C77FF] flex items-center justify-center text-brand bg-white/50 backdrop-blur-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                </div>
                <div className="flex flex-col bg-white/20 backdrop-blur-sm px-1.5 rounded-md">
                  <span className="text-[11px] font-bold text-[#200E4A] leading-none">Inhale</span>
                  <span className="text-brand text-[11px] font-semibold">{BREATHING_PATTERN.Inhale}s</span>
                </div>
             </div>
             
             {/* Active Pill (Hold) */}
             <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F9F6FF] border border-[#9C77FF] rounded-full px-4 py-1.5 flex items-center justify-center gap-1.5 shadow-md z-10 min-w-[90px] transition-opacity ${phase === 'Hold' ? 'opacity-100 ring-[3px] ring-brand/20' : 'opacity-80 border-transparent bg-white/80 backdrop-blur-md'}`}>
               <Pause size={12} className="text-brand" fill="currentColor"/>
               <div className="flex flex-col items-center">
                  <span className="text-[11px] font-bold text-brand leading-none">Hold</span>
                  <span className="text-brand text-[11px] font-semibold">{BREATHING_PATTERN.Hold}s</span>
                </div>
             </div>

             {/* Exhale */}
             <div className={`relative flex items-center justify-end gap-2 pr-4 z-10 w-1/3 transition-opacity bg-transparent ${phase === 'Exhale' ? 'opacity-100' : 'opacity-50'}`}>
                <div className="flex flex-col text-right bg-white/20 backdrop-blur-sm px-1.5 rounded-md">
                  <span className="text-[11px] font-bold text-[#200E4A] leading-none">Exhale</span>
                  <span className="text-gray-500 text-[11px] font-semibold">{BREATHING_PATTERN.Exhale}s</span>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 bg-white/50 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                </div>
             </div>
          </div>

          {/* Session Info */}
          <div className="glass-panel rounded-3xl py-2 px-4 flex items-center shadow-sm">
            {/* Length Options */}
            <div className="flex flex-col items-center w-1/2 relative pt-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider absolute top-[-2px]">Session Length</span>
              <div className="flex items-center gap-1 mt-2.5">
                {SESSION_LENGTHS.map((len) => (
                  <button 
                    key={len}
                    onClick={() => setSessionLengthMin(len)}
                    disabled={!isPaused && timeLeft < BREATHING_PATTERN.Inhale && currentRound > 1}
                    className={`text-[12px] px-3 py-1.5 rounded-full font-bold transition-colors ${
                      sessionLengthMin === len 
                      ? 'border border-brand text-brand bg-white' 
                      : 'text-gray-500 hover:text-gray-700 disabled:opacity-50'
                    }`}
                  >
                    {len} Min
                  </button>
                ))}
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-10 w-[1.5px] bg-[#E0D4F5] mx-1"></div>

            {/* Round Info */}
            <div className="flex items-center gap-3 w-1/2 pl-3">
              {/* Circular Progress */}
              <div className="relative w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#D1C5E8]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-brand transition-all duration-1000 ease-in-out" strokeDasharray={`${Math.min(100, (currentRound / totalRounds) * 100)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[13px] font-bold text-[#200E4A]">Round {currentRound} of {totalRounds}</span>
                <div className="flex justify-between mt-1.5 w-full pr-2">
                  {Array.from({ length: Math.min(8, totalRounds) }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i < currentRound ? 'bg-brand' : 'bg-[#D1C5E8]'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex justify-between items-end px-5 mt-2 mb-1">
            <div className="flex flex-col items-center gap-1.5">
              <button onClick={quitSession} aria-label="Quit Session" className="w-[44px] h-[44px] rounded-full glass-panel flex items-center justify-center text-brand hover:bg-white/80 transition-colors shadow-sm focus:ring-2 focus:ring-brand outline-none">
                <Square size={16} fill="currentColor" />
              </button>
              <span className="text-[11px] font-bold text-gray-500">Quit</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 mb-0.5">
              <button 
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Resume' : 'Pause'}
                className="w-[56px] h-[56px] rounded-full bg-brand text-white flex items-center justify-center shadow-[0_10px_30px_rgba(69,11,200,0.4)] relative group border-[1.5px] border-[#6C36F9] focus:ring-4 focus:ring-brand/30 outline-none transition-transform active:scale-95"
              >
                {/* Inner highlight */}
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none"></div>

                <div className="relative z-10 flex gap-1.5">
                  {isPaused ? (
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  ) : (
                    <>
                      <div className="w-[6px] h-7 bg-white rounded-full"></div>
                      <div className="w-[6px] h-7 bg-white rounded-full"></div>
                    </>
                  )}
                </div>
              </button>
              <span className="text-[11px] font-bold text-gray-500">{isPaused ? 'Resume' : 'Pause'}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <button 
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                aria-label="Toggle Ambient Audio"
                className={`w-[44px] h-[44px] rounded-full glass-panel flex items-center justify-center transition-colors shadow-sm focus:ring-2 focus:ring-brand outline-none ${isAudioEnabled ? 'text-brand bg-white/70' : 'text-gray-400'}`}
              >
                <Music size={18} strokeWidth={2.5}/>
              </button>
              <span className="text-[11px] font-bold text-gray-500">Ambient</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;

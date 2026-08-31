import { useState, useEffect, useCallback, useRef } from 'react';

export type BreathingPhase = 'Inhale' | 'Hold' | 'Exhale';

export const BREATHING_PATTERN = {
  Inhale: 4,
  Hold: 7,
  Exhale: 8,
};

export const SESSION_LENGTHS = [2, 3, 5];

export function useBreathingSession(initialSessionLengthMin: number = 2) {
  const [sessionLengthMin, setSessionLengthMin] = useState(initialSessionLengthMin);
  const [phase, setPhase] = useState<BreathingPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(BREATHING_PATTERN.Inhale);
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalDuration = sessionLengthMin * 60;
  const roundDuration = BREATHING_PATTERN.Inhale + BREATHING_PATTERN.Hold + BREATHING_PATTERN.Exhale;
  const totalRounds = Math.max(1, Math.floor(totalDuration / roundDuration));

  const timerRef = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handlePhaseComplete = useCallback(() => {
    if (phase === 'Inhale') {
      setPhase('Hold');
      setTimeLeft(BREATHING_PATTERN.Hold);
    } else if (phase === 'Hold') {
      setPhase('Exhale');
      setTimeLeft(BREATHING_PATTERN.Exhale);
    } else if (phase === 'Exhale') {
      if (currentRound >= totalRounds) {
        setIsFinished(true);
        setTimeLeft(0);
        cleanup();
      } else {
        setCurrentRound((r) => r + 1);
        setPhase('Inhale');
        setTimeLeft(BREATHING_PATTERN.Inhale);
      }
    }
  }, [phase, currentRound, totalRounds, cleanup]);

  useEffect(() => {
    if (timeLeft <= 0 && !isFinished && !isPaused) {
      handlePhaseComplete();
    }
  }, [timeLeft, isFinished, isPaused, handlePhaseComplete]);

  useEffect(() => {
    if (isPaused || isFinished) {
      cleanup();
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return cleanup;
  }, [isPaused, isFinished, cleanup]);

  const quitSession = useCallback(() => {
    cleanup();
    setIsFinished(true);
    setPhase('Inhale');
    setTimeLeft(0);
  }, [cleanup]);

  const resetSession = useCallback(() => {
    cleanup();
    setPhase('Inhale');
    setTimeLeft(BREATHING_PATTERN.Inhale);
    setCurrentRound(1);
    setIsFinished(false);
    setIsPaused(false);
  }, [cleanup]);

  return {
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
  };
}

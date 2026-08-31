import { useEffect, useRef, useState } from 'react';

export function useAmbientAudio(src: string, isAppPaused: boolean) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element once
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.3; // Low volume for ambient sound
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioEnabled && !isAppPaused) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, handle gracefully by disabling it
          setIsAudioEnabled(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioEnabled, isAppPaused]);

  return {
    isAudioEnabled,
    setIsAudioEnabled,
  };
}

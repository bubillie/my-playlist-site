"use client";
import "./globals.css";
import { useState, useRef, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/bgm.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <html lang="ja">
      <body className="min-h-full flex flex-col">
        {children}
        <button
          onClick={toggle}
          className="fixed bottom-6 right-6 text-xs tracking-widest px-3 py-2 border border-[#2c2820] bg-[#f5f0e8] text-[#2c2820] hover:bg-[#2c2820] hover:text-[#f5f0e8] transition-colors duration-150"
        >
          {playing ? "SOUND OFF" : "SOUND ON"}
        </button>
      </body>
    </html>
  );
}
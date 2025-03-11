"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
} from "lucide-react";
import Vinilo from "./vinilo";

// Ejemplo de lista de canciones
const playlist = [
  {
    id: 1,
    title: "NIGHT DANCER",
    artist: "imase",
    duration: 237, // en segundos
    cover: "/albumMinato.jpg", // Ensure this path is correct and the file exists
    src: "/audio/imaseNIGHT DANCERMV.mp3", // Add the path to the audio file
  },
  {
    id: 2,
    title: "I Wish You Were Mine",
    artist: "Loving Caliber, Mia Niles",
    duration: 195,
    cover: "/albumKokoronashi.jpg",
    src: "/audio/Loving Caliber, Mia Niles - I Wish You Were Mine (Lyrics  Sub. Español).mp3", // Add the path to the audio file
  },
  {
    id: 3,
    title: "SPICE",
    artist: "Tokio Karan Colon",
    duration: 263,
    cover: "/albumHotarubi.jpg",
    src: "/audio/東京カランコロン - スパイス.mp3", // Add the path to the audio file
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack.duration);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerData, setVisualizerData] = useState<number[]>([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Función para formatear el tiempo en minutos:segundos
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Simular datos del visualizador
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newData = Array(20)
          .fill(0)
          .map(() => Math.random() * (isPlaying ? 1 : 0.1));
        setVisualizerData(newData);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVisualizerData(
        Array(20)
          .fill(0)
          .map(() => Math.random() * 0.1)
      );
    }
  }, [isPlaying]);

  // Actualizar el tiempo actual
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime((prev) => prev + 1);
      } else if (currentTime >= duration) {
        handleNext();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio before changing the source
      audioRef.current.src = currentTrack.src;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const prevIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    const prevTrack = playlist[prevIndex];
    setCurrentTrack(prevTrack);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio before changing the source
      audioRef.current.src = prevTrack.src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    let nextIndex;
    if (isRepeat) {
      nextIndex = currentIndex; // Repeat the current track
    } else if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length); // Shuffle mode
    } else {
      nextIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1;
    }
    const nextTrack = playlist[nextIndex];
    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio before changing the source
      audioRef.current.src = nextTrack.src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.7 : 0); // Restore volume to 0.7 when unmuting
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  return (
    <div className="border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm bg-black/40 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Album cover */}
          <div className=" relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border-2 border-purple-500 glow-purple">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-black/40 mix-blend-overlay"></div>
            <img
              src={currentTrack.cover || "/placeholder.svg"}
              alt={currentTrack.title}
              className="object-cover"
            />

            {/* Vinyl effect */}

            <div
              className={` absolute inset-0 flex items-center justify-center ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            >
              <Vinilo />
            </div>
          </div>

          {/* Track info and controls */}
          <div className="flex-1 w-full">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-cyan-300">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-purple-300">{currentTrack.artist}</p>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-xs text-purple-300 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  className={`hover:text-cyan-300 transition-colors ${
                    isShuffle ? "text-cyan-300" : "text-purple-300"
                  }`}
                  onClick={toggleShuffle}
                >
                  <Shuffle size={16} />
                </button>
                <button
                  className="text-purple-300 hover:text-cyan-300 transition-colors"
                  onClick={handlePrevious}
                >
                  <SkipBack size={20} />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white hover:from-purple-500 hover:to-pink-500 transition-colors"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} className="ml-1" />
                  )}
                </button>
                <button
                  className="text-purple-300 hover:text-cyan-300 transition-colors"
                  onClick={handleNext}
                >
                  <SkipForward size={20} />
                </button>
                <button
                  className={`hover:text-cyan-300 transition-colors ${
                    isRepeat ? "text-cyan-300" : "text-purple-300"
                  }`}
                  onClick={toggleRepeat}
                >
                  <Repeat size={16} />
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <button
                  className="text-purple-300 hover:text-cyan-300 transition-colors"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-purple-500"
                  style={{
                    background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                      volume * 100
                    }%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audio visualizer */}
        <div className="mt-6 h-12 flex items-end justify-center gap-1">
          {visualizerData.map((value, index) => (
            <div
              key={index}
              className="w-2 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t"
              style={{
                height: `${value * 100}%`,
                opacity: isPlaying ? 0.8 : 0.4,
                transition: "height 0.1s ease-in-out",
              }}
            ></div>
          ))}
        </div>

        {/* Playlist preview */}
        <div className="mt-6 pt-4 border-t border-purple-500/20">
          <h4 className="text-sm font-bold text-purple-300 mb-2">Playlist</h4>
          <div className="space-y-2">
            {playlist.map((track) => (
              <div
                key={track.id}
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-purple-900/20 transition-colors ${
                  currentTrack.id === track.id
                    ? "bg-purple-900/30 border-l-2 border-cyan-400"
                    : ""
                }`}
                onClick={() => {
                  setCurrentTrack(track);
                  setDuration(track.duration); // Actualizar la duración
                  setCurrentTime(0);
                  setIsPlaying(true);
                }}
              >
                <div className="w-8 h-8 relative rounded overflow-hidden">
                  <img
                    src={track.cover || "/placeholder.svg"}
                    alt={track.title}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                  {currentTrack.id === track.id && isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      currentTrack.id === track.id
                        ? "text-cyan-300"
                        : "text-purple-200"
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="text-xs text-purple-400">{track.artist}</p>
                </div>
                <div className="text-xs text-purple-400">
                  {formatTime(track.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}

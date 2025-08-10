'use client'

import { useState } from 'react';
import { saveScore } from '@/lib/supabase';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
  time: number;
  moves: number;
}

export default function GameOverModal({ isOpen, onClose, onNewGame, time, moves }: GameOverModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Calculate score based on time and moves (lower is better)
      const score = Math.round((time * 100) + (moves * 10));
      
      const result = await saveScore({
        player_name: playerName.trim(),
        score: score,
        time_taken: time
      });

      if (result.error) {
        setError(result.error);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError('Failed to save score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          🎉 Game Complete! 🎉
        </h2>
        
        <div className="text-center mb-6">
          <p className="text-lg mb-2">
            <span className="font-semibold">Time:</span> {formatTime(time)}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Moves:</span> {moves}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Score:</span> {Math.round((time * 100) + (moves * 10))}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name for the leaderboard:
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
                required
                maxLength={20}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting || !playerName.trim()}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Score'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-semibold">Score saved successfully! 🎯</p>
            <div className="flex space-x-3">
              <button
                onClick={onNewGame}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

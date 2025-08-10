'use client'

import { GameState } from '@/types/game';

interface GameStatsProps {
  time: number;
  moves: number;
  gameState: GameState;
  onNewGame: () => void;
  onShowLeaderboard: () => void;
}

export default function GameStats({ time, moves, gameState, onNewGame, onShowLeaderboard }: GameStatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Game Status */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-primary mb-2">Memory Card Game</h1>
          <p className="text-gray-600">
            {gameState === 'playing' && 'Find all matching pairs!'}
            {gameState === 'completed' && '🎉 Congratulations! You completed the game!'}
            {gameState === 'paused' && 'Game paused'}
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{formatTime(time)}</div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{moves}</div>
            <div className="text-sm text-gray-600">Moves</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onNewGame}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            New Game
          </button>
          <button
            onClick={onShowLeaderboard}
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

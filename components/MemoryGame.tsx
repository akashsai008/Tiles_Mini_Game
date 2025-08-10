'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import GameStats from './GameStats';
import GameOverModal from './GameOverModal';
import Leaderboard from './Leaderboard';
import { CardType, GameState } from '@/types/game';

const CARD_SYMBOLS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎮', '🎲', '🎯'];
const GAME_SIZE = 12;

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const shuffledCards = [...CARD_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setGameState('playing');
    setShowGameOverModal(false);
  }, []);

  // Handle card click
  const handleCardClick = useCallback((cardId: number) => {
    if (gameState !== 'playing') return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped || flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        const newMatchedPairs = [...matchedPairs, firstId, secondId];
        setMatchedPairs(newMatchedPairs);
        setFlippedCards([]);
        
        // Check if game is complete (all 6 pairs found)
        if (newMatchedPairs.length === GAME_SIZE) {
          setGameState('completed');
          setShowGameOverModal(true);
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [cards, flippedCards, matchedPairs, gameState]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Update card states
  const updatedCards = cards.map(card => ({
    ...card,
    isFlipped: flippedCards.includes(card.id) || matchedPairs.includes(card.id),
    isMatched: matchedPairs.includes(card.id),
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Game Stats */}
      <GameStats
        time={time}
        moves={moves}
        gameState={gameState}
        onNewGame={initializeGame}
        onShowLeaderboard={() => setShowLeaderboard(true)}
      />

      {/* Game Board */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8">
        {updatedCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
        onNewGame={initializeGame}
        time={time}
        moves={moves}
      />

      {/* Leaderboard Modal */}
      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
    </div>
  );
}

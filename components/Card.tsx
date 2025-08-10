'use client'

import { CardType } from '@/types/game'

interface CardProps {
  card: CardType
  onClick: () => void
}

export default function Card({ card, onClick }: CardProps) {
  const { isFlipped, isMatched, symbol } = card

  return (
    <div
      className={`
        relative w-16 h-20 md:w-20 md:h-24 cursor-pointer
        transition-all duration-300 ease-in-out
        ${isMatched ? 'opacity-60 scale-95' : 'hover:scale-105'}
        ${isFlipped ? 'rotate-y-180' : ''}
      `}
      onClick={onClick}
    >
      <div className={`
        w-full h-full rounded-lg shadow-lg border-2
        transition-all duration-300 ease-in-out
        ${isMatched 
          ? 'border-green-500 bg-green-100' 
          : isFlipped 
            ? 'border-blue-500 bg-white' 
            : 'border-gray-300 bg-gradient-to-br from-blue-400 to-blue-600'
        }
        ${isFlipped ? 'rotate-y-180' : ''}
        transform-style-preserve-3d
      `}>
        {/* Card Front (Hidden) */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          ${isFlipped ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-300
        `}>
          <div className="text-white text-2xl md:text-3xl font-bold">
            ?
          </div>
        </div>
        
        {/* Card Back (Symbol) */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          ${isFlipped ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-300
          transform rotate-y-180
        `}>
          <div className="text-4xl md:text-5xl">
            {symbol}
          </div>
        </div>
      </div>
    </div>
  )
}

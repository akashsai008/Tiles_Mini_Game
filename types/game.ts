export type GameState = 'playing' | 'completed' | 'paused'

export interface CardType {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

export interface Score {
  id: string
  player_name: string
  score: number
  time_taken: number
  created_at: string
}

import MemoryGame from '@/components/MemoryGame'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            🧠 Memory Card Game
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your memory by matching pairs of cards. Find all the matches in the shortest time with the fewest moves!
          </p>
        </header>
        
        <MemoryGame />
      </div>
    </main>
  )
}

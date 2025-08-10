# 🧠 Memory Card Game

A fun and engaging memory card game built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**. Test your memory by matching pairs of cards in the shortest time with the fewest moves!

## ✨ Features

- **🎮 Interactive Gameplay**: Flip cards to find matching pairs
- **⏱️ Real-time Timer**: Track how long you take to complete the game
- **👣 Move Counter**: Count your moves to optimize your strategy
- **🏆 Leaderboard**: Save and view top scores (with Supabase integration)
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎨 Beautiful UI**: Modern design with smooth animations and transitions
- **🔄 Game Reset**: Start a new game anytime
- **💾 Score Persistence**: Save your best times and compete with others

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: Supabase (PostgreSQL) for score storage
- **State Management**: React hooks and local state
- **Build Tool**: Next.js built-in bundler

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd memory-card-game
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Setup (Optional)

If you want to use the leaderboard feature:

1. Go to [Supabase](https://supabase.com) and create a new project
2. Create a new table called `scores` with the following structure:

```sql
CREATE TABLE scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  time INTEGER NOT NULL,
  moves INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for demo purposes)
CREATE POLICY "Allow all operations" ON scores FOR ALL USING (true);
```

3. Copy your project URL and anon key to the `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the game!

## 🎯 How to Play

1. **Start the Game**: Click "New Game" to begin
2. **Flip Cards**: Click on any card to reveal its symbol
3. **Find Matches**: Find two cards with the same symbol to make a match
4. **Complete the Game**: Match all pairs to finish the game
5. **Save Your Score**: Enter your name to save your time and moves
6. **View Leaderboard**: See how you rank against other players

## 🏗️ Project Structure

```
memory-card-game/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── Card.tsx           # Individual card component
│   ├── GameStats.tsx      # Game statistics display
│   ├── GameOverModal.tsx  # Game completion modal
│   ├── Leaderboard.tsx    # Score leaderboard
│   └── MemoryGame.tsx     # Main game logic component
├── lib/                    # Utility functions
│   └── supabase.ts        # Supabase client and functions
├── types/                  # TypeScript type definitions
│   └── game.ts            # Game-related types
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🎨 Customization

### Colors
Modify the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',    // Blue
      secondary: '#10B981',  // Green
      accent: '#F59E0B',     // Orange
      // ... add more colors
    }
  }
}
```

### Card Symbols
Change the card symbols in `components/MemoryGame.tsx`:

```typescript
const CARD_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮']
```

### Game Size
Adjust the grid size by modifying the `GAME_SIZE` constant and CSS grid classes.


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Supabase** for the backend-as-a-service platform
- **React** team for the incredible UI library


---

**Happy Gaming! 🎮✨**

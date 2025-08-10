import { createClient } from '@supabase/supabase-js';
import { Score } from '@/types/game';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Local storage fallback functions
const saveScoreLocal = (score: Omit<Score, 'id' | 'created_at'>) => {
  try {
    const existingScores = JSON.parse(localStorage.getItem('memory-game-scores') || '[]');
    const newScore = {
      ...score,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    existingScores.push(newScore);
    existingScores.sort((a: Score, b: Score) => a.score - b.score);
    localStorage.setItem('memory-game-scores', JSON.stringify(existingScores.slice(0, 10)));
    return { data: newScore, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to save score locally' };
  }
};

const getScoresLocal = async (): Promise<{ data: Score[] | null; error: string | null }> => {
  try {
    const scores = JSON.parse(localStorage.getItem('memory-game-scores') || '[]');
    return { data: scores, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch scores locally' };
  }
};

export const saveScore = async (score: Omit<Score, 'id' | 'created_at'>) => {
  if (!supabase) {
    return saveScoreLocal(score);
  }

  try {
    const { data, error } = await supabase
      .from('scores')
      .insert([score])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Supabase error, falling back to local storage:', error);
    return saveScoreLocal(score);
  }
};

export const getScores = async (): Promise<{ data: Score[] | null; error: string | null }> => {
  if (!supabase) {
    return getScoresLocal();
  }

  try {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: true })
      .limit(10);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Supabase error, falling back to local storage:', error);
    return getScoresLocal();
  }
};

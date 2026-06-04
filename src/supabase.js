import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_KEY;
export const sb = createClient(url, key);

export async function dbGet(k) {
  try {
    const { data } = await sb.from('porra_state').select('value').eq('key', k).single();
    return data ? data.value : null;
  } catch { return null; }
}

export async function dbSet(k, v) {
  try {
    await sb.from('porra_state').upsert({ key: k, value: v, updated_at: new Date().toISOString() });
  } catch (e) { console.error('dbSet error', e); }
}

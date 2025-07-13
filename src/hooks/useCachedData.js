import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCachedData(cacheKey, apiUrl) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          // parsear sólo una vez
          setData(JSON.parse(stored));
          console.log(`✔️ Cache hit: ${cacheKey}`);
        } else {
          const { data } = await axios.get(apiUrl);
          if (!mounted) return;
          setData(data);
          localStorage.setItem(cacheKey, JSON.stringify(data));
          console.log(`💾 Cached: ${cacheKey}`);
        }
      } catch (err) {
        console.error(`Error fetching ${cacheKey}`, err);
        if (mounted) setError(err);
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, [cacheKey, apiUrl]);

  return { data, error };
}

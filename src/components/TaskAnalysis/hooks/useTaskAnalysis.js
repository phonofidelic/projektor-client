import { useState, useEffect } from 'react';
import api from 'api';
import { useAuth } from 'services/AuthProvider';

export default function useTaskAnalysis(notes) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    const fetchWorkNotesAnalysis = async (notes) => {
      setLoading(true);
      const token = await getAccessTokenSilently();

      let response;
      try {
        response = await api(token).post('/work/analyze', { notes });
      } catch (err) {
        console.error(err);
        setLoading(false);
        return setError(new Error('Could not analyze task notes'));
      }

      console.log('### /work/analyze response:', response);
      setLoading(false);
      setData(response.data.keyTerms);
    };

    const handler = setTimeout(() => {
      fetchWorkNotesAnalysis(notes);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [notes, getAccessTokenSilently]);

  return { data, loading, error };
}

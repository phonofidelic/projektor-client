import { useState, useEffect } from 'react';
import api from 'api';
import { useAuth } from 'services/AuthProvider';

export default function useTaskAnalysis(notes) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently } = useAuth();

  const fetchWorkNotesAnalysis = async (notes) => {
    const token = await getAccessTokenSilently();

    let response;
    try {
      response = await api(token).post('/work/analyze', { notes });
    } catch (err) {
      console.error(err);
      return setError(new Error('Could not analyze task notes'));
    }

    console.log('### /work/analyze response:', response);
    setData(response.data.keyTerms);
  };

  useEffect(() => {
    fetchWorkNotesAnalysis(notes);
  }, [notes]);

  return [data, loading, error];
}

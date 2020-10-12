import { useState, useEffect, useContext } from 'react';
import api from 'api';
import { useAuth } from 'services/AuthProvider';
import { StringContext } from 'strings';

export default function useTaskAnalysis({ notes, projectId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const strings = useContext(StringContext);
  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    const fetchWorkNotesAnalysis = async ({ notes, projectId }) => {
      setLoading(true);
      const token = await getAccessTokenSilently();

      let response;
      try {
        response = await api(token).post('/work/analyze', {
          notes,
          projectId,
        });
      } catch (err) {
        console.error(err);
        setLoading(false);
        return setError(new Error(strings.msg__analyze_notes_error));
      }

      console.log('### /work/analyze response:', response);
      setLoading(false);
      setData(response.data.suggestedTasks);
    };

    const handler = setTimeout(() => {
      fetchWorkNotesAnalysis({ notes, projectId });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [
    notes,
    projectId,
    getAccessTokenSilently,
    strings.msg__analyze_notes_error,
  ]);

  return { data, loading, error };
}

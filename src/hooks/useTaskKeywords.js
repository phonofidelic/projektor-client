import { useEffect, useState } from 'react';
import { api } from 'actions/utils';

export default function useTaskKeywords(projectId) {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTaskKeywords = async (projectId) => {
    let response;

    try {
      response = await api().get(`/projects/keytasks/${projectId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err);
    }

    const keywords = response.data.data.map((taskType) => ({
      ...taskType,
      id: taskType.term.replace(' ', '_'),
    }));

    setLoading(false);
    setKeywords(keywords);
  };

  useEffect(() => {
    getTaskKeywords(projectId, setKeywords, setLoading, setError);
  }, [projectId]);

  return [keywords, loading, error, setKeywords, getTaskKeywords];
}

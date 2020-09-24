import { useEffect, useState } from 'react';
import { api } from 'actions/utils';

export default function useTaskKeywords(projectId) {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTaskKeywords = async (projectId) => {
    // return setError(new Error('Could not load task keywords'));
    let response;

    try {
      response = await api().get(`/projects/keytasks/${projectId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      return setError(new Error('Could not load task keywords'));
    }

    const keywords = response.data.data.map((taskType) => ({
      ...taskType,
      id: taskType.term.replace(' ', '_'),
    }));

    setLoading(false);
    setKeywords(keywords);
  };

  useEffect(() => {
    projectId && getTaskKeywords(projectId, setKeywords, setLoading, setError);
  }, [projectId]);

  return [keywords, loading, error, setKeywords, getTaskKeywords];
}

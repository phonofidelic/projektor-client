import { useEffect, useState } from 'react';
import api from 'api';
import { useAuth } from 'services/AuthProvider';

export default function useTaskData(projectId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      let response;

      try {
        const token = await getAccessTokenSilently();
        response = await api(token).get(`/tasks/${projectId}`);
      } catch (err) {
        console.error(err);
        setLoading(false);
        return setError(new Error('Could not fetch Task data'));
      }

      console.log('### useTaskData, tasks:', response.data.tasks);

      const taskData = response.data.tasks.map((task) => ({
        ...task,
        // projectTime: task.work.reduce((acc, cur) => {
        //   return acc + cur.duration;
        // }, 0),

        projectTime: task.work
          /** Only get work items containing this task */
          .filter(
            (workItem) =>
              workItem.taskAlloc.find((alloc) => alloc.task === task._id)
                ?.task === task._id
          )
          /** Return taskAlloc items for this task */
          .map((workItem) =>
            workItem.taskAlloc.find((alloc) => alloc.task === task._id)
          )
          .reduce((acc, cur) => acc + cur.allocation, 0),
        /** */

        // .taskAlloc
        //   .filter((alloc) => alloc.task === task._id)
        //   .reduce((acc, cur) => {
        //     return acc + cur.allocation;
        //   }, 0),
      }));

      // console.log('### fetch tasks response:', response);
      console.log('### useTaskData, taskData:', taskData);
      setLoading(false);
      setData(taskData);
    };

    fetchTasks();
  }, [projectId, getAccessTokenSilently]);

  return [data, loading, error];
}

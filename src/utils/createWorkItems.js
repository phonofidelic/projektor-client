import { uuid } from 'uuidv4';

export default function createWorkItems(n, totalTime) {
  let workItems = [];

  for (let i = 0; i < n; i++) {
    let date = new Date();

    workItems.push({
      id: uuid(),
      created: date.setHours(date.getHours() - 4 * i),
      start: date.setHours(date.getHours() - 4 * i),
      stop: date.setHours(date.getHours() - 4 * i) + totalTime / n,
      duration: totalTime / n,
      notes: 'Did some work.'
    });
  }

  return workItems;
}

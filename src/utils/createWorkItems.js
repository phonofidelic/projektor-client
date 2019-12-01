import { uuid } from 'uuidv4';
import moment from 'moment';

export default function createWorkItems(n, totalTime) {
  let workItems = [];

  for (let i = 0; i < n; i++) {
    let date = new Date();
    // let created = date.setHours(date.getHours() - 4 * i);
    // let start = date.setHours(date.getHours() - 4 * i);
    // let end = date.setHours(date.getHours() - 4 * i) + totalTime / n;

    workItems.push({
      id: uuid(),
      created: date.setHours(date.getHours() - 4 * i),
      start: date.setHours(date.getHours() - 4 * i),
      end: date.setHours(date.getHours() - 4 * i) + totalTime / n,
      duration: totalTime / n,
      notes: 'Did some work.'
    });
  }

  return workItems;
}

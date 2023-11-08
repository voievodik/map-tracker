import { LocationType } from '../types/LocationType';
import { Quest } from './Quest';

export class QuestQueue {
  private first: Quest | null;

  private last: Quest | null;

  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(location: LocationType, timestamp: string): void {
    const newQuest = new Quest(location, timestamp);

    if (this.last === null) {
      this.first = newQuest;
      this.last = newQuest;
    } else {
      this.last.next = newQuest;
      this.last = newQuest;
    }
  }

  dequeue(): Quest | null {
    if (this.first === null) {
      return null;
    }

    const removedQuest = this.first;

    this.first = this.first.next;
    if (this.first === null) {
      this.last = null;
    }

    return removedQuest;
  }
}

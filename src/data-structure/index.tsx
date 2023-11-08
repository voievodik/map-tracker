/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
class Quest {
  location: { lat: number; lng: number };

  timestamp: string;

  next: Quest | null;

  constructor(location: { lat: number; lng: number }, timestamp: string) {
    this.location = location;
    this.timestamp = timestamp;
    this.next = null;
  }
}

export class QuestQueue {
  private first: Quest | null;

  private last: Quest | null;

  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(location: { lat: number; lng: number }, timestamp: string): void {
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

export const questQueue = new QuestQueue();

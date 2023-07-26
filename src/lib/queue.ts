export class Queue<T> {
  queue: T[] = [];

  // Enqueues an item and returns it's position
  enqueue(item: T): number {
    this.queue.push(item);
    return this.size - 1;
  }

  dequeue(): T {
    if (!this.isEmpty()) return this.queue.shift();
  }

  peek(): T {
    if (!this.isEmpty()) return this.queue.at(0);
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  get size() {
    return this.queue.length;
  }

  get raw(): T[] {
    return this.queue;
  }
}

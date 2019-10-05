const tasks = [];

let concurrency = 2, running = 0, completed = 0, index = 0;

function next() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++];

    task(() => {
      if (completed === tasks.length) {
        return finish();
      }

      completed++;
      running--;

      next();
    });

    running++;
  }
}

next();

function finish() {
  // Вызовется, когда все задания будут выполнены.
}
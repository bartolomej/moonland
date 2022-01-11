export function msToTime(ms: number) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);
  return `${minutes}m ${seconds}s ${milliseconds}ms`;
}

export async function timePerformance<T>(
  taskName: string,
  callback: Promise<T>,
  logger = console.log,
) {
  const start = Date.now();
  return callback.finally(() => {
    const end = Date.now();
    const time = msToTime(start - end);
    logger(`Task ${taskName} took ${time}.`);
  });
}

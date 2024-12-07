export function resDelayed(res, status, message, delay) {
  setTimeout(() => {
    res.status(status).json({ message });
  }, delay);
}

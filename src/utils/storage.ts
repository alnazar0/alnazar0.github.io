export function loadFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`linguaflow_${key}`);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`linguaflow_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(`linguaflow_${key}`);
  } catch (error) {
    console.error('Failed to remove from storage:', error);
  }
}

export class LocalStorageService {
    getItem<T = string>(key: string): T | null {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        return JSON.parse(value) as T;
    }

    setItem<T = string>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}

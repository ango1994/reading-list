import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getItem(key: string): Book[] {
    const localStorageData = localStorage.getItem(key);
    return localStorageData ? JSON.parse(localStorageData) : [];
  }

  setItem<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

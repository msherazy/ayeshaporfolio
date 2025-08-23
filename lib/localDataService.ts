import { promises as fs } from 'fs';
import path from 'path';

// Local data service to replace Firebase
export class LocalDataService {
  private static getDataPath(filename: string): string {
    return path.join(process.cwd(), 'data', filename);
  }

  static async readJsonFile<T>(filename: string): Promise<T> {
    try {
      const filePath = this.getDataPath(filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      throw new Error(`Failed to read ${filename}`);
    }
  }

  static async writeJsonFile<T>(filename: string, data: T): Promise<void> {
    try {
      const filePath = this.getDataPath(filename);
      const jsonString = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonString, 'utf-8');
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      throw new Error(`Failed to write ${filename}`);
    }
  }

  static generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }
}

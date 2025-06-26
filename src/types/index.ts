export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}
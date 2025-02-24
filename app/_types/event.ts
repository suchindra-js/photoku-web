export interface Event {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface CreateEventDTO {
  title: string;
  description: string;
}

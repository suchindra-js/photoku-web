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

export interface EventWithImages {
  event: Event;
  images: EventImage[];
}

export interface EventImage {
  id: number;
  eventId: number;
  userId: number;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
  filename: string;
}

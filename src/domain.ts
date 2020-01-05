export enum ItemType {
  BOOK = "Book",
  GAME = "Game",
  FILM = "Film",
  MUSIC = "Music"
};

export enum Status {
  AVAILABLE = "Available",
  NOT_AVAILABLE = "Not available"
};

export type Person = {
  firstName: string;
  lastName: string;
  city: string;
};

export type Item = {
  title: string;
  type: ItemType;
  owner: Person;
  status: Status;
  lender?: Person;
};
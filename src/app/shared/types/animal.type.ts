export interface Animal {
    name: string;
    url: string;
    value:number[]
  }

export type AnimalDraw = {
  key: string;
  value: string[];
};

export type GetAnimalDrawResponse = {
  actualDraw: {
    [key: string]: string[];
  }[];
  CreatedAt: string[];
};

export interface ResponseDraw {
  id: number;
  animalKey: string | null;
  animalValues: string[] | null;
  createdAt: string;
}

export type ResponseArray = ResponseDraw[];


export type PostAnimalDrawRequest = AnimalDraw[];
export type PostAnimalDrawResponse = AnimalDraw[];
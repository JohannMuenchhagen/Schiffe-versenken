export class Example {
  id: number;
  name: string;
  example: string;

  constructor(id: number, name: string, example: string) {
    this.id = id;
    this.name = name;
    this.example = example;
  }
}

export class CreateExampleDto {
  id?: number; // optional
  name!: string; // required
  example?: string; // optional
}

export class UpdateExampleDto {
  name?: string;
  example?: string;
}

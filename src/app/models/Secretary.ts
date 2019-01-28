import {Person} from "./Person";

export interface Secretary {
  secretaryId?: number;
  person: Person;
  hireDate: Date;
  endEngagement?: Date;
  task?: string;
}

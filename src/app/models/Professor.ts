import {Person} from "./Person";

export interface Professor {
  professorId?: number;
  person: Person;
  level: string;
  hireDate: Date;
  endEngagement?: Date;
}

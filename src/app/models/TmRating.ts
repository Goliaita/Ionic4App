import { Student } from './Student';
import { TeachingMaterial } from './TeachingMaterial';

export interface TmRating {

    tmRatingId?: number;
    student?: Student;
    teachingMaterial?: TeachingMaterial;
    rate?: string;
}

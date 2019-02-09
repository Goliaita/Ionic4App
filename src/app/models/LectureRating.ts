import { Student } from './Student';
import { Calendar } from './LectureCalendar';

export interface LectureRating {
    lectureRatingId?: number;
    calendar?: Calendar;
    student?: Student;
    rate?: string;
    date?: Date;
    note?: string;
}

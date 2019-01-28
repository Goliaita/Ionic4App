import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Message {
  studentId?: number;
  studentName?: string;
  professorId?: number;
  professorName?: string;
  senderType?: string;
  message?: string;
  date?: Timestamp;
  chatId?: string;
  hours?: string;
  chatType?: string;
}

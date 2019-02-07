import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();


export const subscribeToTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().subscribeToTopic(data.token, data.topic);
        return `subscribed to ${data.topic}`;
    }
);

export const unsubscribeFromTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
        return `unsubscribed from ${data.topic}`;
    }
);

export const sendOnFirestoreCreate = functions.firestore
    .document('modules/{moduleId}')
    .onCreate( async snapshot => {
       // const module = snapshot.data() || null;

        const notification: admin.messaging.Notification = {
            title: 'New event about module',
            body: 'asd'
        };

        const payload: admin.messaging.Message = {
            notification,
            topic: 'modules'
        };

        return admin.messaging().send(payload);
    });

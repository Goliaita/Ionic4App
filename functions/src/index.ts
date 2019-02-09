import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();


/* exports.subscribeToTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().subscribeToTopic(data.token, data.topic)
        .catch(e => console.log(e));
        return `subscribed to ${data.topic}`;
    }
);

exports.unsubscribeFromTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
        return `unsubscribed from ${data.topic}`;
    }
);
 */
exports.sendOnModulesCreate = functions.firestore
    .document('modules/{moduleId}/notifications/{notId}')
    .onCreate(async (snapshot, context) => {
        const text = snapshot.get('text');
        const mod = snapshot.get('module');
        const moduleId = context.params.moduleId;

        const notification: admin.messaging.Notification = {
            title: `Notification about ${mod}`,
            body: text
        };

        const payload: admin.messaging.Message = {
            notification,
            topic: `module${moduleId}`
        };

        return admin.messaging().send(payload);
    });


    exports.sendOnTicketsCreate = functions.firestore
    .document('tickets/{profId}/notifications/{notId}')
    .onCreate(async (snapshot, context) => {
        const title = snapshot.get('title');
        const ans = snapshot.get('ans');
        const profId = context.params.profId;

        const notification: admin.messaging.Notification = {
            title: `Ticket: ${title}`,
            body: ans
        };

        const payload: admin.messaging.Message = {
            notification,
            topic: `ticket${profId}`
        };

        return admin.messaging().send(payload);
    });

    exports.sendOnChatCreate = functions.firestore
    .document('modules/{moduleId}/chat/{chatId}')
    .onCreate(async (snapshot, context) => {
        const message = snapshot.get('message');
        const sender = snapshot.get('senderName');
        const moduleId = context.params.moduleId;

        const notification: admin.messaging.Notification = {
            title: `Message from ${sender}`,
            body: message
        };

        const payload: admin.messaging.Message = {
            notification,
            topic: `module${moduleId}`
        };

        return admin.messaging().send(payload);
    });

    exports.sendOnPrivateChatCreate = functions.firestore
    .document('privateChat/Ei72O25Dn5EKdRPvmUSb/{chatId}/{msgId}')
    .onCreate(async (snapshot, context) => {
        const message = snapshot.get('message');
        const sender = snapshot.get('senderName');
        const chat = context.params.chatId;

        const notification: admin.messaging.Notification = {
            title: `Message from ${sender}`,
            body: message
        };

        const payload: admin.messaging.Message = {
            notification,
            topic: chat
        };

        return admin.messaging().send(payload);
    });

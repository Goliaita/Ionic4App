"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.sendOnModulesCreate = functions.firestore
    .document('modules/{moduleId}/notifications/{notId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const text = snapshot.get('text');
    const mod = snapshot.get('module');
    const moduleId = context.params.moduleId;
    const notification = {
        title: `Notification about ${mod}`,
        body: text
    };
    const payload = {
        notification,
        topic: `module${moduleId}`
    };
    return admin.messaging().send(payload);
}));
exports.sendOnTicketsCreate = functions.firestore
    .document('tickets/{profId}/notifications/{notId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const title = snapshot.get('title');
    const ans = snapshot.get('ans');
    const profId = context.params.profId;
    const notification = {
        title: `Ticket - ${title}`,
        body: ans
    };
    const payload = {
        notification,
        topic: `ticket${profId}`
    };
    return admin.messaging().send(payload);
}));
exports.sendOnRatingCreate = functions.firestore
    .document('tickets/{profId}/ratings/{notId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const file = snapshot.get('file');
    const rate = snapshot.get('rate');
    const profId = context.params.profId;
    const notification = {
        title: `${file}`,
        body: `Gradimento: ${rate} `
    };
    const payload = {
        notification,
        topic: `ticket${profId}`
    };
    return admin.messaging().send(payload);
}));
exports.sendOnChatCreate = functions.firestore
    .document('modules/{moduleId}/chat/{chatId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const message = snapshot.get('message');
    const sender = snapshot.get('senderName');
    const moduleId = context.params.moduleId;
    const notification = {
        title: `${sender}`,
        body: message
    };
    const payload = {
        notification,
        topic: `module${moduleId}`
    };
    return admin.messaging().send(payload);
}));
exports.sendOnPrivateChatCreate = functions.firestore
    .document('privateChat/Ei72O25Dn5EKdRPvmUSb/{chatId}/{msgId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const message = snapshot.get('message');
    const sender = snapshot.get('senderName');
    const chat = context.params.chatId;
    const notification = {
        title: `${sender}`,
        body: message
    };
    const payload = {
        notification,
        topic: chat
    };
    return admin.messaging().send(payload);
}));
//# sourceMappingURL=index.js.map
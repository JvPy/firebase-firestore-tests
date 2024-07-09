// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {onRequest} from "firebase-functions/v2/https";
import {onDocumentCreated} from "firebase-functions/v2/firestore";

// The Firebase Admin SDK to access Firestore.
import {applicationDefault, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import addName from "./api/http/addName";
import upsertIncrementalId from "./api/http/upsertIncrementalId";

const app = initializeApp({
    credential: applicationDefault()
});
const db = getFirestore(app)

exports.addName = onRequest((req, res) => addName(req, res, db));
exports.upsertIncrementalId = onDocumentCreated("/names/{documentId}", (event) => upsertIncrementalId(event, db));
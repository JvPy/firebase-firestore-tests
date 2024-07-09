import { FirestoreEvent, QueryDocumentSnapshot } from "firebase-functions/v2/firestore";
import { Collections, DocumentNames } from "../../utils/constants";

async function upsertIncrementalId(event: FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string;}>, db: FirebaseFirestore.Firestore) {
    const utilsCollectionName = Collections.utils
    const incrementalIdCounterDocument = DocumentNames.incrementalIdCounter
    
    db.runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
        const idCounter = await db.collection(utilsCollectionName).doc(incrementalIdCounterDocument).get();

        if(idCounter.exists) {
            const incrementalId = idCounter.data()?.incremental_id + 1;

            transaction.update(idCounter.ref, {incremental_id: incrementalId})
            await event?.data?.ref.set({incremental_id: incrementalId}, {merge: true});
            return
        }

        event?.data?.ref.set({incremental_id: 1}, {merge: true});
        db.collection(utilsCollectionName).doc(incrementalIdCounterDocument).set({incremental_id: 1})
    });
};

export default upsertIncrementalId
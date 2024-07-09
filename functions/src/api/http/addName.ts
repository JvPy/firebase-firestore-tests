import { Collections } from "../../utils/constants";

async function addName(req: any, res: any, db: FirebaseFirestore.Firestore) {
    if(req.method !== "POST") {
        res.status(400).json({message:"Only post is accepted"});
        return 
    }

    if(!req.body || !req.body.name) {
        res.status(400).json({message:"Body with 'name' property is required"});
        return 
    }

    const messagesDoc = db.collection(Collections.names)

    const ref = await messagesDoc.add({
        name: req.body.name
    })
    
    res.json({result: `Message with ID: ${ref.id} added.`});
};

export default addName;
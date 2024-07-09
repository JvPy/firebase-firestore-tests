import addName from '../src/api/http/addName'; 
const firebaseAdmin = require('firebase-admin');

describe('addName function', () => {
  let req: Record<string, any>, res: Record<string, any>, db: any;

  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        name: 'Test Name',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    db = firebaseAdmin.firestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a message with valid POST request and body', async () => {
    await addName(req, res, db);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ result: expect.stringContaining('Message with ID: ') });
    expect(firebaseAdmin.firestore().collection).toHaveBeenCalledWith('names');
    expect(firebaseAdmin.firestore().collection('names').add).toHaveBeenCalledWith({ name: 'Test Name' });
  });

  it('should return 400 status and error message if method is not POST', async () => {
    req.method = 'GET';

    await addName(req, res, db);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Only post is accepted' });
    expect(firebaseAdmin.firestore().collection).not.toHaveBeenCalled();
    expect(firebaseAdmin.firestore().collection('names').add).not.toHaveBeenCalled();
  });

  it('should return 400 status and error message if body or name is missing', async () => {
    req.body = {};

    await addName(req, res, db);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Body with 'name' property is required" });
    expect(firebaseAdmin.firestore().collection).not.toHaveBeenCalled();
    expect(firebaseAdmin.firestore().collection('names').add).not.toHaveBeenCalled();
  });
});

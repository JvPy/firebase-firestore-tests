import upsertIncrementalId from '../src/api/http/upsertIncrementalId';
const firebaseAdmin = require('firebase-admin');

jest.mock('firebase-admin');

describe('upsertIncrementalId function', () => {
  let event: any, db: any;

  beforeEach(() => {
    event = {
      data: {
        ref: {
          set: jest.fn(),
        },
      },
    };

    db = firebaseAdmin.firestore(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should increment the incremental_id when idCounter document exists', async () => {
    const mockIdCounterData = { incremental_id: 1 };
    const mockIdCounterSnapshot = {
      exists: true,
      data: jest.fn().mockReturnValue(mockIdCounterData),
      ref: {
        update: jest.fn(),
      },
    };

    jest.spyOn(db, 'collection').mockReturnValue({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue(mockIdCounterSnapshot),
      update: jest.fn(),
      set: jest.fn(),
    });

    await upsertIncrementalId(event, db);

    expect(db.collection).toHaveBeenCalledWith('utils');
    expect(db.collection().doc).toHaveBeenCalledWith('incrementalIdCounter');
    expect(mockIdCounterSnapshot.data).toHaveBeenCalled();
    expect(event.data.ref.set).toHaveBeenCalledWith({ incremental_id: 2 }, { merge: true });
  });

  it('should initialize the incremental_id when idCounter document does not exist', async () => {
    const mockIdCounterSnapshot = {
      exists: false,
      ref: {
        set: jest.fn(),
      },
    };

    jest.spyOn(db, 'collection').mockReturnValue({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue(mockIdCounterSnapshot),
      set: jest.fn(),
    });

    await upsertIncrementalId(event, db);

    expect(db.collection).toHaveBeenCalledWith('utils');
    expect(db.collection().doc).toHaveBeenCalledWith('incrementalIdCounter');
    expect(event.data.ref.set).toHaveBeenCalledWith({ incremental_id: 1 }, { merge: true });
    expect(db.collection().doc).toHaveBeenCalledWith('incrementalIdCounter');
    expect(db.collection().doc().set).toHaveBeenCalledWith({ incremental_id: 1 });
  });
});

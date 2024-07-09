const firestoreMock = {
  collection: jest.fn().mockReturnThis(),
  add: jest.fn().mockResolvedValue({ id: 'generated-id' }),
  runTransaction: async (callback: any) => {
    const transactionStub = {
      update: jest.fn().mockReturnThis(),
      set: jest.fn(),
      get: jest.fn(),
      commit: jest.fn().mockReturnThis(),
      rollback: jest.fn().mockRejectedValue(new Error('Transaction rollback')),
    };
  
    try {
      await callback(transactionStub);
      await transactionStub.commit();
    } catch (error) {
      await transactionStub.rollback();
      throw error;
    }
  }
}


const firebaseAdmin = {
  firestore: () => firestoreMock,
};
  
  
module.exports = firebaseAdmin;
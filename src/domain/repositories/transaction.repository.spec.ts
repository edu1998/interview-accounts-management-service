import { TransactionRepository } from './transaction.repository';

describe('TransactionRepository (Abstract)', () => {
  let repository: TransactionRepository;

  // Mock implementation for testing the abstract class contract
  class MockTransactionRepository extends TransactionRepository {
    findById = jest.fn();
    save = jest.fn();
    findByAccountId = jest.fn();
  }

  beforeEach(() => {
    repository = new MockTransactionRepository();
  });

  it('should have a findById method', () => {
    expect(typeof repository.findById).toBe('function');
  });

  it('should have a save method', () => {
    expect(typeof repository.save).toBe('function');
  });

  it('should have a findByAccountId method', () => {
    expect(typeof repository.findByAccountId).toBe('function');
  });
});

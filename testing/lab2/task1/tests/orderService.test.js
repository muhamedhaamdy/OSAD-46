const { placeOrder } = require('../src/orderService');

describe('placeOrder', () => {
  let mockCharge;
  let mockSendEmail;

  beforeEach(() => {
    mockCharge = jest.fn();
    mockSendEmail = jest.fn();
  });

  it('returns orderId and transactionId on success', async () => {
    mockCharge.mockResolvedValue({ success: true, transactionId: 'txn_123' });

    const result = await placeOrder({ charge: mockCharge, sendOrderConfirmation: mockSendEmail }, 'user1', 'user@test.com', 100);

    expect(result).toHaveProperty('orderId');
    expect(result.transactionId).toBe('txn_123');
  });

  it('calls sendOrderConfirmation with correct data', async () => {
    mockCharge.mockResolvedValue({ success: true, transactionId: 'txn_123' });

    await placeOrder({ charge: mockCharge, sendOrderConfirmation: mockSendEmail }, 'user1', 'user@test.com', 100);

    expect(mockSendEmail).toHaveBeenCalledWith('user@test.com', 'txn_123');
  });

  it('throws error for zero amount and does not call charge', async () => {
    await expect(placeOrder({ charge: mockCharge, sendOrderConfirmation: mockSendEmail }, 'user1', 'user@test.com', 0)).rejects.toThrow('Invalid amount');
    expect(mockCharge).not.toHaveBeenCalled();
  });

  it('throws error if payment fails and does not send email', async () => {
    mockCharge.mockResolvedValue({ success: false });

    await expect(placeOrder({ charge: mockCharge, sendOrderConfirmation: mockSendEmail }, 'user1', 'user@test.com', 100)).rejects.toThrow('Payment failed');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });
});

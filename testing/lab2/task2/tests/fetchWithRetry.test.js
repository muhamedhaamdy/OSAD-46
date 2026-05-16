const { fetchWithRetry } = require('../src/fetchWithRetry');

describe('fetchWithRetry', () => {
  let mockGetData;

  beforeEach(() => {
    mockGetData = jest.fn();
  });

  it('succeeds on the first attempt', async () => {
    const data = { id: 1, name: 'test' };
    mockGetData.mockResolvedValueOnce(data);

    const result = await fetchWithRetry(mockGetData, 'http://example.com');

    expect(result).toEqual(data);
    expect(mockGetData).toHaveBeenCalledTimes(1);
  });

  it('fails once and succeeds on the second attempt', async () => {
    mockGetData
      .mockRejectedValueOnce(new Error('timeout'))
      .mockResolvedValueOnce({ id: 2 });

    const result = await fetchWithRetry(mockGetData, 'http://example.com');

    expect(result).toEqual({ id: 2 });
    expect(mockGetData).toHaveBeenCalledTimes(2);
  });

  it('fails after all 3 attempts', async () => {
    mockGetData.mockRejectedValue(new Error('Network down'));

    await expect(fetchWithRetry(mockGetData, 'http://example.com')).rejects.toThrow('Failed after 3 attempts: Network down');
    expect(mockGetData).toHaveBeenCalledTimes(3);
  });

  it('fails after 1 attempt when maxRetries is 1', async () => {
    mockGetData.mockRejectedValueOnce(new Error('one shot failure'));

    await expect(fetchWithRetry(mockGetData, 'http://example.com', 1)).rejects.toThrow('Failed after 1 attempts: one shot failure');
    expect(mockGetData).toHaveBeenCalledTimes(1);
  });
});

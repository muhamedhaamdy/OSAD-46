const { isValidPassword } = require('./validator');

describe('password validation', () => {
  
  test('it works', () => {
    expect(isValidPassword('Hamdy999')).toEqual({ valid: true, reason: '' });
  });

  test('too short', () => {
    expect(isValidPassword('Hamdy1')).toEqual({ valid: false, reason: 'Too short (min 8 characters)' });
  });

  test('needs uppercase', () => {
    expect(isValidPassword('hamdy123')).toEqual({ valid: false, reason: 'Must contain an uppercase letter' });
  });

  test('needs a number', () => {
    expect(isValidPassword('Hamdyyyy')).toEqual({ valid: false, reason: 'Must contain a number' });
  });

  test('not a string', () => {
    expect(isValidPassword(null)).toEqual({ valid: false, reason: 'Password must be a string' });
  });

  test('exactly 8 chars', () => {
    expect(isValidPassword('Hamdy123')).toEqual({ valid: true, reason: '' });
  });

});
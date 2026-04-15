import { readKey, writeKey } from '../../../lib/storage/index';

describe('readKey', () => {
  it('returns defaultValue when key does not exist', () => {
    expect(readKey('missing', [])).toEqual([]);
  });

  it('returns parsed value when key exists', () => {
    localStorage.setItem('test-key', JSON.stringify({ a: 1 }));
    expect(readKey('test-key', null)).toEqual({ a: 1 });
  });

  it('returns defaultValue and does not throw on malformed JSON', () => {
    localStorage.setItem('bad-key', '{ not valid json }');
    expect(readKey('bad-key', 'fallback')).toBe('fallback');
  });
});

describe('writeKey', () => {
  it('serialises and stores value', () => {
    writeKey('write-key', [1, 2, 3]);
    expect(localStorage.getItem('write-key')).toBe('[1,2,3]');
  });

  it('overwrites existing value', () => {
    writeKey('ow-key', 'first');
    writeKey('ow-key', 'second');
    expect(readKey('ow-key', '')).toBe('second');
  });
});

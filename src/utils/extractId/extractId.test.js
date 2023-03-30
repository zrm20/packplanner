import extractId from './extractId';

describe('extractId()', () => {
  it('should return input if string is passed in', () => {
    const input = 'myId';

    const result = extractId(input);

    expect(result).toBe(input);
  });

  it('should return string if number is passed in', () => {
    const input = 1.23;

    const result = extractId(input);

    expect(result).toBe(input.toString());
  });

  it('should return id property if object is passed in', () => {
    const input = { id: 'myId' };

    const result = extractId(input);

    expect(result).toBe(input.id);
  });

  it('should throw error if no id property is available on object', () => {
    const input = { foo: 'bar' };

    const resultFn = () => extractId(input);

    expect(resultFn).toThrow();
  });

  it('should throw error if any other type is passed in', () => {
    const boolFn = () => extractId(true);
    const arrayFn = () => extractId([]);
    const nullFn = () => extractId(null);
    const undefinedFn = () => extractId(undefined);
    const emptyFn = () => extractId();

    expect(boolFn).toThrow();
    expect(arrayFn).toThrow();
    expect(nullFn).toThrow();
    expect(undefinedFn).toThrow();
    expect(emptyFn).toThrow();
  });
});

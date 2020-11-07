import { StartsWithPipe } from './starts-with.pipe';
import { Item } from './item';

describe('StartsWithPipe', () => {
  const pipe = new StartsWithPipe();
  const input: Item[] = [
    { title: 'Foo' },
    { title: 'Bar' },
    { title: 'Happy Birthday' },
    { title: '  Title   with  multiple  spaces    ' },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should ignore blank query', () => {
    expect(pipe.transform(input, '')).toEqual(input);
    expect(pipe.transform(input, null)).toEqual(input);
    expect(pipe.transform(input, undefined)).toEqual(input);
  });

  it('should filter if the input matches query exactly', () => {
    const actual = pipe.transform(input, 'Foo');
    const expected = input[0];
    expect(actual).toEqual([expected]);
  });

  it('should filter if the input only starts with query', () => {
    const actual = pipe.transform(input, 'Fo');
    const expected = input[0];
    expect(actual).toEqual([expected]);
  });

  it('should filter if the input starts with query and is case insensitive', () => {
    const actual = pipe.transform(input, 'f');
    const expected = input[0];
    expect(actual).toEqual([expected]);
  });

  it('should filter if any words in input match the query', () => {
    const actual = pipe.transform(input, 'bi');
    const expected = input[2];
    expect(actual).toEqual([expected]);
  });

  it('should filter if query spans multiple words', () => {
    const actual = pipe.transform(input, 'abc happ');
    const expected = input[2];
    expect(actual).toEqual([expected]);
  });

  it('should escape spaces', () => {
    const actual = pipe.transform(input, '     abc happ');
    const expected = input[2];
    expect(actual).toEqual([expected]);
  });

  it('should only match once', () => {
    const actual = pipe.transform(input, 'happy birthday');
    const expected = input[2];
    expect(actual).toEqual([expected]);
  });
});

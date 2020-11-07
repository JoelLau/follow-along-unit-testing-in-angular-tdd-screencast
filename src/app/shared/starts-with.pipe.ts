import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item';

@Pipe({
  name: 'startsWith',
})
export class StartsWithPipe implements PipeTransform {
  transform(value: Item[], query: string = ''): Item[] {
    if (!query) {
      return value;
    }

    const queryWords = this.getWords(query);
    const itemsForEachWord = queryWords.flatMap((queryWord) =>
      this.filterWithWord(value, queryWord)
    );

    return [...new Set(itemsForEachWord)];
  }

  private filterWithWord(value: Item[], queryWord: string = ''): Item[] {
    return value.filter((item) => {
      const titleWords = this.getWords(item.title);
      const matchedWords = titleWords.filter((word) =>
        word.startsWith(queryWord)
      );
      return matchedWords.length > 0;
    });
  }

  private getWords(str: string): string[] {
    const trimmed = str.trim();
    const lowerCase = trimmed.toLowerCase();
    const noConsecutiveSpaces = lowerCase.replace(/\s\s+/g, ' ');
    const words = noConsecutiveSpaces.split(' ');
    return words;
  }
}

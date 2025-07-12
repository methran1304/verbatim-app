export class TextProcessor {
    static wordsToCharMatrix(words: string[]): string[][] {
        return words.map((word) => word.split(''));
    }

    static charMatrixToWords(matrix: string[][]): string[] {
        return matrix.map((chars) => chars.join(''));
    }
}

using System.Collections.Generic;
using System.Linq;

namespace server.Helpers
{
    public static class StringExtensions
    {
        public static List<List<char>> ToCharMatrix(this List<string> words)
        {
            return words.Select(word => word.ToList()).ToList();
        }

        public static List<string> ToWordList(this List<List<char>> charMatrix)
        {
            return charMatrix.Select(chars => new string(chars.ToArray())).ToList();
        }
    }
}
export abstract class CommonService
{
  static toLetters(num) {
    var mod = num % 26,
      pow = num / 26 | 0,
      out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? this.toLetters(pow) + out : out;
  }
}

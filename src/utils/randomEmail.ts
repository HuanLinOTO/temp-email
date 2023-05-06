export default function generateRandomString(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let result = '';
    // 随机生成一个字母作为字符串的第一个字符
    result += letters.charAt(Math.floor(Math.random() * letters.length));
    // 随机生成 9 个字符，可以是字母或数字
    for (let i = 0; i < 9; i++) {
      const characters = letters + numbers;
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result+"@iubridge.com";
  }
  
export function generatePassword(req, res) {
    const { length, useSymbols = true, useNumbers = true, useUppercase = true } = req.body;
  
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?';
  
    let charSet = lowerCase;
    if (useSymbols) charSet += symbols;
    if (useNumbers) charSet += numbers;
    if (useUppercase) charSet += upperCase;
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
  
    res.json({ password });
  }
  
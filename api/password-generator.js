export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST'); // Allow methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow headers
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end(); // Respond with 200 OK
      return;
    }
  
    // Handle POST requests
    if (req.method === 'POST') {
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
  
      res.status(200).json({ password });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  
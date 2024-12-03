import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Password Generator API
app.post('/api/password-generator', (req, res) => {
  const { length = 12, useSymbols = true, useNumbers = true, useUppercase = true } = req.body;

  if (!length || length < 6 || length > 128) {
    return res.status(400).json({ error: 'Invalid password length. Must be between 6 and 128.' });
  }

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
});

// Start Server
app.listen(PORT, () => {
  console.log(`Password Generator API running on http://localhost:${PORT}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import { generatePassword } from './api/password-generator.js';
import { testPassword } from './api/password-tester.js';
import { checkDataBreach } from './api/data-breach-checker.js';
import { generateHash } from './api/hash-generator.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/password-generator', generatePassword);
app.post('/api/password-tester', testPassword);
app.post('/api/data-breach-checker', checkDataBreach);
app.post('/api/hash-generator', generateHash);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

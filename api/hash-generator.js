import { createHash } from 'crypto';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { input, algorithm = 'sha256' } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    const supportedAlgorithms = ['sha256', 'md5', 'sha512'];
    if (!supportedAlgorithms.includes(algorithm)) {
      return res.status(400).json({ error: 'Unsupported algorithm' });
    }

    const hash = createHash(algorithm).update(input).digest('hex');
    res.status(200).json({ algorithm, hash });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


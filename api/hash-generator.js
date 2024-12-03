import { createHash } from 'crypto';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { input, algorithm = 'sha256' } = req.body;

    const supportedAlgorithms = ['sha256', 'md5', 'sha512'];
    if (!supportedAlgorithms.includes(algorithm)) {
      return res.status(400).json({ error: `Unsupported algorithm. Supported algorithms: ${supportedAlgorithms.join(', ')}` });
    }

    const hash = createHash(algorithm).update(input).digest('hex');
    res.status(200).json({ algorithm, hash });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


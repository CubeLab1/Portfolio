import { createHash } from 'crypto';

export async function generateHash(req, res) {
  const { input, algorithm = 'sha256' } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  const supportedAlgorithms = ['sha256', 'md5', 'sha512'];

  if (!supportedAlgorithms.includes(algorithm)) {
    return res.status(400).json({ error: `Unsupported algorithm. Supported algorithms are: ${supportedAlgorithms.join(', ')}` });
  }

  const hash = createHash(algorithm).update(input).digest('hex');

  res.json({
    algorithm,
    hash,
  });
}

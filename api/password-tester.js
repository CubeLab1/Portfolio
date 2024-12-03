import zxcvbn from 'zxcvbn';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const result = zxcvbn(password);

    res.status(200).json({
      strength: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][result.score],
      score: result.score,
      feedback: result.feedback.suggestions,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

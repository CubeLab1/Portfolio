import zxcvbn from 'zxcvbn';

export function testPassword(req, res) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const result = zxcvbn(password);

  res.json({
    strength: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][result.score],
    score: result.score,
    feedback: result.feedback.suggestions,
  });
}

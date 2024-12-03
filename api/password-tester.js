export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method === 'POST') {
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }
  
      const strength = password.length >= 12
        ? 'Strong'
        : password.length >= 8
        ? 'Moderate'
        : 'Weak';
  
      res.status(200).json({ strength });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  
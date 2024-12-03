import fs from 'fs';

export function checkDataBreach(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Load the breach data file
    const data = fs.readFileSync('./breach-data.json', 'utf-8');
    const breachData = JSON.parse(data);

    // Find breaches for the provided email
    const breaches = breachData.filter(entry => entry.email === email);

    if (breaches.length > 0) {
      res.json({ breached: true, breaches });
    } else {
      res.json({ breached: false, breaches: [] });
    }
  } catch (error) {
    console.error('Error loading breach data:', error.message);
    res.status(500).json({ error: 'Error checking data breach' });
  }
}

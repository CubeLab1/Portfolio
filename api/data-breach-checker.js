export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method === 'POST') {
      const { email } = req.body;
  
      const breaches = [
        { email: 'test@example.com', site: 'ExampleSite', date: '2022-01-01' },
        { email: 'user@example.com', site: 'AnotherSite', date: '2023-06-15' },
      ];
  
      const result = breaches.filter((entry) => entry.email === email);
      res.status(200).json({ breached: result.length > 0, breaches: result });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  
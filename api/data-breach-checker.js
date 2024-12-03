export default function handler(req, res) {
    if (req.method === 'POST') {
      const { email } = req.body;
  
      const breaches = [
        { email: 'test@example.com', site: 'ExampleSite', date: '2022-01-01' },
        { email: 'user@example.com', site: 'AnotherSite', date: '2023-06-15' },
      ];
  
      const results = breaches.filter((entry) => entry.email === email);
  
      if (results.length > 0) {
        res.status(200).json({ breached: true, breaches: results });
      } else {
        res.status(200).json({ breached: false, breaches: [] });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  
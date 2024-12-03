// Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('length').value, 10);
    const useSymbols = document.getElementById('useSymbols').checked;
    const useNumbers = document.getElementById('useNumbers').checked;
    const useUppercase = document.getElementById('useUppercase').checked;
  
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?';
  
    let charSet = lowerCase;
    if (useSymbols) charSet += symbols;
    if (useNumbers) charSet += numbers;
    if (useUppercase) charSet += upperCase;
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
  
    document.getElementById('generated-password').textContent = `Generated Password: ${password}`;
  }
  
  // Password Tester
  function testPassword() {
    const password = document.getElementById('test-password').value;
    const strength = password.length >= 12
      ? 'Strong'
      : password.length >= 8
      ? 'Moderate'
      : 'Weak';
  
    document.getElementById('password-strength').textContent = `Password Strength: ${strength}`;
  }
  
  // Data Breach Checker
  function checkBreach() {
    const email = document.getElementById('email').value;
    const breaches = [
      { email: 'test@example.com', site: 'ExampleSite', date: '2022-01-01' },
      { email: 'user@example.com', site: 'AnotherSite', date: '2023-06-15' }
    ];
  
    const result = breaches.find(breach => breach.email === email);
    if (result) {
      document.getElementById('breach-result').textContent = `Breach found on ${result.site} (${result.date}).`;
    } else {
      document.getElementById('breach-result').textContent = 'No breaches found for this email.';
    }
  }
  
  // Hash Generator
  async function generateHash() {
    const input = document.getElementById('hash-input').value;
    const algorithm = document.getElementById('hash-algorithm').value;
  
    if (!input) {
      document.getElementById('hash-result').textContent = 'Please enter text to hash.';
      return;
    }
  
    try {
      if (algorithm === 'md5') {
        // Use CryptoJS for MD5
        const hash = CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
        document.getElementById('hash-result').textContent = `Generated Hash (MD5): ${hash}`;
      } else {
        // Use Web Crypto API for SHA algorithms
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        document.getElementById('hash-result').textContent = `Generated Hash (${algorithm}): ${hashHex}`;
      }
    } catch (error) {
      document.getElementById('hash-result').textContent = 'Error generating hash. Unsupported algorithm?';
      console.error('Hash generation error:', error);
    }
  }
  
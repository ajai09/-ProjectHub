Email setup and testing

1) Local .env (do NOT commit):

Copy `.env.example` to `.env` inside the `backend/` folder and fill in real values.

Example `.env` (do NOT commit):

MONGO_URI=your_mongo_uri
PORT=5001
EMAIL_USER=ajaialoysius04@gmail.com
EMAIL_PASS=your_gmail_app_password_here
# Optional override
# ADMIN_EMAIL=you@yourdomain.com

2) Generate a Gmail App Password
- Ensure 2FA is enabled on the Google account `ajaialoysius04@gmail.com`.
- Create an App Password (Mail) in Google Account > Security > App Passwords.
- Copy the generated 16-character password into `EMAIL_PASS`.

3) Start server locally (from project root):

```bash
cd backend
# install deps if needed
npm install
# start
node server.js
```

4) Test sending (after server running):

Run the included test script:

```bash
cd backend
chmod +x test_send.sh
./test_send.sh
```

Or use curl directly:

```bash
curl -X POST http://localhost:5001/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Local Test","email":"recipient@example.com","phone":"123","message":"Hello"}'
```

5) Render deployment notes
- In your Render service settings, add these Environment variables:
  - `MONGO_URI` — your MongoDB connection string
  - `EMAIL_USER` — ajaialoysius04@gmail.com
  - `EMAIL_PASS` — the Gmail App Password
  - (optional) `ADMIN_EMAIL` — different admin recipient
- Redeploy the service after saving env vars.

6) Troubleshooting
- If emails aren't sent, check server logs for Nodemailer errors.
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct and App Password is active.
- Ensure Render outbound SMTP is allowed (most platforms allow it).
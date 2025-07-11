import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.get('/auth/github', (req, res) => {
  const redirect_uri = 'http://localhost:5000/auth/github/callback';
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user:email`
  );
});

app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { accept: 'application/json' } }
    );
    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` },
    });

    // For now, just send user info to frontend (in production, use JWT/cookies)
    res.redirect(`http://localhost:8080/?user=${encodeURIComponent(JSON.stringify(userRes.data))}`);
  } catch (err) {
    res.status(500).send('Authentication failed');
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000')); 
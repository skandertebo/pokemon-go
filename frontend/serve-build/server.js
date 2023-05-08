import express from 'express';
import cors from 'cors';
import httpProxy from 'http-proxy';

const PORT = 3000;
// proxies
const API = 'https://localhost:8000';
const mercure = 'http://localhost:8080';
const app = express();

app.use(cors());
app.use(express.static('../dist'));

const proxy = httpProxy.createProxyServer({
  secure: false
});

app.all('/api/*', (req, res) => {
  proxy.web(req, res, { target: API });
});

app.all('/.well-known/mercure', (req, res) => {
  proxy.web(req, res, { target: mercure });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

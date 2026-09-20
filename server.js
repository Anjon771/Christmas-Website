import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Resolve directory containing index.html
const candidateDirs = [
  path.join(__dirname, 'responsive-christmas-website-main'),
  path.join(__dirname, 'public'),
  __dirname,
];

const staticDir = candidateDirs.find((dir) => fs.existsSync(path.join(dir, 'index.html'))) || __dirname;

app.use(express.static(staticDir));
app.use(express.static(__dirname));

// Fallback to index.html for SPA/static routing
app.use((req, res) => {
  const indexPath = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

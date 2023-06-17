import express from 'express';
import path from 'path';
import fileDirName from '../utilities/file-dir-name.js';

const router = express.Router();
const { __dirname } = fileDirName(import.meta);

router.get('^/$|/index(.html)?', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;

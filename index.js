import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from './config/dbConn.js';
import fileDirName from './utilities/file-dir-name.js';
import { corsOptions } from './config/corsOptions.js';
import rootRouter from './routes/root.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import teacherRouter from './routes/teacher.route.js';
import studentRouter from './routes/student.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors(corsOptions));

// Connecting to MongoDB
export const client = await createConnection();

const { __dirname } = fileDirName(import.meta);

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', rootRouter);
app.use('/auth', authRouter);
app.use('/dashboard/admin', adminRouter);
app.use('/dashboard/teacher', teacherRouter);
app.use('/dashboard/student', studentRouter);

// 404 error handling
app.all('*', (request, response) => {
  response.status(404);
  if (request.accepts('html')) {
    response.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (request.accepts('json')) {
    response.json({ message: '404 Not Found' });
  } else {
    response.type('txt').send('404 Not Found');
  }
});

// Error handler
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨ `));

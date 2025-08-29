import { setupServer } from './server.js';
// import { initMongoConnection } from './db/initMongoConnection.js';
// import { initMongoDB } from './db/initMongoDB.js';
// import { startServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};
void bootstrap();
// const bootstrap = async () => {
//   await initMongoConnection();
//   setupServer();
// };
// bootstrap();

// import express from 'express';
// import cors from 'cors';

// const app = express();

// const PORT = 3005;

// app.use(cors());

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

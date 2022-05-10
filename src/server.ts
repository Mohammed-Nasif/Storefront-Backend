import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import ratelimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
import productRoutes from './handlers/products';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/orders';
import bodyParser from 'body-parser';

dotenv.config();

// create an instance server
const app: Application = express();

/* 
  Start Add Middlewears 
*/
// Middleware To Parse incoming Requests
app.use(bodyParser.json());

// HTTP request logger middleware
app.use(morgan('combined'));

// HTTP Security Middleware
app.use(helmet());

// Apply The Rate Limiter Middleware for All user Requests To Add Calldown for Requestes on Server
app.use(
  ratelimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Limit Each IP To 100 Requests per window (15Min.)
    standardHeaders: true, // Return Rate limit Info
    legacyHeaders: false,
    message:
      'Please Calm down, You submitted a lot of Requests in Short Time, Please Try Again After 15 Minutes.'
  })
);
/* 
  End Add Middlewears 
*/

// Server Port Called From .env file
const PORT = process.env.PORT || 3000; // Use Port 3000 Incase of There is no Port in .env File.

// start express server
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.send('Server Is ONLINE Now!');
});

// App Routes
productRoutes(app);
userRoutes(app);
orderRoutes(app);

// Send Error Message IF Required Route Not Exist
app.use((_req: Request, res: Response) => {
  res
    .status(404)
    .send('Something went wrong with your request, Please Read The Documentation Of The API.');
});

export default app;

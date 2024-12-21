import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});
app.get('/api/status', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});

export default app;

import express, { Request, Response } from 'express';
import { getQuoteOperationService } from './api/getQuoteOperationService/getQuoteOperationService';
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});
app.get('/api/status', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});
app.get("/api/quote", async (req: Request, res: Response) => {
  try {
    const quote = await getQuoteOperationService.price();
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching quote" });
  }
});
export default app;

import express, { Request, Response } from 'express';
import { getQuoteOperationService } from './api/getQuoteOperationService/getQuoteOperationService';
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json()); // Middleware para procesar JSON en el body
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});
app.get('/api/status', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});
app.post("/api/quote", async (req: Request, res: Response) => {
  try {
    // Llamar al servicio y pasar la solicitud completa (req)
    const quote = await getQuoteOperationService.price(req);

    // Devolver la respuesta
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ success: false, message: "Error fetching quote" });
  }
});
export default app;

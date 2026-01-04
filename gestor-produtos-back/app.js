import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

const products = [];

app.post('/produtos', async (req, res) => {

  await prisma.product.create({
    data: {
      description: req.body.description,
      price: req.body.price,
    },
  });

  res.status(201).json(req.body);
});

app.put('/produtos/:id', async (req, res) => {

  await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      description: req.body.description,
      price: req.body.price,
    },
  });

  res.status(201).json(req.body);
});

app.get('/produtos', async (req, res) => {

 let products = [];

 if (req.query) {
    products = await prisma.product.findMany({
      where: {
        description: req.query.description
      }
    }) 
  } else {
      products = await prisma.product.findMany();
    }
    res.status(200).json(products);
 });

app.delete('/produtos/:id', async (req, res) => {

  await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "produto deletado" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


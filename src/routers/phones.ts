'use strict';

import express from "express";
import path from 'path';
import fs from 'fs';
// const expensesController = require('../controllers/products');
const __dirname = path.resolve();

export const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  const filePath = path.join(
    __dirname,
    'public',
    'api',
    'phones.json',
  );

  const stream = fs.createReadStream(filePath);

  stream.pipe(res);
});

router.get('/:phoneId', (req, res) => {
  const { phoneId } = req.params

  const filePath = path.join(
    __dirname,
    'public',
    'api',
    'phones',
    `${phoneId}.json`,
  );

  const stream = fs.createReadStream(filePath);

  stream.pipe(res);
});

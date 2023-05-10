'use strict';

import express, { Router } from "express";
import phonesController from '../controllers/phones.js';

export const router: Router = express.Router();

router.use(express.json());

router.get('/', phonesController.getPhones);

router.get('/:phoneId', phonesController.getFileById);

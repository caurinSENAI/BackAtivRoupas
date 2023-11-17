import { Router } from 'express';

import { addClothe, getClothes, getClotheById, editClothe, removeClothe } from '../controllers/clothe.controller.js';

const clothesRouter = Router();

clothesRouter.get('/', getClothes);

clothesRouter.get('/:id', getClotheById);

clothesRouter.post('/', addClothe);

clothesRouter.put('/:id', editClothe);

clothesRouter.delete('/:id', removeClothe);

export default clothesRouter;

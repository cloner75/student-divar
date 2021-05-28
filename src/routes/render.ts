// Packages
import { Router } from 'express';
import { join } from 'path';

// Consts
const router = Router();


router
    .get('/index', (req, res) => {
        return res.sendFile('index.html');
    });

export default router;


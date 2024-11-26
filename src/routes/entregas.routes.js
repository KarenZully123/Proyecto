import { Router } from 'express';
import { 
    getEntregas, 
    getEntregaById, 
    postEntrega, 
    putEntrega, 
    patchEntrega, 
    deleteEntrega 
} from '../controladores/entregas.Ctrl.js';

const router = Router();

// Definir las rutas para la gestión de entregas
router.get('/entregas', getEntregas); // Obtener todas las entregas
router.get('/entregas/:id', getEntregaById); // Obtener una entrega por ID
router.post('/entregas', postEntrega); // Insertar una nueva entrega
router.put('/entregas/:id', putEntrega); // Actualizar una entrega completa
router.patch('/entregas/:id', patchEntrega); // Actualizar parcialmente una entrega
router.delete('/entregas/:id', deleteEntrega); // Eliminar una entrega

export default router;

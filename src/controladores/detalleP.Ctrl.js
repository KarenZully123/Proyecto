import { conmysql } from '../db.js';

export const getDetalle = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar los detalles del pedido" });
    }
};

export const getDetallexid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                message: "Detalle del pedido no encontrado"
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const postDetalle = async (req, res) => {
    try {
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

        // Validación de campos obligatorios
        if (!prod_id || !ped_id || !det_cantidad || !det_precio) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const [rows] = await conmysql.query('INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)', 
        [prod_id, ped_id, det_cantidad, det_precio]);

        res.status(201).json({
            id: rows.insertId
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el detalle del pedido" });
    }
};

export const putDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

        // Validación de campos obligatorios
        if (!prod_id || !ped_id || !det_cantidad || !det_precio) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const [result] = await conmysql.query('UPDATE pedidos_detalle SET prod_id = ?, ped_id = ?, det_cantidad = ?, det_precio = ? WHERE det_id = ?',
            [prod_id, ped_id, det_cantidad, det_precio, id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: "Detalle de pedido no encontrado"
            });
        }

        const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const patchDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

        const [result] = await conmysql.query('UPDATE pedidos_detalle SET prod_id = IFNULL(?, prod_id), ped_id = IFNULL(?, ped_id), det_cantidad = IFNULL(?, det_cantidad), det_precio = IFNULL(?, det_precio) WHERE det_id = ?',
            [prod_id, ped_id, det_cantidad, det_precio, id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: "Detalle del pedido no encontrado"
            });
        }

        const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const deleteDetalle = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM pedidos_detalle WHERE det_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                message: "No se pudo eliminar el detalle del pedido"
            });
        }
        res.status(202).send();
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el detalle del pedido" });
    }
};

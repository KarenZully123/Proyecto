import { conmysql } from '../db.js';

export const getEntregas = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM entregas');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar entregas" });
    }
};

export const getEntregaById = async (req, res) => {
    try {
        const entregaId = req.params.id;

        if (isNaN(entregaId)) {
            return res.status(400).json({ message: "El ID debe ser un número" });
        }

        const [result] = await conmysql.query('SELECT * FROM entregas WHERE ent_id = ?', [entregaId]);

        if (result.length <= 0) {
            return res.status(404).json({ message: "Entrega no encontrada" });
        }

        res.json(result[0]);
    } catch (error) {
        console.error("Error en getEntregaById:", error);
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postEntrega = async (req, res) => {
    try {
        const { ped_id, ent_direccion, ent_estado, ent_fecha_entrega, ent_costo } = req.body;

        if (!ped_id || !ent_direccion || !ent_estado) {
            return res.status(400).json({
                message: "Faltan datos necesarios"
            });
        }

        const [result] = await conmysql.query(
            'INSERT INTO entregas (ped_id, ent_direccion, ent_estado, ent_fecha_entrega, ent_costo) VALUES (?, ?, ?, ?, ?)',
            [ped_id, ent_direccion, ent_estado, ent_fecha_entrega || null, ent_costo || 0.00]
        );

        res.status(201).json({
            message: "Entrega creada exitosamente",
            id: result.insertId
        });
    } catch (error) {
        console.error("Error en postEntrega:", error);
        return res.status(500).json({ message: 'Error al crear la entrega, intente más tarde.' });
    }
};

export const putEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const { ped_id, ent_direccion, ent_estado, ent_fecha_entrega, ent_costo } = req.body;

        const [result] = await conmysql.query(
            'UPDATE entregas SET ped_id = ?, ent_direccion = ?, ent_estado = ?, ent_fecha_entrega = ?, ent_costo = ? WHERE ent_id = ?',
            [ped_id, ent_direccion, ent_estado, ent_fecha_entrega, ent_costo, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Entrega no encontrada" });
        }

        const [updatedRow] = await conmysql.query('SELECT * FROM entregas WHERE ent_id = ?', [id]);
        res.json(updatedRow[0]);
    } catch (error) {
        console.error("Error en putEntrega:", error);
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const patchEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const { ped_id, ent_direccion, ent_estado, ent_fecha_entrega, ent_costo } = req.body;

        const [result] = await conmysql.query(
            'UPDATE entregas SET ped_id = IFNULL(?, ped_id), ent_direccion = IFNULL(?, ent_direccion), ent_estado = IFNULL(?, ent_estado), ent_fecha_entrega = IFNULL(?, ent_fecha_entrega), ent_costo = IFNULL(?, ent_costo) WHERE ent_id = ?',
            [ped_id, ent_direccion, ent_estado, ent_fecha_entrega, ent_costo, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Entrega no encontrada" });
        }

        const [updatedRow] = await conmysql.query('SELECT * FROM entregas WHERE ent_id = ?', [id]);
        res.json(updatedRow[0]);
    } catch (error) {
        console.error("Error en patchEntrega:", error);
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const deleteEntrega = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conmysql.query('DELETE FROM entregas WHERE ent_id = ?', [id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Entrega no encontrada" });
        }

        res.status(202).json({ message: "Entrega eliminada exitosamente" });
    } catch (error) {
        console.error("Error en deleteEntrega:", error);
        return res.status(500).json({ message: 'Error al eliminar la entrega, intente más tarde.' });
    }
};


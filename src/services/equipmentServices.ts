import { client } from "../dataBase";
import { Equipment, EquipmentNew, EquipmentUpdate } from "../types/equipment_types";

export const getEquipments = async (): Promise<Equipment[] | undefined> => {
    const query = `select * from equipment;`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const ponds = await result.rows;

        return ponds;
    }
    return undefined;
};

export const getEquipment = async (id: Number): Promise<Equipment | undefined> => {
    const query = `SELECT id, pump_state, start_time, end_time, 
    end_time - start_time AS total_time 
    FROM equipment where id = ${id};`;
    
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const pond = await result.rows[0];

        return pond;
    }
    return undefined;
};

export const addEquipment = async (equipment: EquipmentNew) => {
    const query = `INSERT INTO equipment (start_time, end_time)
    VALUES ('${equipment.start_time}', '${equipment.end_time}');;
    `;
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const deleteEquipment = async (id: Number) => {
    const query = ` DELETE FROM equipment WHERE id = ${id};`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const updateBomb = async (id: Number,bool: Boolean) => {
    const query = `UPDATE equipment
    SET pump_state = ${bool}
    WHERE id = ${id};
    `;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const updateTime = async (id: Number,equipmentUpdate: EquipmentUpdate) => {
    const query = `UPDATE equipment
    SET pump_state = ${equipmentUpdate.pump_state},
        hora_inicio = '${equipmentUpdate.start_time}',
        hora_termino = '${equipmentUpdate.end_time}'
    WHERE id = ${id};
    `;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};
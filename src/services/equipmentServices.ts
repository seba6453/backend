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
    const query = `select * from equipment as eq where eq.id=${id};`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const pond = await result.rows[0];

        return pond;
    }
    return undefined;
};

export const updateEquipment = async (id: Number,equipment: EquipmentUpdate) => {
    const query = `UPDATE equipment
    SET light_duration = '${equipment.ligth_duration}', pump_state = ${equipment.pump_state}
    WHERE id = ${id};
    `;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const addEquipment = async (equipment: EquipmentNew) => {
    const query = `INSERT INTO equipment (light_duration, pump_state)
    VALUES ('${equipment.ligth_duration}', false);
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

export const updateTime = async (id: Number,time: String) => {
    const query = `UPDATE equipment
    SET light_duration = ${time}
    WHERE id = ${id};
    `;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};
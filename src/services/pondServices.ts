import { client } from "../dataBase";
import { Pond, PondNew, PondUpdate, StatePond } from "../types/pond_types";
import config from "../config";


export const getPonds = async (): Promise<Pond[] | undefined> => {
    const query = `select * from pond;`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const ponds = await result.rows;

        return ponds;
    }
    return undefined;
}

export const getPond = async (id: Number): Promise<Pond | undefined> => {
    const query = `select * from pond as pd where pd.id=${id};`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const pond = await result.rows[0];

        return pond;
    }
    return undefined;
};

export const updatePond = async (id: Number,pond: PondUpdate) => {
    const query = `UPDATE pond
    SET id_equipment = ${pond.id_equipment},
        id_microalgae_state = ${pond.id_microalgae_state},
        microalgae_name = '${pond.microalgae_name}',
        inoculation_date = '${pond.inoculation_date}',
        harvest_date = '${pond.harvest_date}',
        min_NTU = ${pond.min_NTU},
        max_NTU = ${pond.max_NTU}
    WHERE id = ${id};
    `;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const addPond = async (pondNew: PondNew) => {
    const query = `INSERT INTO pond (id_equipment, id_microalgae_state, microalgae_name, inoculation_date, harvest_date, min_NTU, max_NTU) 
    VALUES (${pondNew.id_equipment},${pondNew.id_microalgae_state} , '${pondNew.microalgae_name}', '${config.date}', NULL, ${pondNew.min_NTU}, ${pondNew.max_NTU});
    `;
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const deletePond = async (id: Number) => {
    const query = ` DELETE FROM pond WHERE id = ${id};`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const getState = async (id: Number): Promise<StatePond | undefined> => {
    const query = `SELECT *
    FROM (
        SELECT p.id, ms.state_name, p.min_ntu, p.max_ntu, r.illumination, r.ntu, r.id as id_report
        FROM pond p
        INNER JOIN report r ON p.id = r.pond_id
        INNER JOIN microalgae_state ms ON p.id_microalgae_state = ms.id
        WHERE p.id = ${id}
        AND r.date = (
            SELECT MAX(date)
            FROM report
            WHERE pond_id = p.id
        )
    ) subquery
    ORDER BY subquery.id_report DESC
    LIMIT 1;`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const statePond = await result.rows[0];

        return statePond;
    }
    return undefined;
};
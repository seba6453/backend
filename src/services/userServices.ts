import { client } from "../dataBase";
import { User } from "../types/user_types";


export const getUsers = async (): Promise<User[] | undefined> => {
    const query = `select * from user_data ud`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const users = await result.rows;

        return users;
    }
    return undefined;
}

export const getUser = async (email: String): Promise<User | undefined> => {
    const query = `select * from user_data ud where ud.email = lower('${email}')`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const userData = await result.rows[0];

        return userData;
    }
    return undefined;
};
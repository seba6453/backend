import { client } from "../dataBase";
import { User, UserNew } from "../types/user_types";


export const getUsers = async (): Promise<User[] | undefined> => {
    const query = `select * from user_data;`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const users = await result.rows;

        return users;
    }
    return undefined;
}

export const getUser = async (id: Number): Promise<User | undefined> => {
    const query = `select * from user_data as ud where ud.id=${id};`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const userData = await result.rows[0];

        return userData;
    }
    return undefined;
};

export const updateUser = async (user: User) => {
    const query = `UPDATE user_data SET name = '${user.name}', email = '${user.name}' WHERE id = ${user.id};`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const addUser = async (userNew: UserNew) => {
    const query = `SELECT insert_user('${userNew.name}', '${userNew.email}');`;
    try {
        const result = await client.query(query)
        return result.rows[0].insert_user;
    }catch (err){
        console.error(err);
        return -1;
    }
};

export const deleteUser = async (id: Number) => {
    const query = ` DELETE FROM user_data WHERE id = ${id};`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};
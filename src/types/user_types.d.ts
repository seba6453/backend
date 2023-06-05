export interface User {
    id: Number,
    name: String,
    email: String
};

export type UserNew = Omit<User, "id">;
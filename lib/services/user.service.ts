import createHttpError from "http-errors";
import User from "../models/user";
import repository from "../repositories/user.repository";

async function findAll(): Promise<User[]> {
    return await repository.findAll();
}

async function createUser(user: User): Promise<User> {
    return await repository.create(user);
}

async function findById(id: string): Promise<User | null> {
    const user = await repository.findById(id);
    if (!user) {
        throw createHttpError(404, `Usuário com o id '${id}' não encontrado.`);
    }
    return user;
}

async function updateUser(id: string, user: Partial<User>): Promise<User> {
    const existingUser = await repository.findById(id);
    if (!existingUser) {
        throw createHttpError(404, `Usuário com o id '${id}' não encontrado.`);
    }
    await repository.update(id, user);
    return existingUser;
}

async function remove(id: string): Promise<User> {
    const user = await repository.findById(id);
    if (!user) {
        throw createHttpError(404, `Usuário com o id '${id}' não encontrado.`);
    }
    await repository.remove(id);
    return user; 
}

export {
    findAll,
    createUser,
    findById,
    updateUser,
    remove,
}


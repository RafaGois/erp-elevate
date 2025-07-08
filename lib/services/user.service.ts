import createHttpError from "http-errors";
import User from "../models/user";
import * as repository from "../repositories/user.repository";

async function findAll(): Promise<User[]> {
    return await repository.findAll();
}

async function create(user: User): Promise<User> {
    return await repository.create(user);
}

async function findById(id: string): Promise<User | null> {
    const user = await repository.findById(id);
    if (!user) {
        throw createHttpError(404, `Usuário com o id '${id}' não encontrado.`);
    }
    return user;
}

async function update(id: string, user: Partial<User>): Promise<Partial<User>> {
    console.log({id, user});
    
    const existingUser = await repository.findById(id);
    if (!existingUser) {
        throw createHttpError(404, `Usuário com o id '${id}' não encontrado.`);
    }
    await repository.update(id, user);
    return user;
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
    create,
    findById,
    update,
    remove,
}


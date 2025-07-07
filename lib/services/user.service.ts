import User from "../models/user";
import repository from "../repositories/user.repository";

async function findAll(): Promise<User[]> {
    return await repository.findAll();
}

async function createUser(user: User): Promise<User> {
    return await repository.create(user);
}


export default {
    findAll,
    createUser
}


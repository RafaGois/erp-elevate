import createHttpError from "http-errors";
import { EquipamentExit } from "../models";
import * as repository from "../repositories/equipamentExit.repository";

async function findAll(): Promise<EquipamentExit[]> {
    return await repository.findAll();
}

async function create(equipamentExit: EquipamentExit): Promise<EquipamentExit> {
    return await repository.create(equipamentExit);
}

async function findById(id: string): Promise<EquipamentExit | null> {
    const equipamentExit = await repository.findById(id);
    if (!equipamentExit) {
        throw createHttpError(404, `Equipamento com o id '${id}' não encontrado.`);
    }
    return equipamentExit;
}

async function update(id: string, equipamentExit: Partial<EquipamentExit>): Promise<Partial<EquipamentExit>> {
    const existingEquipament = await repository.findById(id);
    if (!existingEquipament) {
        throw createHttpError(404, `Equipamento com o id '${id}' não encontrado.`);
    }
    await repository.update(id, equipamentExit);
    return equipamentExit;
}

async function remove(id: string): Promise<EquipamentExit> {
    const equipamentExit = await repository.findById(id);
    if (!equipamentExit) {
        throw createHttpError(404, `Equipamento com o id '${id}' não encontrado.`);
    }
    await repository.remove(id);
    return equipamentExit;
}

export {
    findAll,
    create,
    findById,
    update,
    remove,
}
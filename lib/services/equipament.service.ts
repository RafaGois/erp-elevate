import createHttpError from "http-errors";
import Equipament from "../models/Equipament";
import * as repository from "../repositories/equipament.repository";

async function findAll(): Promise<Equipament[]> {
    return await repository.findAll();
}

async function create(equipament: Equipament): Promise<Equipament> {
    return await repository.create(equipament);
}

async function findById(id: string): Promise<Equipament | null> {
    const equipament = await repository.findById(id);
    if (!equipament) {
        throw createHttpError(404, `Equipamento com o id '${id}' não encontrado.`);
    }
    return equipament;
}

async function update(id: string, equipament: Partial<Equipament>): Promise<Partial<Equipament>> {
    console.log({ id, equipament });

    const existingEquipament = await repository.findById(id);
    if (!existingEquipament) {
        throw createHttpError(404, `Equipamento com o id '${id}' não encontrado.`);
    }
    await repository.update(id, equipament);
    return equipament;
}

async function remove(id: string): Promise<Equipament> {
    const equipament = await repository.findById(id);
    if (!equipament) {
        throw createHttpError(404, `Equipamento com o id '${id}' não encontrado.`);
    }
    await repository.remove(id);
    return equipament;
}

export {
    findAll,
    create,
    findById,
    update,
    remove,
}
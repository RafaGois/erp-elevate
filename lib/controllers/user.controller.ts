import * as service from '../services/user.service';
import { apiResponse } from '../utils/apiResponse';
import { NextRequest } from 'next/server';

export async function getAllItems() {
    try {
        const users = await service.findAll();
        return apiResponse(true, users);
    } catch {
        throw new Error('Failed to fetch users.');
    }
}

export async function createItem(req: NextRequest) {
    try {
        const body = await req.json();
        const createdUser = await service.createUser(body);
        return apiResponse(true, createdUser);
    } catch {
        throw new Error('Failed to create user.');
    }
}

export async function getItemById(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            throw new Error('User ID is required.');
        }

        const user = await service.findById(id);
        if (!user) {
            throw new Error('User not found.');
        }

        return apiResponse(true, user);
    } catch {
        throw new Error('Failed to fetch user.');
    }
}

export async function updateItem(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            throw new Error('User ID is required.');
        }

        const body = await req.json();
        const updatedUser = await service.updateUser(id, body);

        return apiResponse(true, updatedUser);
    } catch {
        throw new Error('Failed to update user.');
    }
}

export async function deleteItem(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            throw new Error('User ID is required.');
        }

        await service.remove(id);
        return apiResponse(true, null, 'User deleted successfully.');
    } catch {
        throw new Error('Failed to delete user.');
    }
}



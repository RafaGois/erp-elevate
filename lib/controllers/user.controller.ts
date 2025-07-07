import { NextApiRequest, NextApiResponse } from 'next';
import service from '../services/user.service';
import { apiResponse } from '../utils/apiResponse';
//import { apiResponse } from '../utils/apiResponse';

async function getAllItems(req: NextApiRequest, res: NextApiResponse) {
    try {
        const items = await service.findAll();
        
        //res.status(200).json(apiResponse(true, items));
        return items;
    } catch (err) {
        res.status(500).json(apiResponse(false, null, (err as Error).message || 'Failed to fetch items.'));
    }
}

async function createItem(req: NextApiRequest, res: NextApiResponse) {
    try {

        const item = await service.createUser(req.body);
        res.status(201).json(apiResponse(true, item));
    } catch (err) {
        res.status(500).json(apiResponse(false, null, (err as Error).message || 'Failed to create item.'));
    }
}

export default {
    getAllItems,
    createItem
}


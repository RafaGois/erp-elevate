import { NextApiRequest, NextApiResponse } from 'next';
import service from '../services/user.service';
import { apiResponse } from '../utils/apiResponse';

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

        console.log(JSON.parse(req.body));
        
        const item = await service.createUser(JSON.parse(req.body));
        
        return item;
        //res.status(201).json(apiResponse(true, item));
    } catch (err) {
        return res.status(500).json(apiResponse(false, null, (err as Error).message || 'Failed to create item.'));
    }
}

export default {
    getAllItems,
    createItem
}


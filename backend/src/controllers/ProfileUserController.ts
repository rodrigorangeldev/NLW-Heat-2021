import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {

    async handle(req: Request, res: Response){
       
        try {

            const { user_id } = req;
            const service = new ProfileUserService();
            const result = await service.execute(user_id);

            return res.json(result);

        } catch (error) {
            return res.json({error: error.message});
        }
    
       

    }

}

export { ProfileUserController }
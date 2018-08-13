import {Request, Response} from 'express';
import {authenticate} from "./database-data";




export function loginUser(req: Request, res: Response) {

    console.log("User login attempt ...");

    const {email, password} = req.body;

    const user = authenticate(email, password);

    if (user) {
        res.status(200).json({id:user.id, email: user.email});
    }
    else {
        res.sendStatus(403);
    }

}
import Express from "express";
import { addUser, deleteUser, getUser, getUsers } from "../services/userServices";
import { UserNew } from "../types/user_types";

const router = Express.Router();




router.get("/",async (_req,res) => {
    const users = await getUsers()
    res.status(200).send(users);
});

router.get("/:id",async (req,res) => {
    try{
        const idUser = parseInt(req.params.id);
        const user = await getUser(idUser);
        res.status(200).send(user);
    }catch{
        res.status(400).send("Error en el id");
    }
    
});

router.post("/",async (req,res) => {
    const userNew: UserNew = req.body;
    const idUSer = await addUser(userNew);
    if(idUSer > 0){
        res.status(201).send(idUSer);
    }else{
        res.status(400).send("Error en la carga del usuario");
    }

});

router.delete("/:id",async (req,res) => {
    try{
        const idUser = parseInt(req.params.id);
        if(await deleteUser(idUser)){
            res.status(200);
        }else{
            res.status(400).send("Error al eliminar al usuario");
        }
    }catch{
        res.status(400).send("Error en el id");
    }
});


export default router;
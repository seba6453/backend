import Express from "express";
import { addPond, deletePond, getPond, getPonds, updatePond } from "../services/pondServices";
import { PondNew, PondUpdate } from "../types/pond_types";
const router = Express.Router();




router.get("/",async (_req,res) => {
    const ponds = await getPonds()
    res.status(200).send(ponds);
});

router.get("/:id",async (req,res) => {
    try{
        const idPond = parseInt(req.params.id);
        const pond = await getPond(idPond);
        if (pond != undefined) {
            res.status(200).send(pond);
        } else {
            res.status(404).send({"mensaje":"Estanque no encontrado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
    
});

router.post("/",async (req,res) => {
    const pondNew: PondNew = req.body;
    if (await addPond(pondNew)) {
        res.status(200).send(pondNew);
    } else {
        res.status(404).send({"mensaje":"Error al agregar un nuevo estanque"});
    }

});


router.put("/:id",async (req,res) => {
    try{
        const pondUpdate: PondUpdate = req.body;
        const id = parseInt(req.params.id);
        if (await updatePond(id,pondUpdate)) {
            res.status(200).send(pondUpdate);
        } else {
            res.status(404).send({"mensaje":"Estanque no actualizado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
    

});

router.delete("/:id",async (req,res) => {
    try{
        const idPond = parseInt(req.params.id);
        if(await deletePond(idPond)){
            res.status(200).send({"mensaje":"Estanque eliminado"});
        }else{
            res.status(400).send({"mensaje":"Error al eliminar al estanque"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});


export default router;
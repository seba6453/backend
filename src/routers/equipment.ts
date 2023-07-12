import Express from "express";
import { addEquipment, deleteEquipment, getEquipment, getEquipments, updateBomb, updateTime } from "../services/equipmentServices";
import { EquipmentNew, EquipmentUpdate } from "../types/equipment_types";
const router = Express.Router();

router.get("/",async (_req,res) => {
    const equipment = await getEquipments();
    res.status(200).send(equipment);
});

router.get("/:id",async (req,res) => {
    try{
        const idEquipment = parseInt(req.params.id);
        const equipment = await getEquipment(idEquipment);
        if (equipment != undefined) {
            res.status(200).send(equipment);
        } else {
            res.status(404).send({"mensaje":"Equipo no encontrado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});

router.post("/",async (req,res) => {
    const equipmentNew: EquipmentNew = req.body;
    if (await addEquipment(equipmentNew)) {
        res.status(200).send(equipmentNew);
    } else {
        res.status(404).send({"mensaje":"Error al agregar un nuevo equipo"});
    }

});

router.delete("/:id",async (req,res) => {
    try{
        const idEquipment = parseInt(req.params.id);
        if(await deleteEquipment(idEquipment)){
            res.status(200).send({"mensaje":"Equipo eliminado"});
        }else{
            res.status(400).send({"mensaje":"Error al eliminar al equipo"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});

router.put("/openbomb/:id",async (req,res) => {
    try{
        const id = parseInt(req.params.id);
        if (await updateBomb(id,true)) {
            res.status(200).send({"mensaje":"Bomba abierta"});
        } else {
            res.status(404).send({"mensaje":"Bomba no actualizado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});

router.put("/closeBomb/:id",async (req,res) => {
    try{
        const id = parseInt(req.params.id);
        if (await updateBomb(id,false)) {
            res.status(200).send({"mensaje":"Bomba cerrada"});
        } else {
            res.status(404).send({"mensaje":"Bomba no actualizado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});

router.put("/time/:id",async (req,res) => {
    try{
        const timeEquip: EquipmentUpdate = req.body;
        const id = parseInt(req.params.id);
        if (await updateTime(id,timeEquip)) {
            res.status(200).send({"mensaje":"Tiempo actualizado"});
        } else {
            res.status(404).send({"mensaje":"Tiempo no actualizado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});

export default router;
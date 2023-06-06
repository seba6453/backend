import Express from "express";
import { addReport, deleteReport, getReport, getReports, updateReport } from "../services/reportService";
import { ReportUpdate } from "../types/report_types";
const router = Express.Router();




router.get("/",async (_req,res) => {
    const reports = await getReports()
    res.status(200).send(reports);
});

router.get("/:id",async (req,res) => {
    try{
        const idReport = parseInt(req.params.id);
        const reports = await getReport(idReport);
        if (reports != undefined) {
            res.status(200).send(reports);
        } else {
            res.status(404).send({"mensaje":"Reporte no encontrado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
    
});

router.post("/",async (req,res) => {
    const reportNew: ReportUpdate = req.body;
    if (await addReport(reportNew)) {
        res.status(200).send(reportNew);
    } else {
        res.status(404).send({"mensaje":"Error al agregar un nuevo Reporte"});
    }

});


router.put("/:id",async (req,res) => {
    try{
        const reportUpdate: ReportUpdate = req.body;
        const id = parseInt(req.params.id);
        if (await updateReport(id,reportUpdate)) {
            res.status(200).send(reportUpdate);
        } else {
            res.status(404).send({"mensaje":"Reporte no actualizado"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
    

});

router.delete("/:id",async (req,res) => {
    try{
        const idReport = parseInt(req.params.id);
        if(await deleteReport(idReport)){
            res.status(200).send({"mensaje":"Reporte eliminado"});
        }else{
            res.status(400).send({"mensaje":"Error al eliminar al Reporte"});
        }
    }catch{
        res.status(400).send({"mensaje":"Error en el id"});
    }
});


export default router;
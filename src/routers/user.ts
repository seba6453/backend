import Express from "express";
import { getUsers } from "../services/userServices";

const router = Express.Router();




router.get("/",async (_req,res) => {
    res.send(await getUsers());
});

router.get("/:id",async (_req,_res) => {
});

router.post("/",async (_req,_res) => {

});

router.delete("/:id",async (_req,_res) => {
});


export default router;
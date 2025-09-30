import { Router } from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo";

const router = Router();

router.post("/create", createTodo);
router.get("/getTodos", getTodos);
router.get("/getTodos/:id", getTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";

export const createTodo = async (req : Request, res : Response) => {
    const { title } = req.body;
    try {
        if(!title){
            return res.status(400).json({ message : "Title is required!" });
        }
        const newTodo = await Todo.create({ title });
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong!" });        
    }
}

export const getTodos = async (req : Request, res : Response) => {
    try {
        const todos = await Todo.find();
        if(!todos){
            return res.status(404).json({ message : "Empty!" });
        }
        //res.status(200).json({ message : "All todos fetched.", todos : todos });
        res.status(200).json({ message : "All todos fetched.", todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong!" }); 
    }
}

export const getTodo = async (req : Request, res : Response) => {
    const {id} = req.params;
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({ message : "Empty!" });
        }
        //res.status(200).json({ message : "All todos fetched.", todo : todo });
        res.status(200).json({ message : `Todo : ${id} is fetched.`, todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong!" }); 
    }
}

export const updateTodo = async (req : Request, res : Response) => {
    const id = req.params.id;
    const { title } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id,{title});
        res.status(200).json({ message : `Todo : ${id} has been updated.`, todo : updateTodo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong!" }); 
    }
}

export const deleteTodo = async (req : Request, res : Response) => {
    const {id} = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message : `Todo : ${id} is deleted.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong!" }); 
    }
}

import type { Note } from "../types/notes";

const API_URL =
  import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_LOCAL_URL
    : import.meta.env.VITE_API_URL;
console.log("api url: ", API_URL);

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${API_URL}/getTodos`);
  const data = await response.json();
  return data.todos;
};

export const createNote = async (title: string) => {
  await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const updateNote = async (id: string, title: string) => {
  await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const deleteNote = async (id: string) => {
  await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
  });
};

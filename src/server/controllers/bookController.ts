import { Request, Response } from 'express';

export const getAllBooks = (req: Request, res: Response) => {
    res.status  (200).json({ message: 'Get all books' });
};

export const getBookById = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get book by ID' });
};

export const createBook = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Create a new book' });
};

export const updateBook = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Update a book' });
};

export const deleteBook = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Delete a book' });
};

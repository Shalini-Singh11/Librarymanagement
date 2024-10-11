import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  editBook,
  deleteBook,
  setBooks,
} from "../../features/booksSlice";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import apiService from "../../services/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthors } from "../../features/authorsSlice"; 

const BooksManager = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const authors = useSelector((state) => state.authors);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    authors: [],
    publication_date: "",
    copies: "",
    description: "",
  });

  useEffect(() => {
    fetchBooks();
    fetchAuthors(); 
  }, [dispatch]);

  const fetchBooks = async () => {
    try {
      const response = await apiService.get("api/books/");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      dispatch(setBooks(data.results));
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error(error.message);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await apiService.get("api/authors");
      if (!response.ok) throw new Error("Failed to fetch authors");
      const data = await response.json();
      dispatch(setAuthors(data.results));
    } catch (error) {
      console.error("Error fetching authors:", error);
      toast.error(error.message);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      authors: [],
      publication_date: "",
      copies_available: "",
      description: "",
    });
  };

  const handleSubmit = async () => {
    console.log('Submitting formData:', formData);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("authors", JSON.stringify(formData.authors)); 
    formDataToSubmit.append("publication_date", formData.publication_date);
    formDataToSubmit.append("copies_available", formData.copies_available);
    formDataToSubmit.append("description", formData.description);

    console.log('formDataToSubmit', formDataToSubmit);
    
    try {
      let response;
      if (formData.id) {
        response = await apiService.update(
          `api/books/${formData.id}/`,
          formData
        );
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to update book.");
          return;
        }
        dispatch(
          editBook({ id: formData.id, updatedBook: await response.json() })
        );
        toast.success("Book updated successfully!");
      } else {
        response = await apiService.post("api/books/", formData);
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to add book.");
          return;
        }
        dispatch(addBook(await response.json()));
        toast.success("Book added successfully!");
      }
      handleClose();
      fetchBooks();
    } catch (error) {
      console.error("Error adding/editing book:", error);
      toast.error("Failed to add/edit book.");
    }
  };

  const handleEdit = (book) => {
    setFormData({
      id: book.id,
      title: book.title,
      authors: book.authors_details?.map(author => author.id) || [], 
      publication_date: book.publication_date,
      copies: book.copies_available,
      description: book.description,
    });
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiService.delete(`api/books/${id}/`);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete book.");
        return;
      }
      dispatch(deleteBook(id));
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book.");
    }
  };

  const handleAuthorsChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, authors: value });
  };

  return (
    <div>
      <ToastContainer />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ marginBottom: "3%", background: "green" }}
      >
        Add Book
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Copies</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 ? (
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>
                    {book.authors_details?.map((authors, index) => (
                      <span key={index}>
                        {authors.first_name} {authors.last_name}
                        {index < book.authors_details.length - 1 ? ", " : ""} 
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>{book.publication_date}</TableCell>
                  <TableCell>{book.copies_available}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(book)}>Edit</Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No books found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Edit Book" : "Add Book"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <InputLabel id="author-select-label">Authors</InputLabel>
          <Select
            labelId="author-select-label"
            multiple
            fullWidth
            value={formData.authors}
            onChange={handleAuthorsChange}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.first_name} {author.last_name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            margin="dense"
            label="Publish Date"
            type="date"
            fullWidth
            value={formData.publication_date}
            onChange={(e) =>
              setFormData({ ...formData, publication_date: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Copies"
            type="number"
            fullWidth
            value={formData.copies_available}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setFormData({ ...formData, copies_available: value >= 1 ? value : 1 });
            }}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BooksManager;

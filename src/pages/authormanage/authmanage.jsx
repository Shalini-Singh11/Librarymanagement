import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//=======================================Slice =======================================
import {
  addAuthor,
  editAuthor,
  deleteAuthor,
  setAuthors,
} from "../../features/authorsSlice";
//======================================= MUI =======================================
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
} from "@mui/material";
import apiService from "../../services/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthorManage = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors || []);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, first_name: "", last_name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, [dispatch]);

  const fetchAuthors = async () => {
    try {
      const response = await apiService.get("api/authors");
      const data = await response.json();
      dispatch(setAuthors(data.results));
    } catch (error) {
      toast.error(error.message || "Failed to fetch authors.");
      setError("Failed to fetch authors.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => setFormData({ id: null, first_name: "", last_name: "" });

  const handleSubmit = async () => {
    const authorPayload = { first_name: formData.first_name, last_name: formData.last_name };

    try {
      let response;
      if (formData.id) {
        response = await apiService.update(`api/authors/${formData.id}/`, authorPayload);
        const updatedAuthor = await response.json();
        dispatch(editAuthor({ id: formData.id, updatedAuthor }));
        toast.success("Author updated successfully!");
      } else {
        response = await apiService.post("api/authors/", authorPayload);
        const newAuthor = await response.json();
        dispatch(addAuthor(newAuthor));
        toast.success("Author added successfully!");
      }
      await fetchAuthors();  
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to add/edit author.");
      setError("Failed to add/edit author.");
    }
  };

  const handleEdit = (author) => {
    setFormData({ id: author.id, first_name: author.first_name, last_name: author.last_name });
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`api/authors/${id}/`);
      dispatch(deleteAuthor(id));
      toast.success("Author deleted successfully!");
      await fetchAuthors(); 
    } catch (error) {
      toast.error(error.message || "Failed to delete author.");
      setError("Failed to delete author.");
    }
  };

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ToastContainer />
      <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginBottom: "3%", background: "green" }}>
        Add Author
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.length > 0 ? (
              authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>{author.first_name}</TableCell>
                  <TableCell>{author.last_name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(author)}>Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(author.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No authors found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Edit Author" : "Add Author"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleSubmit} >Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthorManage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Redux Slice ======================
import {
  addUser,
  editUser,
  deleteUser,
  setUsers,
} from "../../features/usersSlice";

// MUI ======================
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

const UserManage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users || []);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const response = await apiService.get("api/auth/user");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch users");
      dispatch(setUsers(data.results));
    } catch (error) {
      toast.error(error.message || "Failed to fetch users");
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
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  const handleSubmit = async () => {
    const userPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      email: formData.email,
      ...(formData.id ? {} : { password: formData.password, confirm_password: formData.confirm_password }),
    };

    try {
      let response;
      if (formData.id) {
        response = await apiService.put(`api/auth/user/${formData.id}/`, userPayload);
      } else {
        response = await apiService.post("api/auth/user/", userPayload);
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit user data");
      if (formData.id) {
        dispatch(editUser({ id: formData.id, updatedUser: data }));
        await fetchUsers();
        toast.success("Updated successfully");
      } else {
        dispatch(addUser(data));
        toast.success("Added successfully!");
      }
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to submit user data");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      password: "",
      confirm_password: "",
    });
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiService.delete(`api/auth/user/${id}/`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete user");

      await fetchUsers();
      dispatch(deleteUser(id));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
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
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Edit User" : "Add User"}</DialogTitle>
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
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {!formData.id && (
            <>
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManage;

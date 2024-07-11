import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Avatar, Button, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseUrl } from "../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import EditStaffForm from "./EditStaffForm";
import AddStaffForm from "./AddStaffForm";

const BaseAPI = baseUrl();
const Dashboard = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await BaseAPI.get("/staffManagement");
    setDataSource(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    const result = window.confirm("Bạn có muốn xóa không?");
    if (result) {
      await BaseAPI.delete(`/staffManagement/${id}`);
      fetchData();
    }
  };
  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedStaff(null);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };
  return (
    <>
      <Header />
      <Container>
        <h1>Dashboard</h1>
        <Button variant="contained" color="success" onClick={handleAddOpen}>
          Create
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Create Date</TableCell>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource.map((el) => (
                <TableRow
                  key={el.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {el.name}
                  </TableCell>
                  <TableCell align="right">{el.age}</TableCell>
                  <TableCell align="right">{el.address}</TableCell>
                  <TableCell align="right">{el.createdAt}</TableCell>
                  <TableCell align="left">
                    <Avatar alt={el.name} src={el.avatar} />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleDelete(el.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => handleEdit(el)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedStaff && (
          <EditStaffForm
            open={editOpen}
            handleClose={handleEditClose}
            staff={selectedStaff}
            fetchData={fetchData}
          />
        )}
        <AddStaffForm
          open={addOpen}
          handleClose={handleAddClose}
          fetchData={fetchData}
        />
      </Container>
    </>
  );
};

export default Dashboard;

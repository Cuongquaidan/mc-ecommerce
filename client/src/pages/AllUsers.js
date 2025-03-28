import React, { useEffect, useState } from "react";
import SUMMARY_API from "../common";
import { toast } from "react-toastify";
import { MdOutlineUnfoldMore } from "react-icons/md";
import {
    Box,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
const columns = [
    { id: "no", label: "No" },

    {
        id: "name",
        label: "Name",
    },
    {
        id: "email",
        label: "Email",
    },
    {
        id: "role",
        label: "Role",
    },
    {
        id: "createdAt",
        label: "Create at",
    },
    {
        id: "updateRole",
        label: "Update Role",
    },
];
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
function AllUsers() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [updateUser, setUpdateUser] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const fetchData = async () => {
        const response = await fetch(`${SUMMARY_API.getAllUsers.url}`, {
            method: SUMMARY_API.getAllUsers.method,
            credentials: "include",
        });
        const result = await response.json();

        if (result.success) {
            setUsers(result.data);
            setFilteredUsers(result.data);
        }
    };
    const [roleSelected, setRoleSelected] = useState("user");
    const handleUpdateRole = async () => {
        try {
            console.log(updateUser, roleSelected);
            const response = await fetch(
                `${
                    SUMMARY_API.updateUserRole.url
                }/${updateUser._id.toString()}`,
                {
                    method: SUMMARY_API.updateUserRole.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ role: roleSelected }),
                }
            );
            const result = await response.json();
            if (result.success) {
                await fetchData();
                handleClose();
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        fetchData();
        console.log(users);
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-end gap-4 p-4 bg-white">
                <div className="relative inline-block">
                    <select
                        className="p-2 pr-8 border-2 border-blue-400 rounded-md outline-none appearance-none"
                        onChange={(e) => {
                            setFilteredUsers(
                                users?.filter((user) => {
                                    if (e.target.value === "") {
                                        return true;
                                    }
                                    return user.role === e.target.value;
                                })
                            );
                        }}
                    >
                        <option value="">Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <MdOutlineUnfoldMore />
                    </span>
                </div>
            </div>
            <TableContainer sx={{ maxHeight: 1000 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    className="!font-bold !bg-blue-300"
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-200"
                                        }
                                    >
                                        {columns.map((column) => {
                                            let value;

                                            // Dynamically handle column values
                                            if (column.id === "no") {
                                                value =
                                                    page * rowsPerPage +
                                                    index +
                                                    1; // Generate row number
                                            } else if (
                                                column.id === "createdAt"
                                            ) {
                                                console.log(row[column.id]);
                                                value = new Date(
                                                    row[column.id]
                                                ).toLocaleDateString(); // Format date
                                            } else if (
                                                column.id === "updateRole"
                                            ) {
                                                value = (
                                                    <button
                                                        className="px-2 py-1 text-white bg-blue-500 rounded-md"
                                                        onClick={() => {
                                                            handleOpen();
                                                            setUpdateUser(row);
                                                        }}
                                                    >
                                                        Update Role
                                                    </button>
                                                );
                                            } else {
                                                value = row[column.id];
                                            }
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Update user's role
                    </Typography>
                    <div>
                        <Typography
                            id="modal-modal-description"
                            sx={{
                                mt: 2,
                                p: 3,
                                backgroundColor: "#fff",
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                maxWidth: "400px",
                                margin: "0 auto",
                            }}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    value={updateUser?.name}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    value={updateUser?.email}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Role
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={roleSelected}
                                    onChange={(e) =>
                                        setRoleSelected(e.target.value)
                                    }
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                onClick={handleUpdateRole}
                            >
                                Update
                            </button>
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AllUsers;

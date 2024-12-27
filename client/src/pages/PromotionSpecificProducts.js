import {
    Button,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import ModalAddPromotion from "../components/ModalAddPromotion";
import { useLocation } from "react-router-dom";

function PromotionSpecificProducts() {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleOnClose = () => {
        setIsOpen(false);
    };
    const location = useLocation();
    console.log(location.pathname.split("/")[3]);
    const promotionType = location.pathname
        .split("/")[3]
        .replace("-", " ")
        .toUpperCase();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div className="flex flex-col gap-10 p-4">
            <div className="flex justify-between w-full">
                <h3>Promotion Management</h3>
                <Button variant="contained" onClick={() => setIsOpen(true)}>
                    Add new
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="!font-bold !bg-blue-300">
                                STT
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Promotion Name
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Start Date
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                End Date
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Discount Type
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Discount Value
                            </TableCell>

                            <TableCell className="!font-bold !bg-blue-300">
                                Disabled
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                {products
                    .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                    )
                    .map((product, index) => (
                        <TableRow
                            key={index}
                            className={
                                index % 2 === 0
                                    ? "bg-white"
                                    : "bg-gray-200"
                            }
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="text-ellipsis line-clamp-2 max-w-[300px]">
                                {product.productName}
                            </TableCell>
                            <TableCell>{product.brandName}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.selling}</TableCell>
                            
                            <TableCell>
                                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full cursor-pointer hover:bg-green-500">
                                    <MdModeEditOutline
                                        size={24}
                                        onClick={() => {
                                            // setIsEditing(true);
                                            // setProductEditing(product);
                                            // console.log(productEditing);
                                        }}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody> */}
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                // count={products.length}
                // rowsPerPage={rowsPerPage}
                // page={page}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalAddPromotion
                isOpen={isOpen}
                onClose={handleOnClose}
                type={promotionType}
            ></ModalAddPromotion>
        </div>
    );
}

export default PromotionSpecificProducts;

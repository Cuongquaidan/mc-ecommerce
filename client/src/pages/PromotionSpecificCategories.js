import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalAddPromotion from "../components/ModalAddPromotion";
import SUMMARY_API from "../common";
import { useLocation } from "react-router-dom";

function PromotionSpecificCategories() {
    const [isOpen, setIsOpen] = useState(false);

    const [promotions, setPromotions] = useState([]);
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
    const fetchPromotion = async () => {
        console.log("Starting fetch...");
        try {
            const response = await fetch(
                SUMMARY_API.getPromotion.url +
                    `?type=${encodeURI(promotionType)}`
            );
            console.log("fetchinggggggg", response);

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            console.log("Data fetched:", data);
            setPromotions(data.data);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    useEffect(() => {
        fetchPromotion();
    }, []);
    return (
        <div className="flex flex-col gap-10 p-4">
            <div className="flex justify-between w-full">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                    Promotion Specific Categories
                </h2>
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
                                Categories
                            </TableCell>

                            <TableCell className="!font-bold !bg-blue-300">
                                Disabled
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promotions
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((promotion, index) => (
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
                                        {promotion.name}
                                    </TableCell>
                                    <TableCell>{promotion.startDate}</TableCell>
                                    <TableCell>{promotion.endDate}</TableCell>
                                    <TableCell>
                                        {promotion.discountType}
                                    </TableCell>
                                    <TableCell>
                                        {promotion.discountValue}
                                    </TableCell>
                                    <TableCell>
                                        {promotion.categories.map(
                                            (category, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2"
                                                >
                                                    {category.value}
                                                </div>
                                            )
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-center cursor-pointer ">
                                            {promotion.status === "active" ? (
                                                <button className="p-2 text-white bg-red-700 rounded-md">
                                                    Disabled
                                                </button>
                                            ) : (
                                                <button className="p-2 text-white bg-green-700 rounded-md">
                                                    Active
                                                </button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={promotions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalAddPromotion
                isOpen={isOpen}
                onClose={handleOnClose}
                type={promotionType}
                onRefesh={fetchPromotion}
            ></ModalAddPromotion>
        </div>
    );
}

export default PromotionSpecificCategories;

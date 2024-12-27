import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SUMMARY_API from "../common";

function ModalAddPromotion({ isOpen, onClose, type }) {
    const [promotion, setPromotion] = React.useState({});
    const handleInputChange = (e) => {
        setPromotion({
            ...promotion,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (promotion.name.trim() === "") {
            toast.error("Promotion name is required");
        }
        if (!promotion.startDate) {
            toast.error("Start date is required");
        }
        if (!promotion.endDate) {
            toast.error("End date is required");
        }
        if (new Date(promotion.startDate) > new Date(promotion.endDate))
            toast.error("Start date must be before end date");
        if (!promotion.discountType) {
            toast.error("Discount type is required");
        }
        if (promotion.discountValue.trim() === "") {
            toast.error("Discount value is required");
        }
        if (
            promotion.discountType === "percentage" &&
            (promotion.discountValue < 0 || promotion.discountValue > 100)
        ) {
            toast.error("Discount value must be between 0 and 100");
        }

        if (
            promotion.discountType === "fixed amount" &&
            promotion.discountValue < 0
        ) {
            toast.error("Discount value must be greater than 0");
        }

        if (isNaN(promotion.discountValue)) {
            toast.error("Discount value must be a number");
        }

        promotion.promotionType = type;
        const response = await fetch(SUMMARY_API.addPromotion.url, {
            method: SUMMARY_API.addPromotion.method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(promotion),
        });

        const data = await response.json();
        if (data.success) {
            toast.success(data.message);
            onClose();
        } else {
            toast.error(data.message);
        }

        console.log(promotion);
    };
    return (
        <div>
            <Modal open={isOpen} onClose={onClose}>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: 600,
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        mx: "auto",
                        mt: 5,
                        maxHeight: "90vh",
                        overflowY: "auto",
                    }}
                >
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <Typography variant="h6" mb={2}>
                            Add New Promotion ({type})
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Promotion name"
                            variant="outlined"
                            name="name"
                            onChange={handleInputChange}
                        />
                        <div className="flex items-center gap-4">
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                className="h-[56px] px-4 border bg-transparent  border-slate-400 rounded-md text-md"
                                onChange={handleInputChange}
                            ></input>

                            <label htmlFor="endDate">End Date:</label>
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                className="h-[56px] px-4 border bg-transparent  border-slate-400 rounded-md text-md"
                                onChange={handleInputChange}
                            ></input>
                        </div>
                        <FormControl className="w-full">
                            <InputLabel id="discount-type">
                                Discount type
                            </InputLabel>
                            <Select
                                labelId="discount-type"
                                id="demo-simple-select"
                                label="Discount type"
                                name="discountType"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="percentage">
                                    Percentage
                                </MenuItem>
                                <MenuItem value="fixed amount">
                                    Fixed Amount
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            id="outlined-basic"
                            label="Discount value"
                            variant="outlined"
                            name="discountValue"
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            type="submit"
                        >
                            Add promotion
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAddPromotion;

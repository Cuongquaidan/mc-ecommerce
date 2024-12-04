import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ImageModalFullScreen from "../helpers/ImageModalFullScreen";
import uploadImage from "../helpers/uploadImage";
import { toast } from "react-toastify";
import SUMMARY_API from "../common";

function ModalEditProduct({ data, isEditing, onClose, fetchData }) {
    const [openImageModal, setOpenImageModal] = useState(false); // State for image modal
    const [selectedImage, setSelectedImage] = useState("");
    const [productEditing, setProductEditing] = useState(data);
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!productEditing.productName.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!productEditing.brandName.trim()) {
            toast.error("Brand name is required");
            return;
        }

        if (!productEditing.description.trim()) {
            toast.error("Description is required");
            return;
        }
        if (!productEditing.category) {
            toast.error("Category is required");
            return;
        }
        if (!productEditing.price || isNaN(productEditing.price)) {
            toast.error("Valid price is required");
            return;
        }
        if (!productEditing.selling || isNaN(productEditing.selling)) {
            toast.error("Valid selling is required");
            return;
        }
        console.log(productEditing);
        const response = await fetch(`${SUMMARY_API.updateProduct.url}`, {
            method: SUMMARY_API.updateProduct.method,
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(productEditing),
        });

        const result = response.json();
        if (result.error) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            await fetchData();
            onClose();
        }
    };

    const handleInputChange = (e) => {
        setProductEditing({
            ...productEditing,
            [e.target.name]: e.target.value,
        });
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageCloudinary = await uploadImage(file);

        setProductEditing((prev) => ({
            ...prev,
            productImages: [...prev.productImages, imageCloudinary.url],
        }));
    };
    const openImageInModal = (imgUrl) => {
        setSelectedImage(imgUrl);
        setOpenImageModal(true);
    };

    const closeImageModal = () => {
        setOpenImageModal(false);
        setSelectedImage("");
    };
    const handleRemoveImage = (index) => {
        setProductEditing((prev) => ({
            ...prev,
            productImages: prev.productImages.filter((_, i) => i !== index),
        }));
    };

    return (
        <div>
            <Modal open={isEditing} onClose={onClose}>
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
                    <form onSubmit={handleUpdateProduct}>
                        <Typography variant="h6" mb={2}>
                            Update Product
                        </Typography>
                        <TextField
                            label="Product Name"
                            name="productName"
                            fullWidth
                            value={productEditing.productName}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            label="Brand Name"
                            name="brandName"
                            fullWidth
                            value={productEditing.brandName}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            multiline
                            rows={3}
                            value={productEditing.description}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            border="1px dashed #ccc"
                            p={2}
                            mt={2}
                            width="100%"
                        >
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<FaCloudUploadAlt />}
                                sx={{ mb: 2 }}
                            >
                                Upload Images
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </Button>
                            <Box
                                display="flex"
                                gap={2}
                                flexWrap="wrap"
                                justifyContent="center"
                            >
                                {productEditing.productImages.map(
                                    (image, index) => (
                                        <Box
                                            key={index}
                                            position="relative"
                                            width={100}
                                            height={100}
                                            borderRadius={2}
                                            overflow="hidden"
                                            border="1px solid #ccc"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                                openImageInModal(image)
                                            } // Open image in modal
                                        >
                                            <img
                                                src={image}
                                                alt={`Product ${index}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            {/* Remove Image Button */}
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent the image click from opening the modal
                                                    handleRemoveImage(index);
                                                }}
                                                sx={{
                                                    position: "absolute",
                                                    top: 2,
                                                    right: 2,
                                                    color: "white",
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.5)",
                                                }}
                                            >
                                                <IoMdClose />
                                            </IconButton>
                                        </Box>
                                    )
                                )}
                            </Box>
                        </Box>
                        <TextField
                            select
                            label="Category"
                            name="category"
                            fullWidth
                            value={data.category}
                            onChange={handleInputChange}
                            margin="normal"
                        >
                            {productCategory.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    value={category.value}
                                >
                                    {category.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Price"
                            name="price"
                            fullWidth
                            value={data.price}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            label="Selling"
                            name="selling"
                            fullWidth
                            value={data.selling}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            type="submit"
                        >
                            Update Product
                        </Button>
                    </form>
                </Box>
            </Modal>
            {openImageModal && (
                <ImageModalFullScreen
                    imgUrl={selectedImage}
                    onClose={closeImageModal}
                />
            )}
        </div>
    );
}

export default ModalEditProduct;

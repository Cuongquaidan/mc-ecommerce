import React, { useEffect, useState } from "react";
import productCategory from "../helpers/productCategory";
import { MdModeEditOutline } from "react-icons/md";
import {
    Box,
    Button,
    Modal,
    TextField,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Paper,
    IconButton,
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ImageModalFullScreen from "../helpers/ImageModalFullScreen";
import uploadImage from "../helpers/uploadImage";
import { toast } from "react-toastify";
import SUMMARY_API from "../common";
import ModalEditProduct from "../components/ModalEditProduct";

const AllProducts = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false); // State for image modal
    const [selectedImage, setSelectedImage] = useState(""); // State to hold the image URL for full screen
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [productEditing, setProductEditing] = useState();
    const [newProduct, setNewProduct] = useState({
        productName: "",
        brandName: "",
        description: "",
        productImages: [],
        category: "",
        price: "",
        selling: "",
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageCloudinary = await uploadImage(file);

        setNewProduct((prev) => ({
            ...prev,
            productImages: [...prev.productImages, imageCloudinary.url],
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        console.log("click click");
        if (!newProduct.productName.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!newProduct.brandName.trim()) {
            toast.error("Brand name is required");
            return;
        }

        if (!newProduct.description.trim()) {
            toast.error("Description is required");
            return;
        }
        if (!newProduct.category) {
            toast.error("Category is required");
            return;
        }
        if (!newProduct.price || isNaN(newProduct.price)) {
            toast.error("Valid price is required");
            return;
        }
        if (!newProduct.selling || isNaN(newProduct.selling)) {
            toast.error("Valid selling is required");
            return;
        }
        console.log(newProduct);

        const response = await fetch(`${SUMMARY_API.addProduct.url}`, {
            method: SUMMARY_API.addProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newProduct),
        });

        const result = await response.json();
        if (result.error) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setNewProduct({
            productName: "",
            brandName: "",
            description: "",
            productImages: [],
            category: "",
            price: "",
            selling: "",
        });
        await handleGetAllProducts();
        handleCloseModal();
    };

    const handleRemoveImage = (index) => {
        setNewProduct((prev) => ({
            ...prev,
            productImages: prev.productImages.filter((_, i) => i !== index),
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

    const handleGetAllProducts = async () => {
        try {
            const response = await fetch(`${SUMMARY_API.getAllProducts.url}`);
            const result = await response.json();
            if (result.error) {
                toast.error(result.message);
                return;
            }
            setProducts(result.data);
        } catch (error) {
            toast.error(error.message || error);
        }
    };

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return (
        <Box p={3}>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h5" fontWeight="bold">
                    All Products
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenModal}
                >
                    Upload Product
                </Button>
            </Box>

            <Modal open={openModal} onClose={handleCloseModal}>
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
                    <form onSubmit={handleAddProduct}>
                        <Typography variant="h6" mb={2}>
                            Add Product
                        </Typography>
                        <TextField
                            label="Product Name"
                            name="productName"
                            fullWidth
                            value={newProduct.productName}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            label="Brand Name"
                            name="brandName"
                            fullWidth
                            value={newProduct.brandName}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            multiline
                            rows={3}
                            value={newProduct.description}
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
                                {newProduct.productImages.map(
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
                            value={newProduct.category}
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
                            value={newProduct.price}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            label="Selling"
                            name="selling"
                            fullWidth
                            value={newProduct.selling}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            type="submit"
                        >
                            Add Product
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Product Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="!font-bold !bg-blue-300">
                                STT
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Product Name
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Brand
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Category
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Price
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Selling
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Images
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Update
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.brandName}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.selling}</TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <img
                                                src={product.productImages[0]}
                                                alt={""}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    objectFit: "cover",
                                                }}
                                                onClick={() =>
                                                    openImageInModal(
                                                        product.productImages[0]
                                                    )
                                                }
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full cursor-pointer hover:bg-green-500">
                                            <MdModeEditOutline
                                                size={24}
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setProductEditing(product);
                                                    console.log(productEditing);
                                                }}
                                            />
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
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Image Modal */}
            {openImageModal && (
                <ImageModalFullScreen
                    imgUrl={selectedImage}
                    onClose={closeImageModal}
                />
            )}

            {productEditing && (
                <ModalEditProduct
                    isEditing={isEditing}
                    data={productEditing}
                    onClose={() => {
                        setIsEditing(false);
                        setProductEditing(null);
                    }}
                    fetchData={handleGetAllProducts}
                ></ModalEditProduct>
            )}
        </Box>
    );
};

export default AllProducts;

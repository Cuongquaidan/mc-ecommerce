import React, { useState } from "react";
import productCategory from "../helpers/productCategory";
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
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AllProducts = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        brandName: "",
        productDesc: "",
        productImage: null,
        productCategory: "",
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewProduct((prev) => ({
                    ...prev,
                    productImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = () => {
        setProducts((prev) => [...prev, newProduct]);
        setNewProduct({
            productName: "",
            brandName: "",
            productDesc: "",
            productImage: null,
            productCategory: "",
            price: "",
            selling: "",
        });
        handleCloseModal();
    };

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
                        width: "80%", // Tăng chiều rộng modal
                        maxWidth: 600, // Giới hạn tối đa chiều rộng
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        mx: "auto",
                        mt: 5,
                        maxHeight: "90vh", // Giới hạn chiều cao modal
                        overflowY: "auto", // Cuộn nội dung khi vượt chiều cao
                    }}
                    className="flex flex-col items-center"
                >
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
                        name="productDesc"
                        fullWidth
                        multiline
                        rows={3}
                        value={newProduct.productDesc}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px dashed #ccc"
                        p={2}
                        mt={2}
                        width="100%"
                        height={150} // Chiều cao cố định cho khung hình
                        position="relative"
                    >
                        <label
                            style={{
                                cursor: "pointer",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {newProduct.productImage ? (
                                <img
                                    src={newProduct.productImage}
                                    alt="Product"
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            ) : (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="100%"
                                    height="100%"
                                >
                                    <FaCloudUploadAlt size={40} />
                                    <Typography variant="caption">
                                        Click to upload
                                    </Typography>
                                </Box>
                            )}
                            {/* Input file luôn hiển thị */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{
                                    display: "none",
                                }}
                            />
                        </label>
                    </Box>
                    <TextField
                        select
                        label="Category"
                        name="productCategory"
                        fullWidth
                        value={newProduct.productCategory}
                        onChange={handleInputChange}
                        margin="normal"
                    >
                        {productCategory.map((category, index) => (
                            <MenuItem key={category.id} value={category.value}>
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
                        onClick={handleAddProduct}
                        sx={{ mt: 2, mx: "auto" }}
                    >
                        Add Product
                    </Button>
                </Box>
            </Modal>

            {/* Product Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className="!font-bold !bg-blue-300">
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
                                Image
                            </TableCell>
                            <TableCell className="!font-bold !bg-blue-300">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow
                                key={index}
                                className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-200"
                                }
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.brandName}</TableCell>
                                <TableCell>{product.productCategory}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.selling}</TableCell>
                                <TableCell>
                                    {product.productImage && (
                                        <img
                                            src={product.productImage}
                                            alt="Product"
                                            style={{ width: 50, height: 50 }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button color="primary" size="small">
                                        Update
                                    </Button>
                                    <Button
                                        color="error"
                                        size="small"
                                        sx={{ ml: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={1000}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default AllProducts;

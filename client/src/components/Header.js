import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Avatar, Button, Popover, TextField, Typography } from "@mui/material";
import SearchIcon from "../icons/SearchIcon";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SUMMARY_API from "../common";
import { toast } from "react-toastify";
import { setUserInfo } from "../store/userSlice";
function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const cartNum = useSelector((state) => state?.cart?.numOfProducts);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(SUMMARY_API.logout.url, {
                method: SUMMARY_API.logout.method,
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                navigate("/login");
                dispatch(setUserInfo(null));
            }
            if (result.error) {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleSearch = () => {
        if (search) {
            navigate(`/search?q=${search}`);
        } else {
            navigate(`/`);
        }
    };

    return (
        <header className="h-24 px-5 bg-white shadow-md">
            <div className="container flex items-center justify-between h-full mx-auto">
                <div className="">
                    <Logo></Logo>
                </div>
                <div className="items-center hidden gap-4 lg:flex">
                    <TextField
                        placeholder="Search product here..."
                        variant="outlined"
                        className="!min-w-[300px] !p-0"
                        InputProps={{
                            style: {
                                height: "40px",
                                padding: "10px",
                            },
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    ></TextField>
                    <Button
                        variant="contained"
                        className="!h-[40px] w-24"
                        onClick={handleSearch}
                    >
                        <SearchIcon></SearchIcon>
                    </Button>
                </div>
                <div className="flex items-center gap-5">
                    <div className="text-2xl cursor-pointer lg:text-3xl">
                        {user ? (
                            <>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    aria-describedby={id}
                                    onClick={handleClick}
                                ></Avatar>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>
                                        <Link to="admin-panel">
                                            Admin panel
                                        </Link>
                                    </Typography>
                                </Popover>
                            </>
                        ) : (
                            <FaRegUserCircle />
                        )}
                    </div>
                    <Link
                        to={"/cart"}
                        className="relative text-2xl cursor-pointer lg:text-3xl"
                    >
                        <FaShoppingCart />
                        <div className="absolute top-[-10px] right-[-10px] flex items-center justify-center w-5 h-5 p-1 text-white bg-red-500 rounded-full">
                            <p className="text-sm">{cartNum}</p>
                        </div>
                    </Link>
                    <div>
                        {user ? (
                            <Button
                                variant="contained"
                                className="!h-[40px] lg:w-32 w-28 !bg-red-600"
                                onClick={handleLogout}
                            >
                                Log out
                            </Button>
                        ) : (
                            <Link to={"/login"}>
                                <Button
                                    variant="contained"
                                    className="!h-[40px] w-24"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

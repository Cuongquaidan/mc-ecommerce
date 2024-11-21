import React from "react";
import Logo from "./Logo";
import { Button, Input, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "../icons/SearchIcon";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
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
                    ></TextField>
                    <Button variant="contained" className="!h-[40px] w-24">
                        <SearchIcon></SearchIcon>
                    </Button>
                </div>
                <div className="flex items-center gap-5">
                    <div className="text-2xl cursor-pointer lg:text-3xl">
                        <FaRegUserCircle />
                    </div>
                    <div className="relative text-2xl cursor-pointer lg:text-3xl">
                        <FaShoppingCart />
                        <div className="absolute top-[-10px] right-[-10px] flex items-center justify-center w-5 h-5 p-1 text-white bg-red-500 rounded-full">
                            <p className="text-sm">0</p>
                        </div>
                    </div>
                    <div>
                        <Link to={"/login"}>
                            <Button
                                variant="contained"
                                className="!h-[40px] w-24"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { FaMoneyBill } from "react-icons/fa";
function AdminPanel() {
    const user = useSelector((state) => state?.user?.user);
    const dataAside = [
        {
            title: "Dashboard",
            icon: <IoMdHome size={30} />,
            link: "/admin-panel",
        },
        {
            title: "All Users",
            icon: <FaUserFriends size={30} />,
            link: "/admin-panel/all-users",
        },
        {
            title: "All Products",
            icon: <AiFillProduct size={30} />,
            link: "/admin-panel/all-products",
        },
        {
            title: "All Promotions",
            icon: <BiSolidDiscount size={30} />,
            link: "/admin-panel/all-promotions",
        },
        {
            title: "All Orders",
            icon: <FaMoneyBill size={30} />,
            link: "/admin-panel/all-orders",
        },
    ];

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="min-h-[calc(100vh-180px)] md:grid grid-cols-[350px,1fr] ">
            <div className="p-2 shadow bg-slate-50 md:hidden">
                <Button onClick={toggleDrawer(true)} className="!text-black">
                    <FaBars size={30} />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 350, height: "100vh" }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                    >
                        <List className="flex flex-col h-full">
                            {dataAside.map((item, index) => (
                                <>
                                    <ListItem key={item.title} disablePadding>
                                        <Link to={item.link} className="w-full">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.title}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}

                            <ListItem className="flex items-center gap-5 mt-auto border">
                                <Avatar src={user?.avatar}></Avatar>
                                <div>
                                    <Typography
                                        variant="h3"
                                        fontSize={16}
                                        fontWeight={700}
                                    >
                                        {user?.name}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {user?.role}
                                    </Typography>
                                </div>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </div>
            <aside className="hidden w-full h-full bg-white border shadow-inner md:block">
                <List className="flex flex-col h-full">
                    {dataAside.map((item, index) => (
                        <>
                            <ListItem key={item.title} disablePadding>
                                <Link to={item.link} className="w-full">
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                    <ListItem className="flex items-center gap-5 mt-auto border-t bg-slate-100">
                        <Avatar src={user?.avatar}></Avatar>
                        <div>
                            <Typography
                                variant="h3"
                                fontSize={16}
                                fontWeight={700}
                            >
                                {user?.name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                className="text-slate-700"
                            >
                                {user?.role}
                            </Typography>
                        </div>
                    </ListItem>
                </List>
            </aside>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
}

export default AdminPanel;

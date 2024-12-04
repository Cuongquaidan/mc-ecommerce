import React from "react";
import { Box, IconButton } from "@mui/material";

function ImageModalFullScreen({ imgUrl, onClose }) {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    overflow: "hidden",
                }}
            >
                <img
                    src={imgUrl}
                    alt="Full Screen"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
                <div
                    onClick={onClose}
                    className="absolute flex items-center justify-center w-10 h-10 pb-2 text-2xl text-white bg-black bg-opacity-50 rounded-full cursor-pointer top-2 right-2"
                >
                    x
                </div>
            </Box>
        </Box>
    );
}

export default ImageModalFullScreen;

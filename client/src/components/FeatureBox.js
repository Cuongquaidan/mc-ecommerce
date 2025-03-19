import React from "react";

function FeatureBox({ icon, title, description, isVertical, isGrow }) {
    return (
        <div
            className="flex flex-col gap-4 p-6 bg-white border shadow-md rounded-2xl"
            style={{
                width: isVertical ? "100%" : "49%",
                flexGrow: isGrow ? 1 : 0,
            }}
        >
            <h3 className="text-sm font-semibold text-blue-500">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
            <div className="mt-auto ml-auto text-4xl text-gray-500">{icon}</div>
        </div>
    );
}

export default FeatureBox;

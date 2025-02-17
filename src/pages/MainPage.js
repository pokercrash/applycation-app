import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Main Page!</h1>
            <button
                onClick={() => navigate("/")}
                className="p-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default MainPage;

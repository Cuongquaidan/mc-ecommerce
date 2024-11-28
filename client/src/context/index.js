import { createContext, useContext, useEffect } from "react";
import SUMMARY_API from "../common";
import { toast } from "react-toastify";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const getUserInfo = async () => {
        try {
            const response = await fetch(SUMMARY_API.getInfo.url, {
                method: SUMMARY_API.getInfo.method,
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
            }
            if (result.error) {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <Context.Provider value={{ getUserInfo }}>{children}</Context.Provider>
    );
};

const useContextGlobal = () => {
    return useContext(Context);
};

export { useContextGlobal, ContextProvider };

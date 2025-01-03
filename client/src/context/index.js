import { createContext, useContext, useEffect } from "react";
import SUMMARY_API from "../common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userSlice";
import { setCart } from "../store/cartSlice";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const getUserInfo = async () => {
        try {
            const response = await fetch(SUMMARY_API.getInfo.url, {
                method: SUMMARY_API.getInfo.method,
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                dispatch(setUserInfo(result.data));
            }
            if (result.error) {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    const fetchGetCart = async () => {
        try {
            const response = await fetch(SUMMARY_API.getCart.url, {
                method: SUMMARY_API.getCart.method,
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) {
                dispatch(setCart(result.data));
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
        fetchGetCart();
    }, []);
    return (
        <Context.Provider value={{ getUserInfo, fetchGetCart }}>
            {children}
        </Context.Provider>
    );
};

const useContextGlobal = () => {
    return useContext(Context);
};

export { useContextGlobal, ContextProvider };

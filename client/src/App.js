import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import SUMMARY_API from "./common";
import { ContextProvider } from "./context";
function App() {
    return (
        <>
            <ContextProvider>
                <Header></Header>
                <ToastContainer></ToastContainer>
                <main className="min-h-[calc(100vh-200px)]">
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </ContextProvider>
        </>
    );
}

export default App;

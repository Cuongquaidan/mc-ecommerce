
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Suspense, useEffect } from "react";
import SUMMARY_API from "./common";
import { ContextProvider } from "./context";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
    return (
        <Suspense fallback="loading">
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <ContextProvider>
                <div className="dark:bg-neutral-900 dark:text-slate-300">
                <Header></Header>
                <ToastContainer></ToastContainer>
                <main className="min-h-[calc(100vh-200px)]">
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
                </div>
            </ContextProvider>
            </ThemeProvider>
        </Suspense>
    );
}

export default App;

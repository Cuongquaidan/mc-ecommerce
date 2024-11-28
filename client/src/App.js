import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
    return (
        <>
            <Header></Header>
            <ToastContainer></ToastContainer>
            <main className="min-h-[calc(100vh-200px)]">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
}

export default App;

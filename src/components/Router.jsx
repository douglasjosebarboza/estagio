import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Main from "../pages/main/Main";


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/main" element={ <Main />} />
        </Routes>
    </BrowserRouter>
)

export default Router
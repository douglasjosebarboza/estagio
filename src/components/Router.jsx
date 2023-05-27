import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/main" element={ <Main />} />
        </Routes>
    </BrowserRouter>
)

export default Router
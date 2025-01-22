import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProblemPage from "./pages/ProblemPage";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>
            
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpringProblemPage from "./pages/SpringProblem/SpringProblemPage";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/problem/:problemId" element={<SpringProblemPage/>}></Route>
            
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
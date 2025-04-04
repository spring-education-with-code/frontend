import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpringProblemPage from "./pages/SpringProblem/SpringProblemPage";
import SubmitListPage from "./pages/SubmitList/SubmitListPage";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/problem/:problemId" element={<SpringProblemPage/>}></Route>
                <Route path="/submit/:problemId" element={<SubmitListPage></SubmitListPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
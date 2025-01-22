import React from 'react';
import ProblemFooter from "../common/ProblemFooter";
import ProblemHeader from "../common/ProblemHeader";

const ProblemPage : React.FC = () => {
    return(
        <>
            <div className="d-flex flex-column vh-100">
                <ProblemHeader></ProblemHeader>
                <div className="flex-grow-1 bg-success p-2 text-dark bg-opacity-10">
                <h1>문제 풀어보기</h1>
                    <div className="d-flex gap-2 mt-3 h-100">
                        <div className="col-6" style={{backgroundColor: "rgba(0,0,255,0.1)" }}>
                            문제 내용
                        </div>
                        <div className="col-6" style={{backgroundColor: "rgba(0,0,255,0.1)" }}>
                            코드 작성 활활
                        </div>
                    </div>
                </div>
                <ProblemFooter></ProblemFooter>
            </div>
        </>
    )
}

export default ProblemPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemFooter from "../../common/ProblemFooter";
import ProblemHeader from "../../common/ProblemHeader";
import { useGetProblem } from "../../common/useGetProblem";

const SpringProblemPage : React.FC = () => {
    
    const { problemId } = useParams<{ problemId: string }>(); 

    const axiosParams = {
        url: `https://91be3bc2-5f71-4258-8286-b66990fcb0ef.mock.pstmn.io/problem/${problemId}`,
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const { response, error, loading } = useGetProblem(axiosParams);
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return(
        <>
            <div className="d-flex flex-column vh-100">
                <ProblemHeader></ProblemHeader>
                <div className="flex-grow-1 dark-navy p-2 bg-opacity-10">
                <h1>문제 풀어보기</h1>
                    <div className="d-flex gap-2 mt-3 h-100">
                        <div className="col-6">
                            <h2>문제 내용 </h2>
                            <h2> {response?.data?.concept?.[0]?.content} </h2>
                            <h2> 응? </h2>
                        </div>
                        <div className="col-6">
                            코드 작성 활활
                        </div>
                    </div>
                </div>
                <ProblemFooter></ProblemFooter>
            </div>
        </>
    )
}

export default SpringProblemPage;
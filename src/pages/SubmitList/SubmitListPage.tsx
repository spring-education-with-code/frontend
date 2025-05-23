import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProblemHeader from "../../common/ProblemHeader";

//API 응답 타입 정의

interface Submit{
    submitId: number;
    problemId: number;
    evaluation_progress : string;
    submit_date : string;
}

interface SubmitResponse{
    totalCount: number;
    totalPages: number;
    submits: Submit[];
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SubmitListPage : React.FC = () => {
    const { problemId } = useParams<{problemId:string}>();
    const apiUrl = SERVER_URL + "/api/problem/submit/" + problemId;
    const sseUrl = SERVER_URL + "/api/alarm/connect";

    const [submitData, setSubmitData] = useState<SubmitResponse>({ totalCount: 0, totalPages: 0, submits: [] });
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        if(problemId){
            //게시물 페이지 변경 시 새로운 제출 목록을 가져온다.
            axios.get(apiUrl + "?pageNum=" + currentPage, {
                headers: {
                    'Content-Type' : 'application/json'
            }
            })
            .then(response =>{
                setSubmitData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('/api/submit/ error', error)
            });
        }
    }, [currentPage]);

    useEffect(() => {
        if(problemId){
            //1. 페이지 로드 시 제출 목록을 가져온다
            axios.get(apiUrl,{
                headers: {
                    'Content-Type' : 'application/json'
            }
            })
            .then(response =>{
                setSubmitData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('/api/submit/ error', error)
            });

            //2-1. sse 연결 설정
            const eventSource = new EventSource(sseUrl)

            //2-2. sse 메세지 수신 시 동작
            eventSource.onmessage = (event) => {
                try{
                    //data의 형태 : 
                    const data = JSON.parse(event.data);
                    console.log("채점결과 sse 이벤트 도착", data);
                    
                    setSubmitData((prevState) =>({
                        ...prevState,    
                        submits: prevState.submits.map(item =>
                                    item.submitId == data.submitId
                                        ? {...item, evaluation_progress: data.evaluation_progress}
                                        : item
                        )
                    }));
                    
                }catch(error){
                    console.error('sse error - submit 조회', error);
                }
            }

            //3. 창이 닫히거나 이동 하면 sse 연결은 종료됨.
            return () => {
                if (eventSource) {
                    console.log('SSE connection closed');
                    eventSource.close();
                }
            };
        }
    },[problemId]);

    

    const pages = Array.from({ length: submitData.totalPages }, (_, index) => index + 1);

    return(
        <>
        <ProblemHeader></ProblemHeader>
        <div className="main-container flex-grow-1 dark-navy p-2 bg-opacity-10">
            <h1>제출 내역</h1>
            <table className="table table-secondary">
                <thead>
                    <tr>
                        <th>제출 번호</th>
                        <th>문제 번호</th>
                        <th>결과</th>
                        <th>제출 시각</th>
                    </tr>
                </thead>
                <tbody>
                    {submitData?.submits?.map(item => (
                        <tr key={item.submitId}>
                            <td>{item.submitId}</td>
                            <td>{item.problemId}</td>
                            <td>{item.evaluation_progress}</td>
                            <td>{item.submit_date}</td>               
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>이전 페이지</a>
                    </li>
                    {pages.map(page => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <a className="page-link" onClick={() => setCurrentPage(page)}>{page}</a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === submitData.totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => currentPage < submitData.totalPages && setCurrentPage(currentPage + 1)}>다음 페이지</a>
                    </li>
                </ul>
            </nav>
        </div>

        </>
    )
}

export default SubmitListPage;
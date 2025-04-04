import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProblemHeader from "../../common/ProblemHeader";

//API 응답 타입 정의
/*
{
	"totalCount" : number,
	{
		"submitId" : number,
		"problemId" : number,
		"result" : string
	},
	....
}
*/

interface Submit{
    submitId: number;
    problemId: number;
    evaluation_progress : string;
    submit_date : string;
}

interface SubmitResponse{
    totalCount: number;
    submits: Submit[];
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SubmitListPage : React.FC = () => {
    const { problemId } = useParams<{problemId:string}>();
    const apiUrl = SERVER_URL + "/api/problem/submit/" + problemId;
    const sseUrl = SERVER_URL + "/api/alarm/connect";

    const [submitData, setSubmitData] = useState<SubmitResponse>({ totalCount: 0, submits: [] });

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

    return(
        <>
        <ProblemHeader></ProblemHeader>
        <div className="flex-grow-1 dark-navy p-2 bg-opacity-10">
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
        </div>

        </>
    )
}

export default SubmitListPage;
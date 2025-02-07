import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemFooter from "../../common/ProblemFooter";
import ProblemHeader from "../../common/ProblemHeader";
import { useGetProblem } from "../../common/useGetProblem";
import { SolutionContent } from "./SolutionContent";

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
                <h1>스프링을 시작해 보아요</h1>
                    <div className="d-flex gap-2 mt-3 h-100">
                        <div className="col-6">
                            <h2>hello world! 출력하는 api 만들어 보기 </h2>
                            <p> 스프링 부트(Spring Boot)는 자바(Java) 기반의 강력한 프레임워크로, 간단한 설정과 빠른 개발 환경을 제공합니다. 
                                이번 예제에서는 스프링 부트를 활용하여 간단한 "Hello World!" 메시지를 출력하는 API를 만들어보겠습니다. 
                                이를 통해 스프링 부트의 기본적인 동작 방식을 이해하고, RESTful API를 설계하는 과정을 경험해볼 수 있습니다.
                                이후 @RestController와 @GetMapping 어노테이션을 활용해 API 엔드포인트를 정의합니다. 
                                예를 들어, /hello라는 경로로 GET 요청이 오면 "Hello World!"라는 문자열을 반환하도록 구현할 수 있습니다. 
                                애플리케이션을 실행한 뒤 브라우저에서 http://localhost:8080/hello에 접속하면 결과를 확인할 수 있습니다. 
                                이처럼 간단한 API를 만들며 스프링 부트의 기본 구조와 동작 방식을 이해할 수 있고, 이를 기반으로 점점 더 복잡한 기능을 추가해 나갈 수 있습니다.</p>
                            <p> {response?.data?.concept?.[0]?.content} </p>
                        </div>
                        <div className="col-6">
                            <SolutionContent></SolutionContent>
                        </div>
                    </div>
                </div>
                <ProblemFooter></ProblemFooter>
            </div>
        </>
    )
}

export default SpringProblemPage;
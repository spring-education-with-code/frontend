import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProblemFooter from "../../common/ProblemFooter";
import ProblemHeader from "../../common/ProblemHeader";
import { SolutionContent } from "./SolutionContent";
import { ProblemContent } from "./ProblemContent";

const SERVER_URL = import.meta.env.VITE_SERVER_URL + "/api/problem/spring/";

const SpringProblemPage : React.FC = () => {
    
    const { problemId } = useParams<{ problemId: string }>();
    const navigate = useNavigate(); // 리다이렉트용

    type Editors = {
        controller : string,
        service : string
    }
    //상태 끌어올리기(lift up) - 코드 제출을 위해서
    //훅을 위에 둬야한다. 아래에 두면 Uncaught Error: Rendered more hooks than during the previous render. 가 발생 한다  
    const [codeEditors, setCodeEditors] = useState<Editors>({
        controller: "package com.spring_education.template.controller;\n\n//Controller.java 코드를 작성해 주세요\n",
        service: "package com.spring_education.template.service;\n\n//Service.java 코드를 작성해 주세요\n"
    });


    const springCodeSubmit = () => {
        const payload = { ...codeEditors };

        //console.log('payload 내용 : ', payload);
        axios.post(`${SERVER_URL}${problemId}`, payload,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            navigate("/submit/" + problemId);
        })
        .catch(error => {
            console.error('코드 제출 에러', error);
        })
    }

    return(
        <>
            <div className="d-flex flex-column vh-100">
                <ProblemHeader></ProblemHeader>
                <div className="flex-grow-1 dark-navy p-2 bg-opacity-10 d-flex flex-column overflow-hidden">
                <h1>스프링을 시작해 보아요</h1>
                    <div className="d-flex gap-2 mt-3 flex-grow-1 overflow-hidden">
                        <div className="col-6 overflow-auto h-100">
                            <ProblemContent problemId={problemId}></ProblemContent>
                        </div>
                        <div className="col-6">
                            <SolutionContent codeEditors={codeEditors} setCodeEditors={setCodeEditors}></SolutionContent>
                        </div>
                    </div>
                </div>

                <ProblemFooter onSubmit={springCodeSubmit}></ProblemFooter>
            </div>
        </>
    )
}

export default SpringProblemPage;
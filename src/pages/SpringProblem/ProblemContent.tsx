import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface Content{
    content_type : string;
    content : string;
}

interface Constraint{
    constraint_text : string;
}

interface Example{
    input_example : string;
    output_example : string;
    description : string;
}

interface Problem{
    title: string;
    level : string;
    content_length : number;
    content : Content[];
    constraint_length : number;
    constraint: Constraint[];
    example_length : number;
    example: Example[];
}

export const ProblemContent = ({ problemId } : { problemId?: string }) =>{

    const [ problemData, setProblemData ] = useState<Problem>(); 

    const GET_PROBLEM_API = import.meta.env.VITE_SERVER_URL + "/api/problem/" + problemId;
    useEffect(() =>{
        axios.get(GET_PROBLEM_API)
        .then(response =>{
            setProblemData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('/api/problem/ error', error);
        })
    }, []);


    return(
        <>
            <h1>{problemData?.title}</h1>
            <p> 난이도 : {problemData?.level}</p>

            <h3>문제 설명</h3>
            {problemData?.content.map((item, index) => {
                if(item.content_type == 'text'){
                    return (
                        <div key={"content" + index}>
                            {item.content}
                        </div>
                    )
                }
            })}

            
            <h3>제약 사항</h3>
            {problemData?.constraint.map((item, index) => {
                return(
                    <li key={"constraint"+index}> {item.constraint_text}</li>
                )
            })
            }

            <h3>입출력 예시</h3>

            <table className="table table-secondary">
                <thead>
                    <tr>
                        <th>입력</th>
                        <th>출력</th>
                    </tr>
                </thead>

                <tbody>
                    {problemData?.example.map((item, index) => {
                        return(
                            <tr key = {"example" + index}>
                                <td>{item.input_example}</td>
                                <td>{item.output_example}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h3> 입출력 설명 </h3>

            {problemData?.example.map((item, index) => {
                return(
                    <div key={"description" + index}>
                        입출력 예시 {index}
                        <li>{item.description}</li>
                    </div>
                )
            })}




        </>
    )


}
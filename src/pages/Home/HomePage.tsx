import {useState, useEffect} from "react";
import axios from "axios";


interface Problem{
    problemId: number;
    title : string;
    level : string;
}

interface Problems{
    problems: Problem[];
}

export const HomePage = () => {

    const apiUrl = import.meta.env.VITE_SERVER_URL + "/api/problem/all";
    const [pageInfo, setPageInfo] = useState<Problems>();

    useEffect(() => {
        //게시물 페이지 변경 시 새로운 제출 목록을 가져온다.
        axios.get(apiUrl)
        .then(response =>{
            setPageInfo(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('/api/submit/ error', error)
        });
    }, []);


    return(
        <>
        <div className="main-container flex-grow-1 dark-navy p-2 bg-opacity-10">
            <h1>서버씨 홈</h1>
            <h2>문제 목록</h2>
            <table className="table table-secondary">
                <thead>
                    <tr>
                        <th>문제 이름</th>
                        <th>난이도</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo?.problems?.map(item => (
                        <tr key={item.problemId}>
                            <td>
                                <a href={`http://localhost:5173/problem/${item.problemId}`}>
                                    {item.title}
                                </a>
                            </td>
                            <td>{item.level}</td>           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


        </>
    )
}
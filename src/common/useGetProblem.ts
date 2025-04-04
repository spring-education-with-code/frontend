import { useState, useEffect } from 'react';
import axios, { AxiosError, RawAxiosRequestConfig, AxiosResponse } from 'axios';

interface ConceptItem{
    type: string;
    content: string;
}
interface GetProblemResponseType{
    concept: ConceptItem[];

}

export const useGetProblem = (axiosParams: RawAxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse<GetProblemResponseType>| null>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(true);
  
    const fetchData = async (params: RawAxiosRequestConfig) => {
        await axios.request(params)
                .then(response => {
                    setResponse(response);
                })
                .catch(error => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        console.log(response);
     };


	useEffect(() => {
        fetchData(axiosParams);
    },[]);

    return { response, error, loading };
}
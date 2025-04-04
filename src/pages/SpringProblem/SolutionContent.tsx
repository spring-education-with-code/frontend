import {useState, Dispatch, SetStateAction} from "react";
import MonacoEditor from 'react-monaco-editor';

//EditorTabs에는 controller, service 만 들어갈 수 있음 
type EditorTabs = 'controller' | 'service';

type Editors = {
    controller : string,
    service : string
}

interface SolutionContentProps {
    codeEditors: Editors;
    setCodeEditors: Dispatch<SetStateAction<Editors>>;
}


export const SolutionContent = ({codeEditors , setCodeEditors}: SolutionContentProps) => {

    //activeTab 변수 . 참고로 setActiveTab 과 같이 set ~~ 하는 것은 관례라고 합니다 
    const [activeTab, setActiveTab] = useState<EditorTabs>("controller");

    const onChange = (newValue: string) => {
        setCodeEditors(() => ({
            ...codeEditors,
            [activeTab] : newValue
        }))
    }

    return (
        <>
        <MonacoEditor
            height='75%' 
            width='90%'
            language="java"
            theme="vs-dark"
            value={codeEditors[activeTab]}
            onChange={onChange}></MonacoEditor>
        <button onClick = {()=>setActiveTab("controller")}>
        Controller.java
        </button>
        <button onClick = {()=>setActiveTab("service")}>
        Service.java
        </button>
        </>
    )
}
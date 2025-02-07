import {useState} from "react";
import MonacoEditor from 'react-monaco-editor';

//EditorTabs에는 controller, service 만 들어갈 수 있음 
type EditorTabs = 'controller_editor' | 'service_editor';
type Editors = {
    controller_editor : string,
    service_editor : string
}

export const SolutionContent = () => {

    //activeTab 변수 . 참고로 setActiveTab 과 같이 set ~~ 하는 것은 관례라고 합니다 
    const [activeTab, setActiveTab] = useState<EditorTabs>("controller_editor");
    const [codeEditors, setCodeEditors] = useState<Editors>({
        controller_editor : "package com.spring_education.template.controller;\n\n//Controller.java 코드를 작성해 주세요\n",
        service_editor : "package com.spring_education.template.service;\n\n//Service.java 코드를 작성해 주세요\n"
    });

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
        <button onClick = {()=>setActiveTab("controller_editor")}>
        Controller.java
        </button>
        <button onClick = {()=>setActiveTab("service_editor")}>
        Service.java
        </button>
        </>
    )
}
interface ProblemFooterProps{
    onSubmit: () => void;
}

const ProblemFooter = ({ onSubmit } : ProblemFooterProps) => {
    return(
        <>
        <div style={{position: "fixed", bottom: "10px", right: "30px"}}>
            <button onClick={onSubmit} style={{backgroundColor: "firebrick", width: "90px", height: "45px", color: "white", fontSize: "1.2rem"}}> 
                제출
            </button>
        </div>
        </>
    )
}

export default ProblemFooter;
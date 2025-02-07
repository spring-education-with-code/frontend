
const ProblemHeader = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg light-black navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">서버씨</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active" href="#">홈</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href="#">게시판</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>

            
        </>
    )
}

export default ProblemHeader;
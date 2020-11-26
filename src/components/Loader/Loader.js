import React from "react";

const Loader = () => {
    return (
        <>
            <div className="spinner-border" style={{width: "3rem", height: "3rem", role: "status"}}>
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" style={{width: "3rem", height: "3rem", role: "status"}}>
                <span className="sr-only"> Loading... </span>
            </div>
        </>
    )
};

export default Loader;
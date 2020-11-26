import React from "react";
import './Loader.css';

const Loader = () => {
    return (
        <div className="Loader">
            <div className="spinner-border" style={{width: "3rem", height: "3rem", role: "status"}}>
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" style={{width: "3rem", height: "3rem", role: "status"}}>
                <span className="sr-only"> Loading... </span>
            </div>
        </div>
    )
};

export default Loader;
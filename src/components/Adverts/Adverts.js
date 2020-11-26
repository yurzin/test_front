import React from 'react';
import {NavLink} from 'react-router-dom'

const Adverts = props => {
    let disable = props.isSelected === null;

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-12 mt-3 mb-3 d-flex justify-content-between">
                <h2 className="block">ПОДАТЬ ОБЪЯВЛЕНИЯ</h2>
                <NavLink to="/">
                <button className="btn btn-primary">посмотреть объявление</button>
                </NavLink>
            </div>
            <div className={`col-8 mt-3 mb-3 d-flex justify-content-between p-3 border border-${props.danger}`}>
                <input type="file" id="fileSelect" accept=".csv" name="file" onChange={props.fileSelect}/>
                <label style={{color: "red", fontWeight: "bolder", margin: 0}} htmlFor="fileSelect">{props.msg}</label>
                <button onClick={props.fileUpload} disabled={disable}>Upload</button>
            </div>
        </div>
    )
};

export default Adverts;
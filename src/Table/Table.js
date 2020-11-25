import React from "react";
import {NavLink} from 'react-router-dom'

export default ({data, onclick}) => {
    return (
        <div className="row">
            <div className="col-12 mt-3 mb-3 d-flex justify-content-between">
                <h2 className="block">ОБЪЯВЛЕНИЯ</h2>
                <button className="btn btn-danger" onClick={onclick}>подать объявление</button>
            </div>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th style={{width: "200px"}}>Дата : Время</th>
                    <th>Текст</th>
                    <th>Контакты</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item =>
                    <tr key={item.id} className="rowTable">
                        <td>{item.date}</td>
                        <td>{item.text}</td>
                        <td>{item.contacts}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
};
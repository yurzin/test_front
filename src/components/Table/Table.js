import React, {Component} from "react";
import {NavLink} from 'react-router-dom'
import axios from "axios";
import _ from "lodash";
import Paginate from "../Paginate/Paginate";
import Loader from "../Loader/Loader";

class Table extends Component {
    state = {
        data: [],
        currentPage: 0
    };

    componentDidMount() {
        axios
            .get('http://test.local/data/adverts/api/index.php')
            .then(response => {
                this.setState({data: response.data});
            });
    }

    handleChangePage = ({selected}) => {
        this.setState({currentPage: selected})
    };

    render() {
        let numberOfRecords;
        let pageCount = 1;
        let displayData = [];
        if (this.state.data.length !== 0) {
            numberOfRecords = this.state.data.length;
            pageCount = Math.ceil(numberOfRecords / 50);
            displayData = [..._.chunk(this.state.data, 50)[this.state.currentPage]];
        }
        return (
            <div className="row  d-flex justify-content-center">
                <div className="col-12 mt-3 mb-3 d-flex justify-content-between">
                    <h2 className="block">ОБЪЯВЛЕНИЯ</h2>
                    <NavLink to="/add">
                        <button className="btn btn-danger">подать объявление</button>
                    </NavLink>
                </div>
                {displayData.length === 0
                    ?
                    <Loader/>
                    :
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th style={{width: "200px"}}>Дата : Время</th>
                            <th>Текст</th>
                            <th>Контакты</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayData.map(({id, date, text, contacts}) =>
                            <tr key={id} className="rowTable">
                                <td>{date}</td>
                                <td>{text}</td>
                                <td>{contacts}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {numberOfRecords > 50
                    ? <Paginate
                        pageCount={pageCount}
                        handleChangePage={this.handleChangePage}
                    />
                    : null
                }
            </div>
        )
    }
}

export default Table;
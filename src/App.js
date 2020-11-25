import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {NavLink} from 'react-router-dom'
import _ from 'lodash';
import axios from 'axios';
import Table from "./Table/Table";
import Adverts from "./Adverts/Adverts";

class App extends Component {
    state = {
        data: [],
        selectedFile: null,
        show: true,
        currentPage: 0,
        danger: "danger",
        msg: ""
    };

    componentDidMount() {
        axios
            .get('http://test.local/data/adverts/api/index.php')
            .then(response => {
                this.setState({data: response.data});
            });
    }

    fileSelect = event => {
        console.log(event.target.files);
        if (event.target.files[0] && (event.target.files[0]['name'].indexOf("csv") !== -1)) {
            this.setState({selectedFile: event.target.files[0], danger: "success", msg: ""});
        } else {
            this.setState({selectedFile: null, danger: "danger", msg: "Выберите файл с расширением csv"});
            return null
        }
    };

    fileUpload = () => {
        if (this.state.selectedFile.type === "application/vnd.ms-excel") {
            const fd = new FormData();
            fd.append('csv', this.state.selectedFile, this.state.selectedFile.name);
            axios
                .post('http://test.local/data/adverts/api/post_data.php', fd)
                .then(res => console.log(res));
            this.setState({selectedFile: null})
        } else {
            return null
        }
    };

    handleChangePage = ({selected}) => {
        this.setState({currentPage: selected})
    };

    handleShow = () => {
        this.setState({show: !this.state.show})
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
            <div className="container">
                {this.state.show
                    ? <Table
                        data={displayData}
                        onclick={this.handleShow}
                    />
                    :
                    <Adverts
                        onclick={this.handleShow}
                        danger={this.state.danger}
                        msg={this.state.msg}
                        fileSelect={this.fileSelect}
                        fileUpload={this.fileUpload}
                        isSelected={this.state.selectedFile}
                    />
                }
                {(numberOfRecords > 50 && this.state.show)
                    ?
                    <div className="row d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handleChangePage}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            nextClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                        />
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default App;
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import _ from 'lodash';
import axios from 'axios';
import Table from "./components/Table/Table";
import Adverts from "./components/Adverts/Adverts";

class App extends Component {
    state = {
        data: [],
        selectedFile: null,
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
                <Switch>
                <Route path="/add"><Table data={displayData} onclick={this.handleShow} />
                    <Adverts
                        danger={this.state.danger}
                        msg={this.state.msg}
                        fileSelect={this.fileSelect}
                        fileUpload={this.fileUpload}
                        isSelected={this.state.selectedFile}
                    />
                </Route>
                <Route path="/"> <Table data={displayData} /> </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
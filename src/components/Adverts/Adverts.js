import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import axios from "axios";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import './Adverts.css';

class Adverts extends Component {

    state = {
        selectedFile: null,
        disabled: false,
        danger: "danger",
        msg: "",
        showLoader: false
    };

    fileSelect = event => {
        if (event.target.files[0] && (event.target.files[0]['name'].indexOf("csv") !== -1)) {
            this.setState({selectedFile: event.target.files[0], danger: "success", msg: "Вы выбрали правильный файл"});
        } else {
            this.setState({selectedFile: null, danger: "danger", msg: "Выберите файл с расширением csv"});
            return null
        }
    };

    showMessage = msg => {
        return (<Modal msg={msg} />)
    };

    fileUpload = () => {
        this.setState({showLoader: true});
        if (this.state.selectedFile.type === "application/vnd.ms-excel") {
            const fd = new FormData();
            fd.append('csv', this.state.selectedFile, this.state.selectedFile.name);
            axios
                .post('http://test.local/data/adverts/api/post_data.php', fd)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            showLoader: false,
                            msg: "Файл загружен",
                            selectedFile: null
                        });
                        this.showMessage("Файл загружен");
                    }
                });
        } else {
            return null
        }
    };

    render() {
        let disable = this.state.selectedFile === null;
        let style;
        if (this.state.danger === "danger") {
            style = "error"
        } else {
            style = "success"
        }
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-12 mt-3 mb-3 d-flex justify-content-between">
                    <h2 className="block">ПОДАТЬ ОБЪЯВЛЕНИЯ</h2>
                    <NavLink to="/">
                        <button className="btn btn-primary">посмотреть объявление</button>
                    </NavLink>
                </div>
                <form
                    className={`col-8 mt-3 mb-3 d-flex justify-content-between p-3 border border-${this.state.danger}`}>
                    <input type="file" id="fileSelect" accept=".csv" name="file" onChange={this.fileSelect}/>
                    <label className={style} htmlFor="fileSelect">{this.state.msg}</label>
                    <button onClick={this.fileUpload} disabled={disable}>Upload</button>
                </form>
                {this.state.showLoader ? <Loader/> : null}
            </div>
        )
    };
}

export default Adverts;
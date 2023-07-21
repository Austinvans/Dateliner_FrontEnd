import React, { Component } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';

class Entreprise extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">YowYob</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-5">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                        <li className="breadcrumb-item active"><a href="/about">Entreprise </a></li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">   
                            </div>
                        </div> 
                    </section> 
                </div>
            </div>
        );
    }
}

export default Entreprise;
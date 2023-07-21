import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import { DateTimePicker } from "react-tempusdominus-bootstrap";

import moment from 'moment';
import Header from '../components/Header';
import Menu from '../components/Menu';
import CustomerService from '../services/CustomerService';


class Customer extends Component {
    constructor(props){
        super(props);
        this.state ={   
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            updated: false,
            searchId:"",
            
            //customer
            name:"",
            surname:"",
            tel:"",
            email:"",

            //check inputs  
            submitted: false,
            valid_name: false,
            valid_surname: false,
            valid_tel: false,
            valid_email: false,

        }

        this.can_submit = this.can_submit.bind(this);
        this.save_customer = this.save_customer.bind(this);
        this.update_customer = this.update_customer.bind(this);
    }

    
    // chargement des données
    componentDidMount(){
        
        CustomerService.getAll()
        .then(response => { 
            this.setState({customers: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });
    }

    setActiveCustomer(customer, index){
        let that = this;
        that.state.currentCustomer = customer;
        that.state.currentIndex = index ;   
    }

    can_submit(){
        let that = this;
        let flag = that.state.valid_name && that.state.valid_surname && that.state.valid_tel && that.state.valid_email;
        this.setState({ submitted: true});
        return flag;
        
    }
    save_customer(){
        let that = this;
        let data = {
            name: that.state.name,
            customer_surname: that.state.surname,
            customer_tel: that.state.tel,
            customer_email: that.state.email,
        }
        CustomerService.create(data)
        .then(response => { 
            this.setState({timeliner: response.data.id});
            console.log(response.data)    
        })
        .catch(e =>{
            console.log(e);
        });
    }

    update_customer(id){
        let that = this;
        let data = {
            name: that.state.name,
            customer_surname: that.state.surname,
            customer_tel: that.state.tel,
            customer_email: that.state.email,
        }
        CustomerService.update(id, data)
        .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    find_customer(name){
        CustomerService.findByName(name)
      .then(response => {
        this.setState({currentCustomer : response.data});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    delete_customer(id){
        CustomerService.remove(id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  render() {
    return (
    <div>
        <Header/>
        <Menu/>
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Customer</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-5">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                        <li className="breadcrumb-item active"><a href="/customers">Customers </a></li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                        <br/><br/>
                    </div>
                    
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row"> 
                        
                                <section className="col-lg-11 connectedSortable"> 
                                    {/* /.row start table Customers */}
                                    <div className="row">
                                    <div className="col-12">
                                        <div className="card card-secondary">
                                        <div className="card-header">
                                            <h3 className="card-title"> Customers </h3>
                                            <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{width: 300}}>
                                                <input 
                                                    type="text" 
                                                    name="table_search" 
                                                    className="form-control float-right" 
                                                    placeholder="Search By Name" 
                                                    //value={searchId}
                                                    onChange={(e) =>{
                                                            this.setState({searchId: e.target.value, valid_name: true})  
                                                    }}
                                                />
                                                <div className="input-group-append">
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-default"
                                                        onClick={(e)=>{
                                                            this.find_customer(this.state.searchId)
                                                            this.setState({modal5: true})
                                                        }}
                                                    >
                                                        <i className="fas fa-search" />
                                                    </button>&nbsp;&nbsp;
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-success"
                                                        onClick={(e) =>{  
                                                            this.setState({modal: true})     
                                                        }} 
                                                    >
                                                        ADD
                                                    </button>&nbsp;&nbsp;
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body table-responsive p-0" style={{height: 300}}>
                                            <table className="table table-head-fixed table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                {/*<th>ID</th>*/}
                                                <th>Name</th>
                                                <th>Surname</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            {
                                                this.state.customers.map((customer, index) => (
                                                    <tr 
                                                        className={(index === this.state.currentIndex ? "Active" : "" )}
                                                        onClick={() => this.setActiveCustomer(customer, index)}
                                                        key={index}
                                                    >
                                                        {/*<td>{customer.customer_id}</td> */}  
                                                        <td>{customer.name}</td> 
                                                        <td>{customer.customer_surname}</td> 
                                                        <td>{customer.customer_tel}</td>   
                                                        <td>{customer.customer_email}</td> 
                                                        
                                                        <td> 
                                                            <a className="" onClick={(e) =>{  this.setState({modal1: true});}} >
                                                                <i className="nav-icon fas fa-edit" />
                                                            </a> &nbsp; &nbsp;
                                                            <a className="" onClick={(e) =>{  this.setState({modal3: true}) }}>
                                                                <i className="nav-icon fas fa-trash-alt" />
                                                            </a>  
                                                        </td> 
                                                    {/*<td><span className="tag tag-warning">Pending</span></td>*/}  
                                                    </tr>  
                                                ))                  
                                            }   
                                            </tbody>
                                            </table>
                                        </div>
                                        {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                                    </div>
                                {/* /.row end table dateliners */}  
                                    <div className="col-md-12">
                                    {/* Horizontal Form Modal add customer */}
                                        <Modal
                                            show={this.state.modal}
                                            onHide={(e)=>{this.setState({modal: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title> Add Customer </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form className="form-horizontal">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="name" className="col-sm-2 col-form-label">Name </label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Customer Name"
                                                                    onChange={(e) =>{
                                                                        if(e.target.value){
                                                                            this.setState({name: e.target.value, valid_name: true})
                                                                        }
                                                                        else{
                                                                            this.setState({name: e.target.value, valid_name: false})
                                                                        }
                                                                    }}
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_name?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the name
                                                                    </text>:
                                                                    <></>
                                                                } 
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="surname" className="col-sm-2 col-form-label">Surname</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="surname"
                                                                    onChange={(e) =>{
                                                                        if(e.target.value){
                                                                            this.setState({surname: e.target.value, valid_surname: true})
                                                                        }
                                                                        else{
                                                                            this.setState({surname: e.target.value, valid_surname: false})
                                                                        }
                                                                    }}
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_surname?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the surname
                                                                    </text>:
                                                                    <></>
                                                                } 
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="tel" className="col-sm-2 col-form-label">Phone N°</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                type="text" 
                                                                    className="form-control" 
                                                                    id="tel" 
                                                                    placeholder="phone number" 
                                                                    onChange={(e) =>{
                                                                        this.setState({tel: e.target.value})
                                                                        if (e.target.value){
                                                                            this.setState({valid_tel: true})
                                                                        }
                                                                        else{
                                                                            this.setState({valid_tel:false})
                                                                        }
                                                                    }}
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_tel?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the phone number
                                                                    </text>:
                                                                    <></>
                                                                } 
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="email" 
                                                                        className="form-control" 
                                                                        id="email" 
                                                                        placeholder="email" 
                                                                        onChange={(e) =>{
                                                                            this.setState({email: e.target.value})
                                                                            if (e.target.value){
                                                                                this.setState({valid_email: true})
                                                                            }
                                                                            else{
                                                                                this.setState({valid_email:false})
                                                                            }
                                                                        }}
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_email?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the email
                                                                    </text>:
                                                                    <></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>{/* /.card-body */}
                                                    <div className="card-footer">
                                                        <Button
                                                            className="btn btn-primary"
                                                            onClick={(e) =>{  
                                                                if(this.can_submit()){
                                                                    this.setState({modal2: true})
                                                                }else {
                                                                    this.setState({modal2: false})
                                                                }
                                                            }}  
                                                        >
                                                            Add
                                                        </Button>
                                                        <button 
                                                            type="reset" 
                                                            className="btn btn-default float-right"
                                                            onClick={(e) =>{  
                                                                this.setState({modal: false})
                                                            }} 
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>{/* /.card-footer */}
                                                </form>
                                            </Modal.Body>
                                            
                                        </Modal>
                                        {/* Horizontal Form Modal add customer confirmation*/}
                                        <Modal
                                            show={this.state.modal2}
                                            onHide={(e)=>{this.setState({modal2: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation</Modal.Title>
                                            </Modal.Header>
                                            <>                
                                                <Modal.Body>
                                                    Add Customer ?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal2: false})}}>
                                                        Annuler
                                                    </Button>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                        this.save_customer();
                                                        this.setState({modal2: false});
                                                        this.setState({modal: false});
                                                        
                                                                        
                                                        }
                                                        }
                                                    >
                                                        Ok
                                                    </Button>
                                                </Modal.Footer>
                                            </>
                                        </Modal>
                                        
                                        

                                        
                                        {this.state.currentCustomer ? (
                                            <>  
                                                {/* Horizontal Form Modal edit customer*/}
                                                <Modal
                                                    show={this.state.modal1}
                                                    onHide={(e)=>{this.setState({modal1: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edit Customer</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className="form-horizontal">
                                                            <div className="card-body">
                                                                <div className="form-group row">
                                                                    <label htmlFor="name" className="col-sm-2 col-form-label">Name </label>
                                                                    <div className="col-sm-10">
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            Value={this.state.currentCustomer.name}
                                                                            onChange={(e) =>{
                                                                                if(e.target.value){
                                                                                    this.setState({name: e.target.value, valid_name: true})
                                                                                }
                                                                                else{
                                                                                    this.setState({name: this.state.currentCustomer.name, valid_name: true})
                                                                                }
                                                                            }}
                                                                        />
                                                                        { /*verif des données
                                                                            this.state.submitted && !this.state.valid_name?
                                                                            <text className="text-danger mb-2">
                                                                                Please enter the name
                                                                            </text>:
                                                                            <></>*/
                                                                        } 
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="surname" className="col-sm-2 col-form-label">Surname</label>
                                                                    <div className="col-sm-10">
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            Value={this.state.currentCustomer.customer_surname}
                                                                            onChange={(e) =>{
                                                                                if(e.target.value){
                                                                                    this.setState({surname: e.target.value, valid_surname: true})
                                                                                }
                                                                                else{
                                                                                    this.setState({surname: this.state.currentCustomer.customer_surname, valid_surname: true})
                                                                                }
                                                                            }}
                                                                        />
                                                                        { /*verif des données
                                                                            this.state.submitted && !this.state.valid_surname?
                                                                            <text className="text-danger mb-2">
                                                                                Please enter the surname
                                                                            </text>:
                                                                            <></>*/
                                                                        } 
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="tel" className="col-sm-2 col-form-label">Phone N°</label>
                                                                    <div className="col-sm-10">
                                                                        <input 
                                                                        type="text" 
                                                                            className="form-control" 
                                                                            id="tel" 
                                                                            Value={this.state.currentCustomer.customer_tel}
                                                                            onChange={(e) =>{
                                                                                this.setState({tel: e.target.value})
                                                                                if (e.target.value){
                                                                                    this.setState({valid_tel: true})
                                                                                }
                                                                                else{
                                                                                    this.setState({valid_tel: false})
                                                                                }
                                                                            }}
                                                                        />
                                                                        { /*verif des données
                                                                            this.state.submitted && !this.state.valid_tel?
                                                                            <text className="text-danger mb-2">
                                                                                Please enter the phone number
                                                                            </text>:
                                                                            <></>*/
                                                                        } 
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                                    <div className="col-sm-10">
                                                                    <input 
                                                                        type="email" 
                                                                        className="form-control" 
                                                                        id="email" 
                                                                        Value={this.state.currentCustomer.customer_email}
                                                                        placeholder="email" 
                                                                        onChange={(e) =>{
                                                                            this.setState({email: e.target.value})
                                                                            if (e.target.value){
                                                                                this.setState({valid_email: true})
                                                                            }
                                                                            else{
                                                                                this.setState({valid_email:false})
                                                                            }
                                                                        }}
                                                                    />
                                                                        { /*verif des données
                                                                            this.state.submitted && !this.state.valid_email?
                                                                            <text className="text-danger mb-2">
                                                                                Please enter the email
                                                                            </text>:
                                                                            <></>*/
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>{/* /.card-body */}
                                                            <div className="card-footer">
                                                                <Button
                                                                    className="btn btn-primary"
                                                                    onClick={(e) =>{ 
                                                                        
                                                                            this.setState({modal4: true})
                                                                        
                                                                            
                                                                    }}  
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <button 
                                                                    type="reset" 
                                                                    className="btn btn-default float-right"
                                                                    onClick={(e) =>{  
                                                                        this.setState({modal1: false})
                                                                    }} 
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>{/* /.card-footer */}
                                                        </form>
                                                    </Modal.Body>
                                                </Modal>
                                                
                                                {/* Modal delete customer*/}
                                                <Modal
                                                    show={this.state.modal3}
                                                    onHide={(e)=>{this.setState({modal3: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmation</Modal.Title>
                                                    </Modal.Header>
                                                    <form>
                                                    
                                                        <Modal.Body>
                                                            Delete Customer  {this.state.currentCustomer.customer_name} ?
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal3: false})}}>
                                                                Annuler
                                                            </Button>
                                                            <button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                                    this.setState({modal3: false});
                                                                    this.delete_customer(this.state.currentCustomer.customer_id);
                                                                    
                                                                }
                                                            }
                                                            >
                                                                Ok
                                                            </button>
                                                        </Modal.Footer>
                                                    </form>
                                                </Modal>

                                                {/* Horizontal Form Modal edit confirmation*/}
                                                <Modal
                                                    show={this.state.modal4}
                                                    onHide={(e)=>{this.setState({modal4: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmation</Modal.Title>
                                                    </Modal.Header>
                                                    {/*<form>*/}
                                                    
                                                        <Modal.Body>
                                                            Edit Customer  {this.state.currentCustomer.customer_name} ?
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal4: false})}}>
                                                                Annuler
                                                            </Button>
                                                            <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                                    this.update_customer(this.state.currentCustomer.customer_id);
                                                                    this.setState({modal4: false});
                                                                    this.setState({modal1: false});
                                                                    
                                                                    
                                                                }
                                                            }
                                                            >
                                                                Ok
                                                            </Button>
                                                        </Modal.Footer>
                                                    {/*</form>*/}
                                                </Modal>

                                                {/*  Modal search customer by id*/}
                                                <Modal
                                                    show={this.state.modal5}
                                                    onHide={(e)=>{this.setState({modal5: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Details on Customer {this.state.currentCustomer.name}</Modal.Title>
                                                    </Modal.Header>
                                                                
                                                        <Modal.Body> 
                                                            <div>
                                                                <div className="row">
                                                                <label>
                                                                    <strong>
                                                                    ID :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentCustomer.customer_id}
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <strong>
                                                                            Name :
                                                                        </strong>   
                                                                    </label>&nbsp;&nbsp;
                                                                    {this.state.currentCustomer.name}
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <strong>
                                                                            Surname :
                                                                        </strong>   
                                                                    </label>&nbsp;&nbsp;
                                                                    {this.state.currentCustomer.customer_surname} 
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <strong>
                                                                            Phone :
                                                                        </strong>   
                                                                    </label>&nbsp;&nbsp;
                                                                    {this.state.currentCustomer.customer_tel} 
                                                                </div>
                                                                <div className="row">
                                                                    <label>
                                                                        <strong>
                                                                            Email :
                                                                        </strong>   
                                                                    </label>&nbsp;&nbsp;
                                                                    {this.state.currentCustomer.customer_email} 
                                                                </div>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal5: false})}}>
                                                                Annuler
                                                            </Button>
                                                            <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                                this.setState({modal5: false});                    
                                                                }
                                                                }
                                                            >
                                                                Ok
                                                            </Button>
                                                        </Modal.Footer>
                                                    
                                                </Modal>

                                            </>
                                            ): <> </> 
                                        }
                                    </div>  
                                </section>   
                            </div>
                        </div> 
                    </section> 
                </div>
            </div>
    </div>
    )
  }
}

export default Customer;
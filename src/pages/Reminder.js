import React, { Component } from 'react';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import moment from 'moment';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ReminderService from '../services/ReminderService';
import CustomerService from '../services/CustomerService';
import DatelinerByTimelinerService from '../services/DatelinerByTimelinerService';
import { values } from 'react-tempusdominus-bootstrap';
import RingLoader from "react-spinners/RingLoader";

class Reminder extends Component {
    constructor(props){
        super(props);
        this.state ={   
            reminders: [],
            customers: [],
            customersinfo: [],
            filter: "",
            results: [],
            loading: false,
            updated: false,

            reminder: null,
            currentReminder: null,
            currentIndex: -1,
            //reminder
            name:"",
            message:"",
            startDate:moment(),
            status:"",

            //email send info
            subject:"",
            email:"",
            objet:"",

            //sms send info
            phone:"",

            //check inputs
            submitted: false,
            valid_name: false,
            valid_message: false,
            valid_status: false,
            valid_date: false,
        }

        //this.can_submit = this.can_submit.bind(this);
    }

    // chargement des données
    componentDidMount(){
        
        ReminderService.getAll()
        .then(response => { 
            this.setState({reminders: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });

        CustomerService.getAll()
        .then(response => { 
            this.setState({customers: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });
    }

    find_customer(name){
        CustomerService.findByName(name)
      .then(response => {
        this.setState({
            email : response.data.customer_email,
            phone : response.data.customer_tel
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    setActiveReminder(reminder, index){
        let that = this;
        that.state.currentReminder = reminder;
        that.state.currentIndex = index ;   
    }
    apply_filter(filter){
        let that = this;
        if(filter){
            let results = that.state.customersinfo.filter((customerinfo)=>{return customerinfo.dateliner_status === filter});
            that.setState({results: results.slice(0)})
            console.log(results)
        }
        else{
            that.setState({results: that.state.customersinfo.slice(0)})
        }
        this.setState({loading: false});
    }


    find_dateliner(name){
        let that = this;
        this.setState({loading: true});
        DatelinerByTimelinerService.findByName(name)
      .then(response => {
        that.setState({customersinfo : response.data});
        that.apply_filter(that.state.filter);
        console.log(response.data);
        console.log(that.state.filter);
      })
      .catch(e => {
        console.log(e);
      });
    }

    send_email(){
        let that = this;
        let data = {
            subject: that.state.subject,
            to: that.state.email,
            message: that.state.objet,   
        }
        ReminderService.sendEmail(data)
        .then(response => { 
           // this.setState({timeliner: response.data.id});
            console.log(response.data)    
        })
        .catch(e =>{
            console.log(e);
        });
    }
    send_sms(){
        let that = this;
        let data = {
            phoneNumber: "+"+that.state.phone,
            message: that.state.message,   
        }
        console.log("+"+that.state.phone) 
        ReminderService.sendSms(data)
        .then(response => { 
           
            console.log(response.data)    
               
        })
        .catch(e =>{
            console.log(e);
        });
    }
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
                            <h1 className="m-0">Reminder</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-5">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                <li className="breadcrumb-item active"><a href="/reminders">Reminder </a></li>
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
                        <div className="row">
                        <div className="card-header">
                            {this.state.loading?
                                <>
                                <Spinner animation="border" size="sm" color={'#36d7b7'} className="mr-2 mb-1"/>
                                Please wait...
                                
                                </>:
                                <>Result(s) : {this.state.results.length} Dateliner(s) Found</>
                            }
                        </div>
                        </div>
                            {/* /.row start table reminders */}
                            <div className="row">
                            <div className="col-12">
                                <div className="card card-secondary">
                                <div className="card-header" >
                                    <center>
                                        <div className="form-group row">
                                            <label htmlFor="client" className="col-sm-1 col-form-label">Customer </label>
                                            <div className="col-3" >
                                                <select 
                                                        className="form-control"
                                                        defaultValue={this.state.customers[0]}
                                                        onChange={ (selected) =>{
                                                        // Handle selections...
                                                            if(!selected){
                                                                this.setState({customersinfo: [], results: []})
                                                            }
                                                            else{
                                                                this.find_dateliner(selected.target.value)
                                                            }
                                                        }}
                                                    >
                                                        {this.state.customers.map((customer, idx) =>{
                                                            return (
                                                                <>
                                                                    <option value={customer.id}>{customer.name}</option>
                                                                                                
                                                                </>
                                                            )
                                                            }
                                                            )
                                                        }
                                                </select>
                                            </div>
                                            
                                        
                                            <div className="input-group input-group-sm float-right" style={{width: 700 }}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Form.Check
                                                type="radio"
                                                label="All"
                                                
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                                defaultChecked
                                                onChange={(e)=>{
                                                    if(e.target.checked){
                                                        this.setState({filter: ""});
                                                        this.apply_filter("");
                                                    }
                                                }}
                                                style={{width: 75 }}
                                            />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Form.Check 
                                                    type="radio" 
                                                    label="Ongoing"
                                                    name="formHorizontalRadios"
                                                    id="formHorizontalRadios1"
                                                     onChange={(e)=>{
                                                         if(e.target.checked){
                                                            this.setState({filter: "OnGoing"});
                                                            this.apply_filter("OnGoing");
                                                        }
                                                        }}
                                                    style={{width: 75 }}
                                                />
                                                   &nbsp;&nbsp;&nbsp;&nbsp; 
                                                <Form.Check 
                                                    type="radio" 
                                                    label="Done"
                                                    name="formHorizontalRadios" 
                                                    id="formHorizontalRadios1"
                                                    onChange={(e)=>{
                                                        if(e.target.checked){
                                                            this.setState({filter: "Done"});
                                                            this.apply_filter("Done");
                                                        }
                                                    }}
                                                    style={{width: 75 }}
                                                />
                                                    &nbsp;&nbsp;&nbsp;
                                                
                                                    <Form.Check 
                                                        type="radio" 
                                                        label="Expired" 
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios1"
                                                        
                                                        onChange={(e)=>{
                                                            if(e.target.checked){
                                                                this.setState({filter: "Expired"});
                                                                this.apply_filter("Expired");
                                                            }
                                                        }}
                                                        style={{width: 75}}
                                                    />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-success float-right"
                                                        onClick={(e) =>{  
                                                            this.setState({modal: true})     
                                                        }} 
                                                    >
                                                        By Email
                                                    </button>
                                                
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-warning float-right"
                                                        onClick={(e) =>{  
                                                            this.setState({modal2: true})     
                                                        }} 
                                                    >
                                                        By SMS
                                                    </button>
                                                
                                                
                                            </div>
                                        
                                        </div>
                                    </center>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0" style={{height: 300}}>
                                    <table className="table table-head-fixed table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                        
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    {
                                        this.state.results.map((reminder, index) => (
                                            <tr 
                                                className={(index === this.state.currentIndex ? "Active" : "" )}
                                                onClick={() => this.setActiveReminder(reminder, index)}
                                                key={index}
                                            >
                                                  
                                                <td>{reminder.name}</td> 
                                                <td>{reminder.dateliner_amount}</td> 
                                                <td>{moment(reminder.dateliner_end_date).format("llll")}</td> 
                                                <td>
                                                    <i 
                                                        className={
                                                            reminder.dateliner_status==="Expired"? "text-danger": 
                                                            reminder.dateliner_status==="OnGoing"? "text-info":
                                                            reminder.dateliner_status==="Done"? "text-success": 
                                                            ""
                                                        }
                                                    > 
                                                            {reminder.dateliner_status}
                                                    </i>   
                                                </td>   
                                                <td>
                                                <a href="#" className="" onClick={(e) =>{  this.setState({modal4: true}) }} >
                                                        <i className="nav-icon fas fa-copy" />
                                                    </a>&nbsp;&nbsp;
                                                    <a href="#" className="" onClick={(e) =>{ this.setState({modal: true})  }}>
                                                        <i className="nav-icon fas fa-envelope" />
                                                    </a>&nbsp;&nbsp;
                                                    <a href="#" className="" onClick={(e) =>{ this.setState({modal2: true})  }}>
                                                        <i className="nav-icon fas fa-comment" /> <i className="fa-solid fa-message-sms"></i>
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
                        
                            
                                {this.state.currentReminder ? 
                                    (
                                        <> 
                                        
                                            {/*this.find_customer(this.state.currentReminder.name)*/}
                                            {/* Horizontal Form Modal send email*/}
                                                <Modal
                                                    show={this.state.modal}
                                                    onHide={(e)=>{this.setState({modal: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Send Reminder by Email</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className="form-horizontal">
                                                            <div className="card-body">
                                                                <div className="form-group row">
                                                                    <label htmlFor="name" className="col-sm-2 col-form-label">Email : </label>
                                                                    <div className="col-sm-10">
                                                                    <label htmlFor="name" className="col-sm-2 col-form-label">
                                                                        {this.state.email = this.state.currentReminder.timeliner_email}    
                                                                    </label>   
                                                                    
                                                                    
                                                                    {console.log(this.state.email)}
                                                                        {/*<select 
                                                                            className="form-control"
                                                                            onChange={ (selected) =>{
                                                                                this.setState({
                                                                                    email: selected.target.value,
                                                                                    valid_client: true
                                                                                });
                                                                            }}
                                                                        >
                                                                            {this.state.customers.map((customer, idx) =>{
                                                                                return (
                                                                                    <>
                                                                                        <option value={customer.id}>{customer.customer_email}</option>
                                                                                                
                                                                                    </>
                                                                                )
                                                                                }
                                                                            )
                                                                            }
                                                                        </select>*/}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                                                                    <div className="col-sm-10">
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            placeholder="subject"
                                                                            onChange={(e) =>{
                                                                                if(e.target.value){
                                                                                    this.setState({subject: e.target.value, valid_subject: true})
                                                                                }
                                                                                else{
                                                                                    this.setState({subject: e.target.value, valid_subject: false})
                                                                                }
                                                                            }}
                                                                        />
                                                                        { //verif des données
                                                                            this.state.submitted && !this.state.valid_reason?
                                                                            <text className="text-danger mb-2">
                                                                                Veuillez entrer la Raison.
                                                                            </text>:
                                                                            <></>
                                                                        } 
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="surname" className="col-sm-2 col-form-label">Message</label>
                                                                    <div className="col-sm-10">
                                                                        <textarea 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            placeholder="Your Message"
                                                                            onChange={(e) =>{
                                                                                if(e.target.value){
                                                                                    this.setState({objet: e.target.value, valid_surname: true})
                                                                                }
                                                                                else{
                                                                                    this.setState({objet: e.target.value, valid_surname: false})
                                                                                }
                                                                            }}
                                                                        />
                                                                        { //verif des données
                                                                            this.state.submitted && !this.state.valid_surname?
                                                                            <text className="text-danger mb-2">
                                                                                Please enter your Message
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
                                                                            this.setState({modal1: true})
                                                                    }}  
                                                                >
                                                                    Send
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
                                            {/*Modal1 for email confirmation*/}
                                                <Modal
                                                    show={this.state.modal1}
                                                    onHide={(e)=>{this.setState({modal1: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmation</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        Send Email to customer {this.state.currentReminder.name} ?
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal1: false})}}>
                                                            Annuler
                                                        </button>
                                                        <button className="btn btn-primary" onClick={(e)=>{
                                                                this.send_email();
                                                                this.setState({modal1: false});
                                                                this.setState({modal: false});
                                                                
                                                            }
                                                        }
                                                        >
                                                            Ok
                                                        </button>
                                                    </Modal.Footer>
                                                </Modal>

                                            {/*Modal2 for sms send*/}
                                                <Modal
                                                    show={this.state.modal2}
                                                    onHide={(e)=>{this.setState({modal2: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Send Reminder by SMS</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className="form-horizontal">
                                                            <div className="card-body">
                                                                <div className="form-group row">
                                                                    <label htmlFor="name" className="col-sm-2 col-form-label">Customer </label>
                                                                    <div className="col-sm-10">
                                                                        <label htmlFor="name" className="col-sm-2 col-form-label">
                                                                            {this.state.phone = this.state.currentReminder.timeliner_tel}    
                                                                        </label> 
                                                                        {console.log(this.state.phone)/*<select 
                                                                            className="form-control"
                                                                            onChange={ (selected) =>{
                                                                                this.setState({
                                                                                    phone: selected.target.value,
                                                                                    valid_client: true
                                                                                });
                                                                            }}
                                                                        >
                                                                            {this.state.customers.map((customer, idx) =>{
                                                                                return (
                                                                                    <>
                                                                                        <option value={customer.id}>{customer.customer_tel}</option>
                                                                                                
                                                                                    </>
                                                                                )
                                                                                }
                                                                            )
                                                                            }
                                                                        </select>*/}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="message" className="col-sm-2 col-form-label">Message</label>
                                                                    <div className="col-sm-10">
                                                                        <textarea 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            placeholder="Your Message"
                                                                            onChange={(e) =>{
                                                                                if(e.target.value){
                                                                                    this.setState({message: e.target.value, valid_message: true})
                                                                                }
                                                                                else{
                                                                                    this.setState({message: e.target.value, valid_message: false})
                                                                                }
                                                                            }}
                                                                        />
                                                                        { //verif des données
                                                                            this.state.submitted && !this.state.valid_message?
                                                                            <text className="text-danger mb-2">
                                                                                Please enter your Message
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
                                                                            this.setState({modal3: true})
                                                                    }}  
                                                                >
                                                                    Send
                                                                </Button>
                                                                <button 
                                                                    type="reset" 
                                                                    className="btn btn-default float-right"
                                                                    onClick={(e) =>{  
                                                                        this.setState({modal2: false})
                                                                    }} 
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>{/* /.card-footer */}
                                                        </form>
                                                    </Modal.Body>
                                                    
                                                </Modal>

                                            {/*Modal3 for sms confirmation*/}
                                            <Modal
                                                    show={this.state.modal3}
                                                    onHide={(e)=>{this.setState({modal3: false})}}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmation</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        Send Sms to customer {this.state.currentReminder.name} ?
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal3: false})}}>
                                                            Annuler
                                                        </button>
                                                        <button className="btn btn-primary" onClick={(e)=>{
                                                                this.setState({modal3: false});
                                                                this.setState({modal2: false});
                                                                this.send_sms();
                                                                
                                                            }
                                                        }
                                                        >
                                                            Ok
                                                        </button>
                                                    </Modal.Footer>
                                            </Modal>

                                            {/*  Modal4 for details on timeliner */}
                                            <Modal
                                                show={this.state.modal4}
                                                onHide={(e)=>{this.setState({modal4: false})}}
                                                backdrop="static"
                                                keyboard={false}
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Details on Timeliner </Modal.Title>
                                                </Modal.Header>
                                                            
                                                    <Modal.Body> 
                                                        <div>
                                                            <div className="row">
                                                            <label>
                                                                <strong>
                                                                ID :
                                                                </strong>   
                                                            </label>&nbsp;&nbsp;
                                                            {this.state.currentReminder.timeliner_id}
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Customer :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.name}
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Reason:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.timeliner_reason} 
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Timeliner Amount:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.timeliner_amount} CFA
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Dateliner Number:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.dateliner_number} 
                                                            </div><div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Dateliner Amount:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.dateliner_amount} CFA
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Start Date:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {moment(this.state.currentReminder.timeliner_start_date).format("llll")} 
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        End Date:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {moment(this.state.currentReminder.timeliner_end_date).format("llll")}  
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Status :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.dateliner_status} 
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Phone :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.timeliner_tel} 
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Email :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {this.state.currentReminder.timeliner_email} 
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal4: false})}}>
                                                            Annuler
                                                        </Button>
                                                        
                                                        <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                            this.setState({modal4: false});                    
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
        );
    }
}

export default Reminder;
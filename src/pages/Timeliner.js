import React, {Component} from 'react'; 
import axios from 'axios';
import  "core-js/actual/array/group-by-to-map";
import {Modal, Button, Card, Form, Col, Row} from 'react-bootstrap';
import { DateTimePicker } from "react-tempusdominus-bootstrap";
import writtenNumber from 'written-number';
import groupBy from 'lodash.groupby';
import moment, { min } from 'moment';
import Header from '../components/Header';
import Menu from '../components/Menu';
import CustomerService from '../services/CustomerService';
import TimelinerService from '../services/TimelinerService';
import DatelinerService from '../services/DatelinerService';
import ReminderMeanService from '../services/ReminderMeanService';
import DatelinerByTimelinerService from '../services/DatelinerByTimelinerService';
import ObjectsByTimelinerService from '../services/ObjectsByTimelinerSerivice';


class Timeliner extends Component {
    constructor(props){
        super(props);
        this.state ={
            input_echeances: [],    
            customers: [],
            customersinfo: [],
            updated: false,
            startDate: moment(),
            timeliner: null,
            timeliners: [],
            datebytimeliners: [],
            dateliners: [],
            remindermeans: [],
            input_garants: [],
            ids_input_garants: [],
            total_created_garants: 0,
            
            //index
            currentTimeliner: null,
            currentIndex: -1,
            searchId:"",
            
            //guarantees
            guarantees: [],
            //timeline
            reason: "",
            customer_name: "",
            amount_indebted: 0,
            due_date: moment(),
            date_liner_number: 0,
            reminder_number : 0,
            email:"",
            phone:"",
            penalty_amount: 0,
            penalty_rate: 0,
            amount_letters:"zero",
            reminder_one: "",
            reminder_two: "",
            reminder_three: "",

            //check inputs
            submitted: false,
            valid_client: false,
            valid_reason: false,
            valid_amount: false,
            valid_deadline_number: false,
            valid_due_date: false,
            valid_status: false,
            valid_reminder_number: false,
            valid_deadlines_amount: false,
            valid_deadlines_date: false,
            deadlines_filled: false,
        }

        this.can_submit = this.can_submit.bind(this);
        this.check_deadlines = this.check_deadlines.bind(this);
        this.save_timeliner = this.save_timeliner.bind(this);
        this.submit_dateliner = this.submit_dateliner.bind(this);
        this.save_dateliner = this.save_dateliner.bind(this);
        this.pay_dateliner = this.pay_dateliner.bind(this);
        this.reset_echeance_inputs = this.reset_echeance_inputs.bind(this);
        this.add_garant_input = this.add_garant_input.bind(this);
        this.delete_garant_input = this.delete_garant_input.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
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

        TimelinerService.getAll()
        .then(response => { 
            this.setState({timeliners: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });

        DatelinerByTimelinerService.getAll()
        .then(response => { 
            this.setState({datebytimeliners: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });

        ReminderMeanService.getAll()
        .then(response => { 
            this.setState({remindermeans: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });

    }

    //start veriff----------------------------------------------------

    can_submit(){
        let that = this;
        let flag = that.state.valid_amount && that.state.valid_deadline_number && that.state.valid_due_date && that.state.valid_reason;
        this.setState({ submitted: true});
        return flag;
        
    }
    

    //verifie les echancier expirer
    deadlines(){
        let that = this;
        that.state.timeliners.map((timeliner, index) => {
            
            //console.log(timeliner.timeliner_end_date)
           for (var i=0; i<that.state.timeliners.length - 1; i++){
                if(moment(timeliner.timeliner_end_date ).isBefore(this.state.startDate)){
                    that.change_status(timeliner.timeliner_id)
                    console.log(timeliner.timeliner_end_date)
                }
            }
        })
    }

    get_dateliners(id){

        DatelinerByTimelinerService.get(id)
        .then(response => { 
            this.setState({dateliners: response.data}); 
        })
        .catch(e =>{
            console.log(e);
        });

    }
    
    // change to Done after payement
    pay_dateliner(timeliner, dateliner){

        DatelinerByTimelinerService.getBill(timeliner, dateliner)
        .then(response => { 
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    // change le status a expirer d'un echéancier
    change_status(timeliner){
        //let that = this;    
        TimelinerService.changeStatus(timeliner)
        .then(response => { 
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    check_deadlines(){
        let that = this;
        let flag = true;
        let result = that.state.deadlines.find((deadline)=>{return (deadline.payable_amount === 0 || deadline.deadline_date === "")});
        if(result){
            that.setState({deadlines_filled: false})
        }
        else{
            for(var i=0; i<that.state.deadlines.length - 1; i++){
                if(that.state.deadlines[i].deadline_date.diff(that.state.deadlines[i+1].deadline_date, 'days') >= 0){
                    flag = false;
                    break;
                }
            }
            if(that.state.deadlines.length){
                if(that.state.deadlines[that.state.deadlines.length-1].deadline_date.diff(that.state.due_date, 'days') > 0){
                    flag = false;
                }
            }
            that.setState({valid_deadlines_date: flag, deadlines_filled: true})
        }
        let sum = (that.state.deadlines.reduce((a, b) => a + ((b["payable_amount"]- 0) || 0), 0));
        let flag2 = (0 === (sum - that.state.amount_indebted));
        that.setState({valid_deadlines_amount: flag2});
    }

    //end veriff----------------------------------------------------

    setActiveTimeliner(timeliner, index){
        let that = this;
        that.state.currentTimeliner = timeliner;
        that.state.currentIndex = index ;   
    }

    find_customer(name){
        CustomerService.findByName(name)
      .then(response => {
        this.setState({
            email : response.data.customer_email,
            phone : response.data.customer_tel
        });
        console.log(this.state.email);
      })
      .catch(e => {
        console.log(e);
      });
    }

    save_timeliner(){
        let that = this;
        let data = {
            name: that.state.customer_name,
            timeliner_reason: that.state.reason,
            timeliner_amount: that.state.amount_indebted,
            timeliner_end_date: that.state.due_date,
            dateliner_number: that.state.date_liner_number,
            //timeliner_reminder_number: that.state.reminder_number,
            timeliner_email: that.state.email,
            timeliner_tel: that.state.phone,
            penalty: that.state.penalty_rate,
            timeliner_penalty_amount: that.state.penalty_amount,
            reminder_mean_one: that.state.reminder_one,
            reminder_mean_two: that.state.reminder_two,
            reminder_mean_three: that.state.reminder_three
        }
        TimelinerService.create(data)
        .then(response => { 
            this.submit_dateliner(that.state.date_liner_number, response.data.timeliner_id);
            this.submit_guarantee(0, response.data.timeliner_id);
            this.setState({timeliner: response.data});
            console.log(response.data);
            //alert("Contract enregistrer")     
        })
        .catch(e =>{
            console.log(e);
        });
    }

    save_dateliner(i){
        let that = this;
        for (var j=0; j < i; j++){
            let data = {
                dateliner_amount: that.state.deadlines[j].payable_amount,
                dateliner_end_date: that.state.deadlines[j].deadline_date,
                dateliner_reminder_time: that.state.reminder_number,

                //time_liner_id: timeliner
            }
            DatelinerService.create(data)
            .then(response => {
                //that.submit_reminders(response.data.id);
                if(i+1 < that.state.deadlines.length){
                    this.save_dateliner(i+1);
                }
            })
            .catch(e =>{
                console.log(e);
            });
        }   
    }

    submit_dateliner(i, timeliner){
        let that = this;
        for (var j=0; j < i; j++){
            let data = {
                dateliner_amount: that.state.deadlines[j].payable_amount,
                dateliner_end_date: that.state.deadlines[j].deadline_date,
                dateliner_reminder_time: that.state.reminder_number,
                dateliner_number: j+1,
                timeliner: timeliner,
                name: that.state.customer_name,
                timeliner_email: that.state.email,
                timeliner_tel: that.state.phone, 
                timeliner_reason: that.state.reason,
                timeliner_amount: that.state.amount_indebted,
                timeliner_reminder_number: that.state.reminder_number,   
                penalty_amount: that.state.penalty_amount,
                reminder_mean_one: that.state.reminder_one,
                reminder_mean_two: that.state.reminder_two,
                reminder_mean_three: that.state.reminder_three
            }
            DatelinerByTimelinerService.create(data)
            .then(response => {
                //that.submit_reminders(response.data.id);
                    
            })
            .catch(e =>{
                console.log(e);
            });
        }   
    }

    submit_guarantee(i, timeliner){
        let that = this;
        let data = {
            timeliner: timeliner,
            name: that.state.customer_name,
            timeliner_amount: that.state.amount_indebted,
            guarantee_label: that.state.guarantees[i].label,
            guarantee_amount: that.state.guarantees[i].amount,
            guarantee_image: that.state.guarantees[i].picture
        }
        ObjectsByTimelinerService.create(data)
        .then(function (response) {
            if(i+1 < that.state.guarantees.length){
                that.submit_guarantee(i+1, timeliner);
            }
        })
        .catch(e =>{
            console.log(e);
        });
    }
    update_timeliner(id){
        let that = this;
        let data = {
            timeliner_amount: that.state.amount_indebted,
            name: that.state.customer_name,
            timeliner_reason: that.state.reason,
            timeliner_end_date: that.state.due_date,
            dateliner_number: that.state.date_liner_number,
            timeliner_status: that.state.timeliner_status,
            timeliner_reminder_number: that.state.reminder_number
        }
        TimelinerService.update(id, data)
        .then(response => {
            this.submit_dateliner(that.state.date_liner_number, id);
            console.log(response.data);

          })
          .catch(e => {
            console.log(e);
          });
    }
    find_timeliner(name){
        TimelinerService.findByName(name)
      .then(response => {
        this.setState({customersinfo : response.data});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    find_dateliner(name){
        DatelinerByTimelinerService.findByName(name)
      .then(response => {
        this.setState({customersinfo : response.data});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }



    delete_timeliner(id){
        TimelinerService.remove(id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    delete_datebytimeliner(id){
        DatelinerByTimelinerService.remove_timeliner(id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    

    saveAll(){
        this.save_timeliner();
        this.save_dateliner(this.state.date_liner_number);
    }

    //********  insertion d'echeances en fonction du nombre
    reset_echeance_inputs(n){
        let that = this;
        let inputs = [];
        let deadlines = [];
        for (var i=0; i < n; i++){
            let k = i;
            inputs.push(
                <div className="col-md-12">
                    <br></br>
                <div className="form-group row">
                <label htmlFor="dateline" className="col-sm-2 col-form-label">N° {i+1}</label>
                <div className="col-sm-5">
                    <input 
                        type="number" 
                        className="form-control" 
                        id="motif" 
                        placeholder="amount" 
                        onChange={(e)=>{
                            let deadlines = this.state.deadlines;
                            deadlines[k].payable_amount = e.target.value;
                            this.setState({deadlines: deadlines.slice(0)});
                            this.check_deadlines();
                        }}
                    />
                </div>
                <div className="col-sm-5">
                <DateTimePicker  
                    onChange={(e)=>{
                        let deadlines = this.state.deadlines;
                        deadlines[k].deadline_date = e.date;
                        this.setState({deadlines: deadlines.slice(0)});
                        this.check_deadlines();
                    }}
                    mindate={that.state.startDate}
                />
            </div>
                </div>
                </div>
            );
            deadlines.push({"payable_amount": 0, "deadline_date": that.state.due_date})
        }
        that.setState({input_echeances: inputs.slice(0), deadlineNumber: n, deadlines: deadlines.slice(0)});
    }

    add_garant_input(e){
        let that = this;
        let inputs = that.state.input_garants;
        let ids = that.state.ids_input_garants;
        let n = that.state.total_created_garants;
        console.log(n);
        ids.push(n);
        inputs.push(
            <div>
                <Card.Text className="border-bottom pb-2 d-flex justify-content-between">
                    <span id={`garant-${n}`}>
                        Élément garant {ids.indexOf(n) + 1}
                    </span>
                    <Button variant="link" 
                    className="text-danger py-0 text-decoration-none"
                    onClick={(e)=>{that.delete_garant_input(n)}}
                    >Supprimer</Button>
                </Card.Text>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                    Intitulé*:
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control 
                    type="text" 
                    placeholder="Intitulé" 
                    onChange={(e)=>{
                        let guarantees = that.state.guarantees;
                        let ind = that.state.ids_input_garants.indexOf(n);
                        if (guarantees.length > ind){
                            guarantees[ind]["label"] = e.target.value;
                        }
                        else{
                            guarantees.push({label: e.target.value, amount: 0, picture: ""})
                        }
                        that.setState({guarantees: guarantees.slice(0)});
                        that.check_garants();
                    }}
                    />
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        Montant estimé*:
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="number" 
                    placeholder="Montant"
                    onChange={(e)=>{
                        let guarantees = that.state.guarantees;
                        let ind = that.state.ids_input_garants.indexOf(n);
                        if (guarantees.length > ind){
                            guarantees[ind]["amount"] = e.target.value;
                        }
                        else{
                            guarantees.push({label: "", amount: e.target.value, picture: ""})
                        }
                        that.setState({guarantees: guarantees.slice(0)});
                        that.check_garants();
                    }}
                    />
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} controlId="">
                    
                    <Col sm="12">
                        <input type="file" 
                        
                        onChange={(e)=>{
                            this.handleFileSelect(e,n)
                        }}
                        />
                    </Col>
                </Form.Group>
                <div><output id={`output-${n}`} className="mt-3"></output></div>
            </div>
        );
        that.setState({
            input_garants: inputs.slice(0),
            ids_input_garants: ids.slice(0),
            total_created_garants: n + 1
        });
    }

    delete_garant_input(i){
        let that = this;
        let n = that.state.ids_input_garants.indexOf(i);
        let inputs = that.state.input_garants;
        let ids = that.state.ids_input_garants;
        let guarantees = that.state.guarantees;
        inputs.splice(n, 1);
        ids.splice(n, 1);
        guarantees.splice(n, 1);
        for(var j=0; j<ids.length; j++){
            document.getElementById(`garant-${ids[j]}`).innerHTML = "Élément garant " + (j + 1);
        }
        that.setState({
            input_garants: inputs.slice(0),
            ids_input_garants: ids.slice(0)
        })
    }

    handleFileSelect(e, i) {
        let that = this;
        let files = e.target.files;
        let file = files[0];
        if (files!=null && file.type.match('image.*')) {
          let reader = new FileReader();
    
          reader.readAsDataURL(file);
          reader.onload = function () {
            let output = document.getElementById(`output-${i}`);
            output.innerHTML = ['<img class="thumbnail" src="', reader.result,
            '" title="', escape(file.name), '" width=64 height=64/>'].join('');

            let guarantees = that.state.guarantees;
            let ind = that.state.ids_input_garants.indexOf(i);
            if (guarantees.length > ind){
                guarantees[ind]["picture"] = reader.result;
            }
            else{
                guarantees.push({label: "", amount: 0, picture: reader.result})
            }
            that.setState({guarantees: guarantees.slice(0)})
            that.check_garants();
        };
          // Do your things
        } else {
          // do your things
        }
    }
    
  render() {
    return (
        
        
    <div>
        <Header/>
        <Menu/>
        <Modal
                    show={this.state.modal}
                    onHide={(e)=>{this.setState({modal: false})}}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Confirmer l'enregistrement du contrat.
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal: false})}}>
                            Annuler
                        </button>
                        <button className="btn btn-primary" onClick={(e)=>{
                                this.save_timeliner(); 
                                this.setState({modal: false});     
                                this.setState({modal1: false});     
                                this.setState({modal8: true});     
                            }
                        }
                        >
                            Ok
                        </button>
                    </Modal.Footer>
        </Modal>
        <div className="content-wrapper">
             {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Timeliner</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-5">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                <li className="breadcrumb-item active"><a href="/contracts">contract </a></li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <br/>
            <br/>
            
            <section className="content">
                <div className="container-fluid">
                    <div className="row"> 
                        <section className="col-lg-11 connectedSortable" > 
                            {/* /.row start table timeliners */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="card card-secondary">
                                    <div className="card-header">
                                        <h3 className="card-title"> Timeliners </h3>
                                        <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{width: 300}}>
                                            <input 
                                                type="text" 
                                                name="table_search" 
                                                className="form-control float-right" 
                                                placeholder="Search By ID" 
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
                                                    this.find_dateliner(this.state.searchId)
                                                    this.setState({modal5: true})
                                                }}
                                            >
                                                <i className="fas fa-search" />
                                            </button>&nbsp;&nbsp;
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-success"
                                                    onClick={(e) =>{  
                                                        this.setState({modal1: true})     
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
                                            <th>Customer</th>
                                            <th>Reason</th>
                                            <th>Amount</th>
                                            <th>Start-Date</th>
                                            <th>End-Date</th>
                                            <th>Dateliner</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                        {
                                            this.state.timeliners 
                                            .sort((a, b) => new Date(b.timeliner_start_date).getTime() - new Date(a.timeliner_start_date).getTime())
                                            .map((timeliner, index) => (
                                                
                                                <tr 
                                                    className={(index === this.state.currentIndex ? "Active" : "" )}
                                                    //onClick={() => this.setActiveTimeliner(timeliner, index)}
                                                    onClick={(e) => {
                                                        this.get_dateliners(timeliner.timeliner_id)
                                                        this.setActiveTimeliner(timeliner, index)
                                                    }}
                                                    key={index}
                                                >
                                                    
                                                      
                                                    <td>{timeliner.name} {/*new Date(timeliner.timeliner_start_date).getTime()*/}</td> 
                                                    <td>{timeliner.timeliner_reason}</td> 
                                                    <td>{timeliner.timeliner_amount}</td> 
                                                    <td>{moment(timeliner.timeliner_start_date).format("ll")}</td>   
                                                    <td>{moment(timeliner.timeliner_end_date).format("llll")}</td>   
                                                    <td>{timeliner.dateliner_number}</td> 
                                                    <td><i 
                                                            className={
                                                                timeliner.status==="Expired"? "text-danger": 
                                                                timeliner.status==="OnGoing"? "text-info":
                                                                timeliner.status==="Done"? "text-success": 
                                                                ""
                                                            }
                                                        > 
                                                            {timeliner.status} 
                                                        </i>
                                                    </td> 

                                                    <td> 
                                                        <a className="" onClick={(e) =>{  this.setState({modal7: true});}} >
                                                            <i className="nav-icon fas fa-copy" />
                                                        </a> &nbsp; &nbsp;
                                                        {<a className="" onClick={(e) =>{  this.setState({modal3: true});}} >
                                                            <i className="nav-icon fas fa-trash" />
                                                        </a>} 
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
                                <div className="col-12">
                                    <div className="card card-secondary">
                                    {/*<div className="card-header">
                                        <h3 className="card-title"> Dateliners </h3>
                                        <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{width: 300}}>
                                            <input 
                                                type="text" 
                                                name="table_search" 
                                                className="form-control float-right" 
                                                placeholder="Search By ID" 
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
                                                    this.find_dateliner(this.state.searchId)
                                                    this.setState({modal5: true})
                                                }}
                                            >
                                                <i className="fas fa-search" />
                                            </button>&nbsp;&nbsp;
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-success"
                                                    onClick={(e) =>{  
                                                        this.setState({modal1: true})     
                                                    }} 
                                                >
                                                    ADD
                                                </button>&nbsp;&nbsp;
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-warning"
                                                    onClick={(e) =>{  
                                                        this.setState({modal1: true})     
                                                    }} 
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                     /.card-header */}
                                    <div className="card-body table-responsive p-0" style={{height: 300}}>
                                        <table className="table table-head-fixed table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                            {/*<th>Dateline ID</th>*/}
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Start-Date</th>
                                            <th>End-Date</th>
                                            <th>Dateliner</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                         
                                        {
                                            this.state.dateliners
                                            .sort((a, b) => a.dateliner_number - b.dateliner_number)
                                            .map((datebytimeliner, index) => (
                                                <tr 
                                                    className={(index === this.state.currentIndex ? "Active" : "" )}
                                                    onClick={() => this.setActiveTimeliner(datebytimeliner, index)}
                                                    key={index}
                                                
                                                >
                                                    
                                                       
                                                    <td>{datebytimeliner.name}</td> 
                                                    <td>{datebytimeliner.dateliner_amount}</td> 
                                                    <td>{moment(datebytimeliner.dateliner_start_date).format("lll")}</td>   
                                                    <td>{moment(datebytimeliner.dateliner_end_date).format("llll")}</td>   
                                                    <td>{datebytimeliner.dateliner_number}</td> 
                                                    <td>
                                                        <i 
                                                            className={
                                                                datebytimeliner.dateliner_status==="Expired"? "text-danger": 
                                                                datebytimeliner.dateliner_status==="OnGoing"? "text-info":
                                                                datebytimeliner.dateliner_status==="Done"? "text-success": 
                                                                ""
                                                            }
                                                        >
                                                            {datebytimeliner.dateliner_status}
                                                        
                                                        </i>
                                                    </td> 
                                                    <td> 
                                                        <a className="" onClick={(e) =>{  this.setState({modal6: true});}} >
                                                            <i className="nav-icon fas fa-money-bill-wave" />
                                                        </a> &nbsp; &nbsp;
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
                                   {/*  /.card */}
                                </div>
                            </div>
                            {/* /.row end table timeliners */}
                            <div className="col-md-12">
                                {/* Horizontal Form modal1 add timeliner*/}
                                <Modal
                                    show={this.state.modal1}
                                    onHide={(e)=>{this.setState({modal1: false})}}
                                    backdrop="static"
                                    keyboard={false}
                                    fullscreen={true}
                                    size="xl"
                                >
                                
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Timeliner</Modal.Title>
                                    </Modal.Header>
                                        {/* form start */}
                                        <form className="form-horizontal">
                                        <Modal.Body>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-6 connectedSortable">
                                                    <div className="form-group row">
                                                        <label htmlFor="client" className="col-sm-2 col-form-label">Customer<i className="text-danger">*</i></label>
                                                        <div className="col-sm-10">
                                                            <select 
                                                                className="form-control"
                                                                onChange={ (selected) =>{
                                                                    this.setState({
                                                                        customer_name: selected.target.value,
                                                                        valid_client: true
                                                                    });
                                                                    this.find_customer(selected.target.value);
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
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="reason" className="col-sm-2 col-form-label">Reason<i className="text-danger">*</i></label>
                                                        <div className="col-sm-10">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="reason"
                                                                onChange={(e) =>{
                                                                    if(e.target.value){
                                                                        this.setState({reason: e.target.value, valid_reason: true})
                                                                    }
                                                                    else{
                                                                        this.setState({reason: e.target.value, valid_reason: false})
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
                                                        <label htmlFor="montant" className="col-sm-2 col-form-label">Amount<i className="text-danger">*</i></label>
                                                        <div className="col-sm-5">
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="motif" 
                                                                placeholder="amount" 
                                                                onChange={(e) =>{
                                                                    this.setState({
                                                                        amount_indebted: e.target.value,
                                                                        amount_letters: writtenNumber(e.target.value, {lang: 'en'})
                                                                    });
                                                                    //this.check_deadlines();
                                                                    if (e.target.value>0){
                                                                        this.setState({
                                                                            amount_indebted: e.target.value,
                                                                            valid_amount: true
                                                                        });
                                                                    }
                                                                    else{
                                                                        this.setState({
                                                                            amount_indebted: e.target.value,
                                                                            valid_amount: false
                                                                        });
                                                                    }
                                                                }}
                                                            />
                                                            { //verif des données
                                                                this.state.submitted && !this.state.valid_amount?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez entrer un Montant positive.
                                                                </text>:
                                                                <></>
                                                            }
                                                            
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                id="motif" 
                                                                plaintext readOnly
                                                                value={this.state.amount_letters}
                                                            />
                                                        </div> 
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="penalty" className="col-sm-2 col-form-label">penalty<i className="text-danger">*</i></label>
                                                        <div className="col-sm-5">
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="motif" 
                                                                placeholder="amount" 
                                                                onChange={(e) => {
                                                                    let value = (this.state.amount_indebted * e.target.value)/100.0;
                                                                    this.setState({
                                                                        penalty_rate: e.target.value,
                                                                        penalty_amount: value,
                                                                        valid_penalty: true
                                                                    })}}
                                                            />
                                                            { //verif des données
                                                                this.state.submitted && !this.state.valid_amount?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez entrer un Montant positive.
                                                                </text>:
                                                                <></>
                                                            } 
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="motif" 
                                                                plaintext readOnly
                                                                defaultValue="0" 
                                                                value={this.state.penalty_amount}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Date and time */}
                                                    <div className="form-group row">
                                                        <label htmlFor="end_date" className="col-sm-2 col-form-label">Start Date</label>
                                                        <div className="col-sm-10">
                                                            <DateTimePicker 
                                                                minDate={this.state.startDate} 
                                                                maxDate={this.state.startDate}
                                                                onChange={(e) =>{
                                                                    this.setState({due_date: e.date, valid_due_date: true})
                                                                }} 
                                                            />
                                                            
                                                            { //verif des données
                                                                this.state.submitted && !this.state.valid_due_date ?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez entrer la date de l'échéance.
                                                                </text>:
                                                                <></>
                                                            }
                                                        </div>
                                                    </div>
                                                    {/* Date and time */}
                                                    <div className="form-group row">
                                                        <label htmlFor="end_date" className="col-sm-2 col-form-label">End Date<i className="text-danger">*</i></label>
                                                        <div className="col-sm-10">
                                                            <DateTimePicker 
                                                                minDate={this.state.startDate} 
                                                                onChange={(e) =>{
                                                                    this.setState({due_date: e.date, valid_due_date: true})
                                                                }} 
                                                            />
                                                            
                                                            { //verif des données
                                                                this.state.submitted && !this.state.valid_due_date ?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez entrer la date de l'échéance.
                                                                </text>:
                                                                <></>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="dateline_number" className="col-sm-2 col-form-label">Dateline N°<i className="text-danger">*</i></label>
                                                        <div className="col-sm-10">
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="echeance" 
                                                                placeholder="number of datelines"
                                                                onChange={(e) => {
                                                                    
                                                                    
                                                                        this.reset_echeance_inputs(e.target.value)
                                                                    
                                                                    if(e.target.value){
                                                                        this.setState({
                                                                            date_liner_number: e.target.value,
                                                                            valid_deadline_number: true
                                                                        });
                                                                    }
                                                                    else{
                                                                        this.setState({
                                                                            date_liner_number: e.target.value,  
                                                                            valid_deadline_number: false
                                                                        });
                                                                    }
                                                                }} 
                                                            />
                                                            { //verif des données
                                                                this.state.submitted && !this.state.valid_deadline_number?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez entrer le nombre de l'échéance.
                                                                </text>:
                                                                <></>
                                                            }
                                                        </div>
                                                        {this.state.input_echeances}
                                                    </div>
                                                    
                                                    {/*<div className="form-group row">
                                                        <label htmlFor="montant" className="col-sm-2 col-form-label">Reminder N°<i className="text-danger">*</i></label>
                                                        <div className="col-sm-10">
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="motif" 
                                                                placeholder="nombre de relances" 
                                                                onChange={(e) =>{
                                                                    if(e.target.value){
                                                                        this.setState({reminder_number: e.target.value, valid_reminder_number:true})
                                                                    }
                                                                    else{
                                                                        this.setState({reminder_number: e.target.value, valid_reminder_number:false})
                                                                    }
                                                                }}
                                                            />
                                                            { //verif des données
                                                                this.state.submitted && !this.state.valid_reminder_number?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez entrer le nombre de relance.
                                                                </text>:
                                                                <></> 
                                                            }
                                                        </div>
                                                    </div>*/}

                                                    <div className="form-group row">
                                                        <label htmlFor="montant" className="col-sm-2 col-form-label">Reminder N° 1</label>
                                                        <div className="col-sm-10">
                                                            <select 
                                                                className="form-control"
                                                                onChange={ (selected) =>{
                                                                    this.setState({
                                                                        reminder_one: selected.target.value,
                                                                        valid_client: true
                                                                    });
                                                                }}
                                                            >
                                                                {this.state.remindermeans.map((remindermean, idx) =>{
                                                                    return (
                                                                        <>
                                                                            <option value={remindermean.id}>{remindermean.reminder_mean_name}</option>
                                                                                    
                                                                        </>
                                                                    )
                                                                    }
                                                                )
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="montant" className="col-sm-2 col-form-label">Reminder N° 2</label>
                                                        <div className="col-sm-10">
                                                            <select 
                                                                className="form-control"
                                                                onChange={ (selected) =>{
                                                                    this.setState({
                                                                        reminder_two: selected.target.value,
                                                                        valid_client: true
                                                                    });
                                                                }}
                                                            >
                                                                {this.state.remindermeans.map((remindermean, idx) =>{
                                                                    return (
                                                                        <>
                                                                            <option value={remindermean.id}>{remindermean.reminder_mean_name}</option>
                                                                                    
                                                                        </>
                                                                    )
                                                                    }
                                                                )
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                    <label htmlFor="montant" className="col-sm-2 col-form-label">Reminder N° 3</label>
                                                    <div className="col-sm-10">
                                                        <select 
                                                            className="form-control"
                                                            onChange={ (selected) =>{
                                                                this.setState({
                                                                    reminder_three: selected.target.value,
                                                                    valid_client: true
                                                                });
                                                            }}
                                                        >
                                                            {this.state.remindermeans.map((remindermean, idx) =>{
                                                                return (
                                                                    <>
                                                                        <option value={remindermean.id}>{remindermean.reminder_mean_name}</option>
                                                                                
                                                                    </>
                                                                )
                                                                }
                                                            )
                                                            }
                                                        </select>
                                                    </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        
                                                        <div className="col-sm-10">
                                                            {this.state.submitted && !this.state.valid_deadlines_amount && this.state.deadlines_filled ?
                                                                <text className="text-danger mb-2">
                                                                    La somme des montants doit être égale au montant de la dette.
                                                                </text>:
                                                                <></>
                                                            }     
                                                        </div>

                                                        <div className="col-sm-10">
                                                            {this.state.submitted && !this.state.valid_deadlines_date && this.state.deadlines_filled ?
                                                                <text className="text-danger mb-2">
                                                                    Les dates doivent être successives et inférieures à la date finale.
                                                                </text>:
                                                                <></>
                                                            }
                                                        </div>

                                                        <div className="col-sm-10">
                                                            {this.state.submitted && !this.state.deadlines_filled ?
                                                                <text className="text-danger mb-2">
                                                                    Veuillez remplir tous les champs.
                                                                </text>:
                                                                <></>
                                                            }
                                                        </div>

                                                    </div>
                                                    
                                                    
                                                    
                                                </div>{/* /.col-lg-8 connectedSortable */}
                                                <div className="col-lg-6 connectedSortable">
                                                {this.state.input_garants}
                                                <Button 
                                                    variant="link" 
                                                    className="text-decoration-none" 
                                                     
                                                    onClick={this.add_garant_input}
                                                >
                                                    Ajouter un élément garant
                                                </Button>

                                                </div>{/* /.col-lg-4 connectedSortable */}
                                            </div>{/* /.row */}       
                                        </div>{/* /.row */}
                                        </Modal.Body>
                                        
                                            <div className="card-footer">
                                                <Button
                                                    className="btn btn-primary float-right"
                                                    onClick={(e) =>{  
                                                        if(this.can_submit()){
                                                            //this.save_dateliner(this.state.date_liner_number);
                                                            this.setState({modal: true})  
                                                        }
                                                        else {
                                                            this.setState({modal: false})
                                                        }
                                                        
                                                                                                    
                                                        //console.log(this.state.due_date)
                                                        //console.log(this.state.amount_indebted)
                                                    }}  
                                                >
                                                    Add
                                                </Button>
                                                <Button 
                                                     
                                                    className="btn btn-default"
                                                    onClick={(e) =>{  
                                                        this.setState({modal1: false})     
                                                    }} 
                                                >
                                                    Cancel
                                                </Button>
                                            </div>{/* /.card-footer */}
                                        
                                        </form>   
                                </Modal>  
                                {/* Horizontal Form Modal8 added confirmation message*/}
                                <Modal
                                            show={this.state.modal8}
                                            onHide={(e)=>{this.setState({modal8: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Succes</Modal.Title>
                                            </Modal.Header>
                                            <form>
                                            
                                                <Modal.Body>
                                                    The Contract has been successfully added !
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                            this.setState({modal8: false});
                                                            
                                                        }
                                                    }
                                                    >
                                                        Ok
                                                    </button>
                                                </Modal.Footer>
                                            </form>
                                        </Modal>
                                {/*  Modal5 search customer by id*/}
                                <Modal
                                            show={this.state.modal5}
                                            onHide={(e)=>{this.setState({modal5: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Details</Modal.Title>
                                            </Modal.Header>
                                            {this.state.customersinfo
                                            .map((customerinfo, index) => (
                                                <> 
                                                    <Modal.Body> 
                                                        <div>
                                                            <div className="row">
                                                            <label>
                                                                <strong>
                                                                    Total Amount :
                                                                </strong>   
                                                            </label>&nbsp;&nbsp;
                                                            <strong> <i>{customerinfo.timeliner_amount} CFA </i></strong>
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Name :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {customerinfo.name}
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Dateline N°:
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {customerinfo.dateliner_number}
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Dateline Amount :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {customerinfo.dateliner_amount} CFA
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        Start Date :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {moment(customerinfo.timeliner_start_date).format("llll")} 
                                                            </div>
                                                            <div className="row">
                                                                <label>
                                                                    <strong>
                                                                        End Date :
                                                                    </strong>   
                                                                </label>&nbsp;&nbsp;
                                                                {moment(customerinfo.dateliner_end_date).format("llll")}
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                    <Button className="btn btn-success " onClick={(e)=>{this.setState({modal5: false})}}>
                                                        Pay
                                                    </Button>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{ 
                                                        this.setState({modal5: false});                    
                                                        }
                                                        }
                                                    >
                                                        Ok
                                                    </Button>
                                                    </Modal.Footer>
                                                </>
                                            ))          
                                            }  
                                                
                                            
                                        </Modal>
                                {this.state.currentTimeliner ? (
                                    <>  
                                        {/* Horizontal Form Modal2 edit timeliner form*/}
                                        <Modal
                                            show={this.state.modal2}
                                            onHide={(e)=>{this.setState({modal2: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                        
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Timeliner</Modal.Title>
                                            </Modal.Header>
                                                {/* form start */}
                                                <form className="form-horizontal">
                                                <Modal.Body>
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="client" className="col-sm-2 col-form-label">Customer </label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder={this.state.currentTimeliner.name}
                                                                    onChange={(e) =>{
                                                                        if(e.target.value){
                                                                            this.setState({customer_name: e.target.value, valid_reason: true})
                                                                        }
                                                                        else{
                                                                            this.setState({customer_name: e.target.value, valid_reason: false})
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="reason" className="col-sm-2 col-form-label">Reason</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="reason"
                                                                    onChange={(e) =>{
                                                                        if(e.target.value){
                                                                            this.setState({reason: e.target.value, valid_reason: true})
                                                                        }
                                                                        else{
                                                                            this.setState({reason: e.target.value, valid_reason: false})
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
                                                            <label htmlFor="montant" className="col-sm-2 col-form-label">Amount</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                type="number" 
                                                                    className="form-control" 
                                                                    id="motif" 
                                                                    Value={this.state.currentTimeliner.timeliner_amount} 
                                                                    onChange={(e) =>{
                                                                        this.setState({amount_indebted: e.target.value})
                                                                        if (e.target.value){
                                                                            this.setState({valid_amount: true})
                                                                        }
                                                                        else{
                                                                            this.setState({valid_amount:false})
                                                                        }
                                                                    }}
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_amount?
                                                                    <text className="text-danger mb-2">
                                                                        Veuillez entrer le Montant.
                                                                    </text>:
                                                                    <></>
                                                                } 
                                                            </div>
                                                        </div>
                                                        {/* Date and time */}
                                                        <div className="form-group row">
                                                            <label htmlFor="end_date" className="col-sm-2 col-form-label">End Date</label>
                                                            <div className="col-sm-10">
                                                                <DateTimePicker 
                                                                    minDate={this.state.startDate} 
                                                                    onChange={(e) =>{
                                                                        this.setState({due_date: e.date, valid_due_date: true})
                                                                    }}
                                                                    
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_due_date ?
                                                                    <text className="text-danger mb-2">
                                                                        Veuillez entrer la date de l'échéance.
                                                                    </text>:
                                                                    <></>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="dateline_number" className="col-sm-2 col-form-label">Dateline N°</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control" 
                                                                    id="echeance" 
                                                                    placeholder="number of detelines"
                                                                    onChange={(e) => {
                                                                        this.reset_echeance_inputs(e.target.value)
                                                                        if(e.target.value){
                                                                            this.setState({
                                                                                date_liner_number: e.target.value,
                                                                                valid_deadline_number: true
                                                                            });
                                                                        }
                                                                        else{
                                                                            this.setState({
                                                                                date_liner_number: e.target.value,  
                                                                                valid_deadline_number: false
                                                                            });
                                                                        }
                                                                    }} 
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_deadline_number?
                                                                    <text className="text-danger mb-2">
                                                                        Veuillez entrer le nombre de l'échéance.
                                                                    </text>:
                                                                    <></>
                                                                }
                                                            </div>
                                                            {this.state.input_echeances}
                                                        </div>
                                                        
                                                        <div className="form-group row">
                                                            <label htmlFor="montant" className="col-sm-2 col-form-label">Reminder N°</label>
                                                            <div className="col-sm-10">
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control" 
                                                                    id="motif" 
                                                                    placeholder="nombre de relances" 
                                                                    onChange={(e) =>{
                                                                        if(e.target.value){
                                                                            this.setState({reminder_number: e.target.value, valid_reminder_number:true})
                                                                        }
                                                                        else{
                                                                            this.setState({reminder_number: e.target.value, valid_reminder_number:false})
                                                                        }
                                                                    }}
                                                                />
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_reminder_number?
                                                                    <text className="text-danger mb-2">
                                                                        Veuillez entrer le nombre de relance.
                                                                    </text>:
                                                                    <></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>{/* /.card-body */}
                                                </Modal.Body>
                                                
                                                    <div className="card-footer">
                                                        <Button
                                                            className="btn btn-primary float-right"
                                                            onClick={(e) =>{  
                                                                if(this.can_submit()){
                                                                    this.setState({modal4: true})  
                                                                }
                                                                else {
                                                                    this.setState({modal4: false})
                                                                }
                                                                //this.save_dateliner(this.state.date_liner_number)
                                                                                                            
                                                                //console.log(this.state.due_date)
                                                                //console.log(this.state.amount_indebted)
                                                            }}  
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            
                                                            className="btn btn-default"
                                                            onClick={(e) =>{  
                                                                this.setState({modal2: false})     
                                                            }} 
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>{/* /.card-footer */}
                                                
                                                </form>   
                                        </Modal>
                                        
                                        {/* Modal3 delete timeliner */}
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
                                                    Delete {this.state.currentTimeliner.name}'s Timeliner ?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal3: false})}}>
                                                        Annuler
                                                    </Button>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                            this.setState({modal3: false});
                                                            this.delete_timeliner(this.state.currentTimeliner.timeliner_id);
                                                            this.delete_datebytimeliner(this.state.currentTimeliner.timeliner_id);   
                                                        }
                                                    }
                                                    >
                                                        Ok
                                                    </Button>
                                                </Modal.Footer>
                                            </form>
                                        </Modal>

                                        {/* Horizontal Form Modal4 edit confirmation*/}
                                        <Modal
                                            show={this.state.modal4}
                                            onHide={(e)=>{this.setState({modal4: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation</Modal.Title>
                                            </Modal.Header>
                                            <form>
                                            
                                                <Modal.Body>
                                                    Edit {this.state.currentTimeliner.name}'s Timeliner ?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal4: false})}}>
                                                        Annuler
                                                    </Button>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                            this.setState({modal4: false});
                                                            this.setState({modal2: false});
                                                            this.update_timeliner(this.state.currentTimeliner.timeliner_id);
                                                            
                                                        }
                                                    }
                                                    >
                                                        Ok
                                                    </Button>
                                                </Modal.Footer>
                                            </form>
                                        </Modal>

                                        {/* Modal6 pay bill timeliner */}
                                        <Modal
                                            show={this.state.modal6}
                                            onHide={(e)=>{this.setState({modal6: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation</Modal.Title>
                                            </Modal.Header>
                                            <>
                                            
                                                <Modal.Body>
                                                    <p> telechargement en cours...</p>
                                                    <iframe src={`http://localhost:8080/dateliner/pdf/timeliners/${this.state.currentTimeliner.timeliner}/${this.state.currentTimeliner.dateliner_id}`}
                                                        id="frame"
                                                        frameBorder="0" className="w-100"
                                                        onLoad={(e)=>{
                                                            let frame = document.getElementById('frame');
                                                            let contentWindow = frame.contentWindow;
                                                            contentWindow.postMessage('height','*');
                                                            //frame.style.height = doc.body.scrollHeight + 12 + 'px';
                                                        }}>
                                                            
                                                    </iframe>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal6: false})}}>
                                                        Annuler
                                                    </Button>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                            this.pay_dateliner(this.state.currentTimeliner.timeliner, this.state.currentTimeliner.dateliner_id);
                                                            console.log(this.state.currentTimeliner.timeliner, this.state.currentTimeliner.dateliner_id);
                                                            this.setState({modal6: false});
                                                               
                                                        }
                                                    }
                                                    >
                                                        Ok
                                                    </Button>
                                                </Modal.Footer>
                                            </>
                                        </Modal>
                                        {/* Horizontal Form Modal7 contract confirmation*/}
                                        <Modal
                                            show={this.state.modal7}
                                            onHide={(e)=>{this.setState({modal7: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                            size="xl"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Contact N° {this.state.currentTimeliner.timeliner_id} </Modal.Title>
                                            </Modal.Header>
                                            
                                            
                                                <Modal.Body>
                                                <p> telechargement en cours...</p>
                                                <iframe src={`http://localhost:8080/dateliner/pdf/timeliners/${this.state.currentTimeliner.timeliner_id}`}
                                                    id="frame"
                                                    frameBorder="0" className="w-100"
                                                    onLoad={(e)=>{
                                                        let frame = document.getElementById('frame');
                                                        let contentWindow = frame.contentWindow;
                                                        contentWindow.postMessage('height','*');
                                                        //frame.style.height = doc.body.scrollHeight + 12 + 'px';
                                                    }}>
                                                        
                                                </iframe>
                                                
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                            this.setState({modal7: false})
                                                            
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
    )
  }
}

export default Timeliner; 
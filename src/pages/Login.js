import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';
import Navbar from '../components/Navbar/Navbar';
import Section0 from '../components/Section/Section0';
import Footer from '../components/Footer/Footer';
import "./Login.css"


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,

            //user
            name:"",
            surname:"",
            pass:"",
            email:"",

            //Passwword visibility
            showPassword: false,

            //check inputs
            submitted: false,
            valid_name: false,
            valid_surname: false,
            valid_pass: false,
            valid_email: false,
            valid_password: false,
            valid_username: false,
        }

        this.can_submit = this.can_submit.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.save_user = this.save_user.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    can_submit(){
        let that = this;
        let flag = that.state.valid_name && that.state.valid_surname && that.state.valid_pass && that.state.valid_email;
        this.setState({ submitted: true});
        return flag;
        
    }

    togglePassword(){
        let pw = !this.state.showPassword
        this.setState({showPassword: pw});
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                console.log(response.data)
                window.localStorage.setItem("token", AuthenticationService.createJWTToken(response.data));
                window.localStorage.setItem("username", this.state.username);
                this.props.history.push(`/home`);
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    save_user(){
        let that = this;
        let data = {
            username: that.state.name,
            surname: that.state.surname,
            email: that.state.email,
            password: that.state.pass,   
        }
        UserService.create(data)
        .then(response => { 
           // this.setState({timeliner: response.data.id});
            console.log(response.data)    
        })
        .catch(e =>{
            console.log(e);
        });
    }

    render() {
        return (
            <div>
            <Navbar />
                <div className="">
                    <section className="My-container">
                        <section className="">
                            <div className="">
                                <div className='container'> 
                                    <div className='first-container'>  
                                        <div className="card-header" ><h2>YOWYOB DATELINER</h2> </div>
                                        
                                        <div className="form-horizontal ">
                                                <div className="card-body">  
                                                    <button 
                                                        className="col-md-3 btn btn-secondary" 
                                                        //onClick={this.loginClicked}
                                                        onClick={(e) =>{  
                                                            this.setState({modal2: true})     
                                                        }} 
                                                        >
                                                        Login
                                                    </button> &nbsp;&nbsp;
                                                    <button 
                                                        className="col-md-3 btn btn-secondary" 
                                                        onClick={(e) =>{  
                                                            this.setState({modal: true, submitted: false})     
                                                        }} 
                                                        >
                                                        Sign in
                                                    </button> 
                                                </div>
                                        </div>
                                    </div>     
                                    <Section0 />
                                </div>
                                    <Footer />   
                                    <div className="col-md-12">
                                        {/* Horizontal Form Modal log in  user Modal 2 */}
                                        <Modal
                                            show={this.state.modal2}
                                            onHide={(e)=>{this.setState({modal2: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                            
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title> Login  Form </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                
                                                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                                                <form className="form-horizontal">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="username" className="col-sm-3 col-form-label">User Name: </label>
                                                            <div className="col-sm-9">
                                                                <input 
                                                                    type="text" 
                                                                    name="username"
                                                                    className="form-control" 
                                                                    value={this.state.username} 
                                                                    onChange={this.handleChange}
                                                                     
                                                                />
                                                                
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_username?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the Username
                                                                    </text>:
                                                                    <></>
                                                                } 
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="name" className="col-sm-3 col-form-label">Password: </label>
                                                            <div className="input-group col-sm-9">
                                                                <input 
                                                                    type={this.state.showPassword ? "text" : "password"} 
                                                                    //type="password"
                                                                    name="password" 
                                                                    placeholder="password" 
                                                                    className="form-control"
                                                                    value={this.state.password} 
                                                                    onChange={this.handleChange} 
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                        {
                                                                            this.state.showPassword ? 
                                                                            <i class="fas fa-eye" onClick={this.togglePassword}></i> : 
                                                                            <i class="fas fa-eye-slash" onClick={this.togglePassword}></i>
                                                                        }
                                                                    </span>
                                                                </div>
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_password?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the password
                                                                    </text>:
                                                                    <></>
                                                                } 
                                                            </div>
                                                        </div>      
                                                    </div>{/* /.card-body */}
                                                    <div className="card-footer">
                                                        <Button 
                                                            className="btn btn-info" 
                                                            onClick={this.loginClicked}
                                                        >
                                                            Login
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
                                            <Modal.Footer> 
                                                no account ? &nbsp;&nbsp;
                                                <button 
                                                    className="btn btn-info" 
                                                    onClick={(e) =>{  
                                                        this.setState({modal: true, submitted: false})     
                                                    }} 
                                                >
                                                    Sign in 
                                                </button>
                                            </Modal.Footer>  
                                        </Modal>
                                        {/* Horizontal Form Modal add user */}
                                        <Modal
                                            show={this.state.modal}
                                            onHide={(e)=>{this.setState({modal: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                            
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title> Sign In </Modal.Title>
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
                                                                    placeholder="User Name"
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
                                                        <div className="form-group row">
                                                            <label htmlFor="tel" className="col-sm-2 col-form-label">Password</label>
                                                            <div className="input-group col-sm-10">
                                                                <input 
                                                                    type={this.state.showPassword ? "text" : "password"} 
                                                                    className="form-control" 
                                                                    id="tel" 
                                                                    placeholder="password" 
                                                                    onChange={(e) =>{
                                                                        this.setState({pass: e.target.value})
                                                                        if (e.target.value){
                                                                            this.setState({valid_pass: true})
                                                                        }
                                                                        else{
                                                                            this.setState({valid_pass:false})
                                                                        }
                                                                    }}
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                        {
                                                                            this.state.showPassword ? 
                                                                            <i class="fas fa-eye" onClick={this.togglePassword}></i> : 
                                                                            <i class="fas fa-eye-slash" onClick={this.togglePassword}></i>
                                                                        }
                                                                    </span>
                                                                </div>
                                                                { //verif des données
                                                                    this.state.submitted && !this.state.valid_pass?
                                                                    <text className="text-danger mb-2">
                                                                        Please enter the phone number
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
                                                                    this.setState({modal1: true})
                                                                }else {
                                                                    this.setState({modal1: false})
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

                                        {/* Horizontal Form Modal1 add user confirmation*/}
                                        <Modal
                                            show={this.state.modal1}
                                            onHide={(e)=>{this.setState({modal1: false})}}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation</Modal.Title>
                                            </Modal.Header>
                                            <>                
                                                <Modal.Body>
                                                    Sign In ?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="btn btn-default float-right" onClick={(e)=>{this.setState({modal1: false})}}>
                                                        Annuler
                                                    </Button>
                                                    <Button type='submit' className="btn btn-primary" onClick={(e)=>{
                                                        this.save_user();
                                                        this.setState({modal1: false});
                                                        this.setState({modal: false});
                                                                        
                                                        }
                                                        }
                                                    >
                                                        Ok
                                                    </Button>
                                                </Modal.Footer>
                                            </>
                                        </Modal>
                                    </div>
                            </div>
                        </section>    
                    </section>    
                </div>    
            </div>
        )
    }
}

export default Login;
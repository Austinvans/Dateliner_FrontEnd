import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state ={
            isMobile: false,    
        }
    
      }

    render() {
        return (
            <nav className='my-navbar'>
               
               <h3 className='logo'>  DATELINER </h3>
               <ul className= {this.state.isMobile ? 'nav-links-mobile' : 'nav-links'} 
                onClick={() => this.setState({isMobile:false})}
               >
                    <Link to="/home" className='home'>
                            <li> HOME </li>
                    </Link>
                    <Link to="/" className='service'>
                            <li> SERVICE </li>
                    </Link>
                    <Link to="/" className='contact'>
                            <li> CONTACT </li>
                    </Link>
                    <Link to="/" className='sign-in'>
                            <li> SIGN IN </li>
                    </Link>

               </ul>
               <button className='mobile-menu-icon'
                    onClick={() => this.setState({isMobile:!this.state.isMobile})}
               >
                { this.state.isMobile ? (
                        <i className='fas fa-times'> </i>
                    ) : (
                        <i className='fas fa-bars'> </i>
                    )
                }
               </button>
            
                
            </nav>
        );
    }
}

export default Navbar;
import React, { Component } from 'react'
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className='my-footer'>
        <footer classname="main-footer">
          <div className='my-footer-content'>
            <div className='my-footer-sub-content'>
              <h2>
                  A PROPOS
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Aperiam optio accusantium, non omnis atque debitis voluptas earum beatae, itaque, 
                totam ratione temporibus officiis dicta? 
                Laboriosam eos placeat nulla excepturi animi!
              </p> 
            </div>
            <div className='my-footer-sub-content'>
              <h2>
                  NOS SERVICES
              </h2>
              <ul>
                <li className="nav-icon fas fa-copy"> Gestion des Créances </li>
                <li className="nav-icon fas fa-envelope"> Gestion des Relances </li>
                <li className="nav-icon fas fa-users"> Gestion des Customers </li>
              </ul> 
            </div>
            <div className='my-footer-sub-content'>
              <h2>
                  CONTACTS
              </h2>
              <ul>
                <li className="nav-icon fas fa-phone"> +237 6 96 24 27 70  </li>
                <li className="nav-icon fas fa-envelope"> yowyobdateliner@gmail.com </li>
                <li className="nav-icon fas fa-globe"> YowYob DateLiner</li>
                
              </ul> 
            </div>
             
          </div>
          <div className="my-footer-content-0">
            <strong>Copyright © 2022 <a href="/home">YOWYOB DATELINER</a>.</strong>
              All rights reserved.
            <b>Version</b> 1.0.0
          </div>
        </footer> 
      </div>

    )
  }
}

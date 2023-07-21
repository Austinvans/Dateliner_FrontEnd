import React, {useState, useEffect} from 'react'; 
import TimelinerService from '../services/TimelinerService';

const Menu = () => {
    const [timeliners, setTimeliners] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [username, setUsername] = useState(window.localStorage.getItem("username"));

    useEffect(() => {
        retrieveTimeliners();
        retrieveDeadlines();
      }, []);

    const retrieveTimeliners = () => {
        TimelinerService.getAll()
          .then(response => {
            setTimeliners(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });
    };

    const retrieveDeadlines = () => {
        TimelinerService.getAllExpiredStatus()
          .then(response => {
            setDeadlines(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });

    }
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
            <img src="dist/img/logo_Y.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">YowYob DateLiner </span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                <img src="dist/img/avatar4.png" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                <a href="#" className="d-block">{username}</a>
                </div>
            </div>
            {/* SidebarSearch Form */}
            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                    </button>
                </div>
                </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}
                    <li className="nav-item">
                        <a href="/home" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>
                            Dashboard
                        </p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/contracts" className="nav-link">
                            <i className="nav-icon fas fa-copy" />
                            <p>
                                Echéancier
                                <span className="badge badge-info right">{timeliners.length}</span>
                            </p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/customers" className="nav-link">
                        <i className="nav-icon fas fa-users" />
                        <p>
                            Customers
                        </p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/reminders" className="nav-link">
                            <i className="nav-icon far fa-envelope" />
                            <p>
                                Reminder
                                <span className="badge badge-danger right">{deadlines.length}</span>
                            </p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-money-bill" />
                        <p>
                            Bill
                        </p>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-gear" />
                        <p>
                            Settings
                            <i className="right fas fa-angle-left" />
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <i className="nav-icon fas fa-user" />
                                <p>
                                    Profil 
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                            <i className="nav-icon fas fa-money-bill-wave" />
                            <p>
                                Payment
                            </p>
                            </a>
                            
                        </li>
                    </ul>
                </li>
                
                
                

                <li className="nav-item">
                    <a href="/about" className="nav-link">
                    <i className="nav-icon far fa-envelope" />
                    <p>
                        Entreprise
                    </p>
                    </a>
                </li>
               
                
                
            </ul>
            </nav>
            {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
        </div>
    );
};

export default Menu;
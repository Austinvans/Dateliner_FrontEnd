import React, {useState, useEffect} from 'react'; 
import moment from 'moment';
import TimelinerService from '../services/TimelinerService';
import DatelinerService from '../services/DatelinerService';
import CustomerService from '../services/CustomerService';
import DatelinerByTimelinerService from '../services/DatelinerByTimelinerService';
import RingLoader from "react-spinners/RingLoader";

const Dashboard = () => {

    const [timeliners, setTimeliners] = useState([]);
    const [currentTimeliner, setCurrentTimeliner] = useState(null);
    const [currentDateliner, setCurrentDateliner] = useState(null);
    const [dateliners, setDateliners] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [datebytimeliners, setDateByTimeliners] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [currentIndex, setCurrentIndex] = useState(-1);
    const[loading, setLoading] = useState(false);
    

    useEffect(() => {
        retrieveTimeliners();
        retrieveDateliners();
        retrieveCustomers();
        retrieveDateByTimeliners();
        retrieveDeadlines();
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        }, 1000)
      }, []);

      const onChangeSearchId= e => {
        const searchId= e.target.value;
        setSearchId(searchId);
      };

      const setActiveTimeliner = (timeliner, index) => {
          setCurrentTimeliner(timeliner);
          setCurrentIndex(index);
      };

      const setActiveDateliner = (dateliner, index) => {
        setCurrentDateliner(dateliner);
        setCurrentIndex(index);
    };

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

    const retrieveCustomers = () => {
        CustomerService.getAll()
        .then(response => { 
            setCustomers(response.data); 
            console.log(response.data) 
        })
        .catch(e =>{
            console.log(e);
        });
    }

    const retrieveDateliners = () => {
        DatelinerService.getAll()
        .then(response => { 
            setDateliners(response.data); 
            console.log(response.data) 
        })
        .catch(e =>{
            console.log(e);
        });
    }

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
    const retrieveDateByTimeliners = () => {
        DatelinerByTimelinerService.getAll()
          .then(response => {
            setDateByTimeliners(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });
    };

    const findById = () => {
        TimelinerService.findById(searchId)
          .then(response => {
            setTimeliners(response.data);
            console.log(response.data.id);
          })
          .catch(e => {
            console.log(e);
          });
    
    }
  
    return (
        <div>
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard </li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                <div className="container-fluid">
                    {/* Small boxes (Stat box) */}
                    <div className="row">
                    <div className="col-lg-3 col-6">
                        {/* small box */}
                        <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{timeliners.length}</h3>
                            <p>Timeliners</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fas fa-copy" />
                        </div>
                        <a href="/contracts" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-3 col-6">
                        {/* small box */}
                        <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{datebytimeliners.length /*<sup style={{fontSize: 20}}>%</sup>*/}</h3>
                            <p>Dateliners</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fas fa-clock" />
                        </div>
                        <a href="/contracts" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-3 col-6">
                        {/* small box */}
                        <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{customers.length}</h3>
                            <p>Customers</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fas fa-user" />
                        </div>
                        <a href="/customers" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>
                    {/* ./col */}
                    <div className="col-lg-3 col-6">
                        {/* small box */}
                        <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{deadlines.length}</h3>
                            <p>Deadlines</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fas fa-bell" />
                        </div>
                        <a href="/reminders" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>
                    {/* ./col */}
                    </div>
                    {/* /.row */}
                    
                    {/* Main row */}
                    <div className="row">
                    {/* Left col */}
                    <section className="col-lg-8 connectedSortable">
                        {/* /.row start table timeliners */}
                        <div className="row">
                        <div className="col-12">
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"> Timeliners </h3>
                                <div className="card-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    
                                    
                                </div>
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body table-responsive p-0" style={{height: 300}}>
                                <table className="table table-head-fixed table-hover text-nowrap">
                                <thead>
                                    <tr>
                                    <th>User</th>
                                    <th>Amount</th>
                                    <th>Start-Date</th>
                                    <th>End-Date</th>
                                    <th>Dateliner</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                {
                                    timeliners
                                    .sort((a, b) => new Date(b.timeliner_start_date).getTime() - new Date(a.timeliner_start_date).getTime())
                                    .map((timeliner, index) => (
                                        <tr 
                                            className={(index === currentIndex ? "Active" : "" )}
                                            onClick={() => setActiveTimeliner(timeliner, index)}
                                            key={index}
                                        >  
                                            <td>{timeliner.name}</td> 
                                            <td>{timeliner.timeliner_amount}</td> 
                                            <td>{moment(timeliner.timeliner_start_date).format("llll")}</td>   
                                            <td>{moment(timeliner.timeliner_end_date).format("llll")}</td>   
                                            <td>{timeliner.dateliner_number}</td> 
                                            <td>
                                                <i 
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
                        {/* /.row end table timeliners */}

                        {/* /.row start table dateliners */}
                        <div className="row">
                        <div className="col-12">
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"> Dateliners </h3>
                                <div className="card-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    
                                </div>
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body table-responsive p-0" style={{height: 300}}>
                                <table className="table table-head-fixed table-hover text-nowrap">
                                <thead>
                                    <tr>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Start-Date</th>
                                    <th>End-Date</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                {
                                    datebytimeliners
                                    .sort((a, b) => new Date(b.timeliner_start_date).getTime() - new Date(a.timeliner_start_date).getTime())
                                    .map((dateliner, index) => (
                                        <tr 
                                            className={(index === currentIndex ? "Active" : "" )}
                                            onClick={() => setActiveDateliner(dateliner, index)}
                                            key={index}
                                        >  
                                            <td>{dateliner.name}</td> 
                                            <td>{dateliner.dateliner_amount}</td> 
                                            <td>{moment(dateliner.dateliner_start_date).format("llll")}</td>   
                                            <td>{moment(dateliner.dateliner_end_date).format("llll")}</td>     
                                            <td> 
                                                <i 
                                                    className={
                                                        dateliner.dateliner_status==="Expired"? "text-danger": 
                                                        dateliner.dateliner_status==="OnGoing"? "text-info":
                                                        dateliner.dateliner_status==="Done"? "text-success": 
                                                        ""
                                                    }
                                                > 
                                                    {dateliner.dateliner_status} 
                                                </i>
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

                    </section>
                    {/* /.Left col */}
                    {/* right col (We are only adding the ID to make the widgets sortable)*/}
                    <section className="col-lg-4 connectedSortable">
                        {/* Map card */}
                        <div className="card bg-gradient-secondary">
                        <div className="card-header border-0">
                            <h3 className="card-title">
                            <i className="nav-icon fas fa-copy" /> 
                                Timeliners
                            </h3>
                            {/* card tools */}
                            <div className="card-tools">
                                <button type="button" className="btn btn-secondary btn-sm daterange" title="Date range">
                                    <i className="far fa-calendar-alt" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-sm" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                            {/* /.card-tools */}
                        </div>
                        
                        <div className="card-body">
                            {currentTimeliner ? (
                                <div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Customer :
                                            </strong>   
                                        </label>{" "}
                                        {currentTimeliner.name}
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Amount :
                                            </strong>   
                                        </label>{" "}
                                        {currentTimeliner.timeliner_amount} XAF
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Start Date :
                                            </strong>   
                                        </label>{" "}
                                        {moment(currentTimeliner.timeliner_start_date).format("llll")} 
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                End Date :
                                            </strong>   
                                        </label>{" "}
                                        {moment(currentTimeliner.timeliner_end_date).format("llll")}  
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Status :
                                            </strong>   
                                        </label>
                                        {currentTimeliner.status}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Please click on a Timeliner...
                                            </strong>   
                                        </label> 
                                    </div>
                                </div>
                            )}
                            
                            {/*<div id="world-map" style={{height: 250, width: '100%'}} />*/}   
                        </div>
                        {/* /.card-body*/}
                        <div className="card-footer bg-transparent">
                            <div className="row">
                            {/*<div className="col-4 text-center">
                                <div id="sparkline" />
                                <div className="text-white">
                                    <button className="btn btn-success">
                                        ADD
                                    </button>
                                </div>
                            </div>
                            ./col */}
                            {/*<div className="col-4 text-center">
                                <div id="sparkline-2" />
                                <div className="text-white">
                                    <button className="btn btn-warning">
                                        EDIT
                                    </button>
                                </div>
                            </div>
                            ./col */}
                            {/*<div className="col-4 text-center">
                                <div id="sparkline-3" />
                                <div className="text-white">
                                    <button className="btn btn-danger">
                                        DELETE
                                    </button>
                                </div>
                            </div>
                            ./col */}
                            </div>
                            {/* /.row */}
                        </div>
                        </div>
                        {/* /.card */}
                        <div className="card bg-gradient-secondary">
                        <div className="card-header border-0">
                            <h3 className="card-title">
                            <i className="nav-icon fas fa-copy" /> 
                                Dateliners
                            </h3>
                            {/* card tools */}
                            <div className="card-tools">
                                <button type="button" className="btn btn-secondary btn-sm daterange" title="Date range">
                                    <i className="far fa-calendar-alt" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-sm" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                            {/* /.card-tools */}
                        </div>
                        
                        <div className="card-body">
                            {currentDateliner ? (
                                <div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Customer :
                                            </strong>   
                                        </label>{" "}
                                        {currentDateliner.name}
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Amount :
                                            </strong>   
                                        </label>{" "}
                                        {currentDateliner.dateliner_amount} XAF
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Start Date :
                                            </strong>   
                                        </label>{" "}
                                        {moment(currentDateliner.dateliner_start_date).format("llll")} 
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                End Date :
                                            </strong>   
                                        </label>{" "}
                                        {moment(currentDateliner.dateliner_end_date).format("llll")}  
                                    </div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Status :
                                            </strong>   
                                        </label>
                                        {currentDateliner.dateliner_status}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="row">
                                        <label>
                                            <strong>
                                                Please click on a Dateliner...
                                            </strong>   
                                        </label> 
                                    </div>
                                </div>
                            )}
                            
                            {/*<div id="world-map" style={{height: 250, width: '100%'}} />*/}   
                        </div>
                        {/* /.card-body*/}
                        <div className="card-footer bg-transparent">
                            <div className="row">
                            <div className="col-4 text-center">
                                
                            </div>
                            {/* ./col */}
                            {/*<div className="col-4 text-center">
                                <div id="sparkline-2" />
                                <div className="text-white">
                                    <button className="btn btn-warning">
                                        EDIT
                                    </button>
                                </div>
                            </div>
                            ./col */}
                            {/*<div className="col-4 text-center">
                                <div id="sparkline-3" />
                                <div className="text-white">
                                    <button className="btn btn-danger">
                                        DELETE
                                    </button> 
                                </div>
                            </div>
                            ./col */}
                            </div>
                            {/* /.row */}
                        </div>
                        </div>
                        {/* solid sales graph */}
                        
                    </section>
                    {/* right col */}
                    </div>
                    {/* /.row (main row) */}
                </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
                </div>
        </div>

    )
  
}
export default Dashboard;
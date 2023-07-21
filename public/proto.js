{/* Custom tabs (Charts with tabs)*/}
<div className="card">
<div className="card-header">
    <h3 className="card-title">
    <i className="fas fa-chart-pie mr-1" />
    Sales
    </h3>
    <div className="card-tools">
    <ul className="nav nav-pills ml-auto">
        <li className="nav-item">
        <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
        </li>
    </ul>
    </div>
</div>{/* /.card-header */}
<div className="card-body">
    <div className="tab-content p-0">
    {/* Morris chart - Sales */}
    <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}}>
        <canvas id="revenue-chart-canvas" height={300} style={{height: 300}} />
    </div>
    <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}}>
        <canvas id="sales-chart-canvas" height={300} style={{height: 300}} />
    </div>
    </div>
</div>{/* /.card-body */}
</div>
{/* /.card */}



                        {/* DIRECT CHAT */}
                        <div className="card direct-chat direct-chat-primary">
                        <div className="card-header">
                            <h3 className="card-title">Direct Chat</h3>
                            <div className="card-tools">
                            <span title="3 New Messages" className="badge badge-primary">3</span>
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                                <i className="fas fa-comments" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                                <i className="fas fa-times" />
                            </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            {/* Conversations are loaded here */}
                            <div className="direct-chat-messages">
                            {/* Message. Default to the left */}
                            <div className="direct-chat-msg">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-left">Alexander Pierce</span>
                                <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
                                </div>
                                {/* /.direct-chat-infos */}
                                <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                                {/* /.direct-chat-img */}
                                <div className="direct-chat-text">
                                Is this template really for free? That's unbelievable!
                                </div>
                                {/* /.direct-chat-text */}
                            </div>
                            {/* /.direct-chat-msg */}
                            {/* Message to the right */}
                            <div className="direct-chat-msg right">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-right">Sarah Bullock</span>
                                <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                                </div>
                                {/* /.direct-chat-infos */}
                                <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                                {/* /.direct-chat-img */}
                                <div className="direct-chat-text">
                                You better believe it!
                                </div>
                                {/* /.direct-chat-text */}
                            </div>
                            {/* /.direct-chat-msg */}
                            {/* Message. Default to the left */}
                            <div className="direct-chat-msg">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-left">Alexander Pierce</span>
                                <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
                                </div>
                                {/* /.direct-chat-infos */}
                                <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                                {/* /.direct-chat-img */}
                                <div className="direct-chat-text">
                                Working with AdminLTE on a great new app! Wanna join?
                                </div>
                                {/* /.direct-chat-text */}
                            </div>
                            {/* /.direct-chat-msg */}
                            {/* Message to the right */}
                            <div className="direct-chat-msg right">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-right">Sarah Bullock</span>
                                <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
                                </div>
                                {/* /.direct-chat-infos */}
                                <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                                {/* /.direct-chat-img */}
                                <div className="direct-chat-text">
                                I would love to.
                                </div>
                                {/* /.direct-chat-text */}
                            </div>
                            {/* /.direct-chat-msg */}
                            </div>
                            {/*/.direct-chat-messages*/}
                            {/* Contacts are loaded here */}
                            <div className="direct-chat-contacts">
                            <ul className="contacts-list">
                                <li>
                                <a href="#">
                                    <img className="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar" />
                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Count Dracula
                                        <small className="contacts-list-date float-right">2/28/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">How have you been? I was...</span>
                                    </div>
                                    {/* /.contacts-list-info */}
                                </a>
                                </li>
                                {/* End Contact Item */}
                                <li>
                                <a href="#">
                                    <img className="contacts-list-img" src="dist/img/user7-128x128.jpg" alt="User Avatar" />
                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Sarah Doe
                                        <small className="contacts-list-date float-right">2/23/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">I will be waiting for...</span>
                                    </div>
                                    {/* /.contacts-list-info */}
                                </a>
                                </li>
                                {/* End Contact Item */}
                                <li>
                                <a href="#">
                                    <img className="contacts-list-img" src="dist/img/user3-128x128.jpg" alt="User Avatar" />
                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Nadia Jolie
                                        <small className="contacts-list-date float-right">2/20/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">I'll call you back at...</span>
                                    </div>
                                    {/* /.contacts-list-info */}
                                </a>
                                </li>
                                {/* End Contact Item */}
                                <li>
                                <a href="#">
                                    <img className="contacts-list-img" src="dist/img/user5-128x128.jpg" alt="User Avatar" />
                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Nora S. Vans
                                        <small className="contacts-list-date float-right">2/10/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">Where is your new...</span>
                                    </div>
                                    {/* /.contacts-list-info */}
                                </a>
                                </li>
                                {/* End Contact Item */}
                                <li>
                                <a href="#">
                                    <img className="contacts-list-img" src="dist/img/user6-128x128.jpg" alt="User Avatar" />
                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        John K.
                                        <small className="contacts-list-date float-right">1/27/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">Can I take a look at...</span>
                                    </div>
                                    {/* /.contacts-list-info */}
                                </a>
                                </li>
                                {/* End Contact Item */}
                                <li>
                                <a href="#">
                                    <img className="contacts-list-img" src="dist/img/user8-128x128.jpg" alt="User Avatar" />
                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Kenneth M.
                                        <small className="contacts-list-date float-right">1/4/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">Never mind I found...</span>
                                    </div>
                                    {/* /.contacts-list-info */}
                                </a>
                                </li>
                                {/* End Contact Item */}
                            </ul>
                            {/* /.contacts-list */}
                            </div>
                            {/* /.direct-chat-pane */}
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                            <form action="#" method="post">
                            <div className="input-group">
                                <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                                <span className="input-group-append">
                                <button type="button" className="btn btn-primary">Send</button>
                                </span>
                            </div>
                            </form>
                        </div>
                        {/* /.card-footer*/}
                        </div>
                        {/*/.direct-chat */}
                        {/* TO DO List */}
                        <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                            <i className="ion ion-clipboard mr-1" />
                            To Do List
                            </h3>
                            <div className="card-tools">
                            <ul className="pagination pagination-sm">
                                <li className="page-item"><a href="#" className="page-link">«</a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">»</a></li>
                            </ul>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <ul className="todo-list" data-widget="todo-list">
                            <li>
                                {/* drag handle */}
                                <span className="handle">
                                <i className="fas fa-ellipsis-v" />
                                <i className="fas fa-ellipsis-v" />
                                </span>
                                {/* checkbox */}
                                <div className="icheck-primary d-inline ml-2">
                                <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                                <label htmlFor="todoCheck1" />
                                </div>
                                {/* todo text */}
                                <span className="text">Design a nice theme</span>
                                {/* Emphasis label */}
                                <small className="badge badge-danger"><i className="far fa-clock" /> 2 mins</small>
                                {/* General tools such as edit or delete*/}
                                <div className="tools">
                                <i className="fas fa-edit" />
                                <i className="fas fa-trash-o" />
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v" />
                                <i className="fas fa-ellipsis-v" />
                                </span>
                                <div className="icheck-primary d-inline ml-2">
                                <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                                <label htmlFor="todoCheck2" />
                                </div>
                                <span className="text">Make the theme responsive</span>
                                <small className="badge badge-info"><i className="far fa-clock" /> 4 hours</small>
                                <div className="tools">
                                <i className="fas fa-edit" />
                                <i className="fas fa-trash-o" />
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v" />
                                <i className="fas fa-ellipsis-v" />
                                </span>
                                <div className="icheck-primary d-inline ml-2">
                                <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                                <label htmlFor="todoCheck3" />
                                </div>
                                <span className="text">Let theme shine like a star</span>
                                <small className="badge badge-warning"><i className="far fa-clock" /> 1 day</small>
                                <div className="tools">
                                <i className="fas fa-edit" />
                                <i className="fas fa-trash-o" />
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v" />
                                <i className="fas fa-ellipsis-v" />
                                </span>
                                <div className="icheck-primary d-inline ml-2">
                                <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                                <label htmlFor="todoCheck4" />
                                </div>
                                <span className="text">Let theme shine like a star</span>
                                <small className="badge badge-success"><i className="far fa-clock" /> 3 days</small>
                                <div className="tools">
                                <i className="fas fa-edit" />
                                <i className="fas fa-trash-o" />
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v" />
                                <i className="fas fa-ellipsis-v" />
                                </span>
                                <div className="icheck-primary d-inline ml-2">
                                <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                                <label htmlFor="todoCheck5" />
                                </div>
                                <span className="text">Check your messages and notifications</span>
                                <small className="badge badge-primary"><i className="far fa-clock" /> 1 week</small>
                                <div className="tools">
                                <i className="fas fa-edit" />
                                <i className="fas fa-trash-o" />
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v" />
                                <i className="fas fa-ellipsis-v" />
                                </span>
                                <div className="icheck-primary d-inline ml-2">
                                <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                                <label htmlFor="todoCheck6" />
                                </div>
                                <span className="text">Let theme shine like a star</span>
                                <small className="badge badge-secondary"><i className="far fa-clock" /> 1 month</small>
                                <div className="tools">
                                <i className="fas fa-edit" />
                                <i className="fas fa-trash-o" />
                                </div>
                            </li>
                            </ul>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer clearfix">
                            <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus" /> Add item</button>
                        </div>
                        </div>
                        {/* /.card */}

{/* Calendar */}
<div className="card bg-gradient-success">
<div className="card-header border-0">
    <h3 className="card-title">
    <i className="far fa-calendar-alt" />
    Calendar
    </h3>
    {/* tools card */}
    <div className="card-tools">
    {/* button with a dropdown */}
    <div className="btn-group">
        <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
        <i className="fas fa-bars" />
        </button>
        <div className="dropdown-menu" role="menu">
        <a href="#" className="dropdown-item">Add new event</a>
        <a href="#" className="dropdown-item">Clear events</a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">View calendar</a>
        </div>
    </div>
    <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
        <i className="fas fa-minus" />
    </button>
    <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
        <i className="fas fa-times" />
    </button>
    </div>
    {/* /. tools */}
</div>
{/* /.card-header */}
<div className="card-body pt-0">
    {/*The calendar */}
    <div id="calendar" style={{width: '100%'}} />
</div>
{/* /.card-body */}
</div>
{/* /.card */}
{/* les knobs */}

<div className="card-footer bg-transparent">
                            <div className="row">
                            <div className="col-4 text-center">
                                <input type="text" className="knob" data-readonly="true" defaultValue={75} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                                <div className="text-white">Mail-Orders</div>
                            </div>
                            {/* ./col */}
                            <div className="col-4 text-center">
                                <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                                <div className="text-white">Online</div>
                            </div>
                            {/* ./col */}
                            <div className="col-4 text-center">
                                <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                                <div className="text-white">In-Store</div>
                            </div>
                            {/* ./col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.card-footer */}

<div className="card bg-gradient-info">

                        <div className="card-header border-0">
                            <h3 className="card-title">
                            <i className="fas fa-th mr-1" />
                                Upcoming Dateliners
                            </h3>
                            <div className="card-tools">
                            <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
                                <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
                                <i className="fas fa-times" />
                            </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {/*<canvas className="chart" id="line-chart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} />*/}
                            <div>
                               
                            </div>
                        </div>
                        {/* /.card-body */}
                        
                        {/* /.card */}

{/* Date and time */}
<div className="form-group">
  <label>Date and time:</label>
  <div className="input-group date" id="reservationdatetime" data-target-input="nearest">
    <input type="text" className="form-control datetimepicker-input" data-target="#reservationdatetime" />
    <div className="input-group-append" data-target="#reservationdatetime" data-toggle="datetimepicker">
      <div className="input-group-text"><i className="fa fa-calendar" /></div>
    </div>
  </div>
</div>
{/* /.form group */}

 {/*<div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                            <label className="form-check-label" htmlFor="exampleCheck2">Remember me</label>
                                                        </div>
                                                        </div>
                                                    </div>*/}



                                                    { /*
                                                    const Timeliner = (props) => {
                                                
                                                    const [reason, setReason] = useState([]);
                                                    const [deadline, setDeadline] = useState([]);
                                                
                                                    const onChangeReason= e => {
                                                        const reason= e.target.value;
                                                        setReason(reason);
                                                    };
                                                
                                                    const onChangeDeadline= e => {
                                                        const deadline= e.target.value;
                                                        setReason(deadline);
                                                    };
                                                    
                                                   */
                                                };
<div className="card card-info">
                                    <div className="card-header">
                                        <h3 className="card-title">Customer Form</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form className="form-horizontal">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label htmlFor="client" className="col-sm-2 col-form-label">Customer </label>
                                                <div className="col-sm-10">
                                                    <select 
                                                        className="form-control"
                                                        onChange={ (selected) =>{
                                                            this.setState({
                                                                partner_id: selected[0].id,
                                                                valid_client: true
                                                            });
                                                        }}
                                                    >
                                                        {this.state.customers.map((customer, idx) =>{
                                                            return (
                                                                <>
                                                                    <option value={customer.id}>{customer.customer_name}</option>
                                                                            
                                                                </>
                                                            )
                                                            }
                                                        )
                                                        }
                                                    </select>
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
                                                        placeholder="amount" 
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
                                            </div>
                                            {/* Date and time */}
                                            <div className="form-group row">
                                                <label htmlFor="end_date" className="col-sm-2 col-form-label">End Date</label>
                                                <div className="col-sm-10">
                                                    <input 
                                                        type="date" 
                                                        className="form-control"  
                                                        placeholder="deadline"
                                                        minDate={this.state.startDate} 
                                                        onChange={(e) =>{
                                                            this.setState({due_date: e.target.valueAsDate, valid_due_date: true})
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
                                                <label htmlFor="status" className="col-sm-2 col-form-label">Status </label>
                                                <div className="col-sm-10">
                                                    <select 
                                                        class="form-control"
                                                        onChange={(e) => {
                                                            this.setState({timeliner_status: e.target.value, valid_status: true})
                                                        }}
                                                    >
                                                        <option>Ongoing</option>
                                                        <option>Done</option>
                                                        <option>Passed</option>
                                                    </select>
                                                    { /*verif des données
                                                        this.state.submitted && !this.state.valid_status?
                                                        <text className="text-danger mb-2">
                                                            Veuillez entrer la date de l'échéance.
                                                        </text>:
                                                        <></>*/
                                                    }
                                                </div>
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
                                                            Veuillez entrer le nombrede relance.
                                                        </text>:
                                                        <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>{/* /.card-body */}
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e) =>{  
                                                    if(this.can_submit()){
                                                        this.setState({modal: true})  
                                                    }
                                                    else {
                                                        this.setState({modal: false})
                                                    }
                                                    //this.save_dateliner(this.state.date_liner_number)
                                                                                                 
                                                    //console.log(this.state.due_date)
                                                    //console.log(this.state.amount_indebted)
                                                }}  
                                            >
                                                Add
                                            </button>
                                            <button type="reset" className="btn btn-default float-right">Cancel</button>
                                        </div>{/* /.card-footer */}
                                    </form>
                                    
                                </div>{/* /.card */}

                                <section className="col-lg-4 connectedSortable">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Dateliners</h3>
                                </div>
                                <form className="form-horizontal">
                                    <div className="card-body">
                                        { // --------------function permettant d'inserer le nombre d'echeances dans mle formulaire 
                                            this.state.input_echeances}
                                    </div>       
                                </form>                                          
                            </div>
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Reminders</h3>   
                                </div>
                                <form className="form-horizontal">
                                    <div className="card-body">
                                        { /* --------------function permettant d'inserer le nombre d'echeances dans mle formulaire 
                                                this.state.input_echeances*/}
                                    </div>
                                </form>             
                            </div> 
                            <div className="col-12">
                                    <div className="card card-info">
                                    <div className="card-header">
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
                                    {/* /.card-header */}
                                    <div className="card-body table-responsive p-0" style={{height: 300}}>
                                        <table className="table table-head-fixed table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                            <th>Dateline ID</th>
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
                                                    
                                                    <td>{datebytimeliner.dateliner_id}</td>   
                                                    <td>{datebytimeliner.name}</td> 
                                                    <td>{datebytimeliner.dateliner_amount}</td> 
                                                    <td>{(datebytimeliner.dateliner_start_date).format("llll")}</td>   
                                                    <td>{(datebytimeliner.dateliner_end_date).format("llll")}</td>   
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
                                   {/*  /.card */}
                                </div>             
                        </section>  

</div>
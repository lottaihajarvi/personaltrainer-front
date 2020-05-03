import {BrowserRouter, Switch, Route ,} from 'react-router-dom';

<BrowserRouter>
        <div>
            <Route exact path="/customers" component={CustomerList} />
            <Route exact path="/trainings" component={TrainingsList} />
        </div>
</BrowserRouter>

import {Link} from 'react-router-dom';

<div className="collapse navbar-collapse" id ="navbarSupportedContent">
<ul className="navbar-nav mr-auto">
    <li className="nav -itemactive">
        <Link className="nav-link"to="/customers">Customers</Link>
        </li>
        <li className="nav -item">
            <Link className="nav-link"to="/trainings">Trainings</Link>
            </li>
 </ul >
</div>
const [msg, setMsg] = React.useState('');

const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete?')) {
    fetch(link, {method: 'DELETE'})
    .then(_ => getCustomers())
    .then(_ => {
        setMsg('Deleted successfully');
        setOpen(true);
    })
    .catch(err => console.error(err))
}
}

Cell: row => (<DeleteIcon size="small" onClick={() => deleteCustomer(row.original.links.rel.href)}>Delete</DeleteIcon>)

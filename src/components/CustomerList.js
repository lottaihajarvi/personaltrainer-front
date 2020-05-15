import React from 'react';
import MaterialTable from 'material-table';
import AddTrainings from './AddTrainings';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  
export default function CustomerList() {

    const [customers, setCustomers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    React.useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const handleClose = () => {
      setOpen(false);
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete?')) {
    fetch(link.links[0].href, {method: 'DELETE'})
    .then(_ => getCustomers())
    .then(_ => {
        setMsg('Customer deleted successfully');
        setOpen(true);
    })
    .catch(err => console.error(err))
  }
}

  const editCustomer = (customer) => {
    const editedCustomer = {
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      phone: customer.phone,
      streetaddress: customer.streetaddress,
      postcode: customer.postcode,
      city: customer.city
} 

fetch(customer.links[0].href, {
  method: 'PUT',
  headers: {
      'Content-Type':'application/json'
  },
  body: JSON.stringify(customer)
})
.then(_ => getCustomers())
.then(_ => {
  setOpen(true);
  setMsg('Update successful')
})
  .catch(err => console.error(err))
}

const addCustomer = (customer) => {
  fetch('https://customerrest.herokuapp.com/api/customers',
  {
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(customer)
    }
  )
  .then(_ => getCustomers())
  .then(_ => {
      setMsg('New customer added successfully');
      setOpen(true);
  })
  .catch(err => console.error(err))
}

const saveCustomer = (customer) => {
  addCustomer(customer)
  .then(_ => {
    setOpen(true);
    setMsg('New customer saved')
})
  .catch(err => console.error(err))
}

const addTraining = (customerTrainings) => {
  fetch('https://customerrest.herokuapp.com/api/trainings',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {  
      "date": '' , 
      "activity": '', 
      "duration": '',    
      "customer" : "https://localhost:8080/api/customers/{id}" } 
  }
)  
}

const saveTraining = (customerTrainings) => {
  addTraining(customerTrainings)
  .then(_ => {
    setOpen(true);
    setMsg('Training saved')
})
  .catch(err => console.error(err))
}

    const [state, setState] = React.useState({  
      columns: [
          //{ title: '', field: 'links[0].href' , render: rowData => <addTraining data={rowData} saveTraining={saveTraining} />  },
          { title: 'First Name', field: 'firstname' },
          { title: 'Last Name', field: 'lastname' },
          { title: 'Email', field: 'email' },
          { title: 'Phone', field: 'phone' },
          { title: 'Address', field: 'streetaddress' },
          { title: 'Postcode', field: 'postcode', type: 'numeric' },
          { title: 'City', field: 'city' },  
        ],
      });
    
      return (
      <div style={{marginLeft: 80, marginRight: 80, marginTop: 80}}>
      <MaterialTable
      icons={tableIcons}
      title="Customers"
      columns={state.columns}
      data={customers}
      actions={[
        {
          icon: () => <DeleteIcon />,
          tooltip: 'Delete Customer',
          onClick: (event, rowData) => deleteCustomer(rowData)
        }      
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            saveCustomer(newData);
              resolve();
          }),
        onRowUpdate: (newData, _) => 
          new Promise((resolve, _) => {
            editCustomer(newData);
              resolve();
                }),
        }
      }
    />
    <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={msg}
            />
    </div>
    
      );
    }
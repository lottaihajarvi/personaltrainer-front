import React from 'react';
import MaterialTable from 'material-table';
import Moment from 'react-moment';
import moment from 'moment';

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

export default function TrainingsList() {

    const [trainings, setTrainings] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const handleClose = () => {
      setOpen(false);
  }

    const DeleteTraining = (link) => {
     if (window.alert("Are you sure you want to delete?")) {
      fetch(link, {method: 'DELETE'})
        .then(_ => getTrainings())
        .then(_ => {
          setMsg('Deleted successfully');
          setOpen(true);
      })
        .catch(err => console.error(err))
    }
  };

    //const date = new Date();
    //<Moment format='MMMM Do YYYY, h:mm a'>{date}</Moment>
    
      const [state, setState] = React.useState({
        columns: [
          { title: 'Activity', field: 'activity' },
          //{ title: 'Date', field: 'date'.moment().format('MMMM Do YYYY, h:mm: a') },
          { title: 'Duration(min)', field: 'duration' }, 
          { title: 'Customer', field: 'customer', Cell: row => <div>{row.value.firstname} {row.value.lastname}</div> }, 
        ],
      });
    
      return (
      <div style={{marginLeft: 80, marginRight: 80, marginTop: 80}}>
      <MaterialTable
      icons={tableIcons}
      title="Trainings"
      columns={state.columns}
      data={trainings}
      actions={[
        {
          icon: () => <DeleteIcon />,
          tooltip: 'Delete Training',
          onClick: (rowData) => DeleteTraining(rowData)
        }
      ]}
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
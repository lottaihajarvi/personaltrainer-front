import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTraining(props) {

  const [open, setOpen] = React.useState(false);
  const [customerTrainings, setCustomerTrainings] = React.useState({activity: '', date: '', duration: '', customer: '' });

  const handleClickOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      props.addTrainings(customerTrainings);
      setOpen(false);
  }

  const handleCancel = () => {
      setOpen(false);
  }


  const inputChanged = (event) => {
     setCustomerTrainings({...customerTrainings, [event.target.name]: event.target.value})
  }

  const addTraining = () =>{
    props.saveTrainings(customerTrainings);
    handleClose();
  }

  return(
    <div>
      <Button style={{margin:10}} color="primary" onClick={handleClickOpen}>
      Add Training
      </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training for customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="activity"
            name="activity"
            value={customerTrainings.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            value={customerTrainings.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={customerTrainings.duration}
            onChange={inputChanged}
            label="Duration(min)"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}
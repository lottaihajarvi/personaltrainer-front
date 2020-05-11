import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTraining(props) {

  const [open, setOpen] = React.useState(false);
  const [trainigs, setTrainings] = React.useState({activity: '', date: '', duration: '', customer: '' });

  const handleClickOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      props.addTrainings(trainigs);
      setOpen(false);
  }

  const handleCancel = () => {
      setOpen(false);
  }


  const inputChanged = (event) => {
      setTrainings({...trainings, [event.target.name]: event.target.value})
  }

  

}
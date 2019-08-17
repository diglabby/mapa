import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleExpansionPanel from './SimpleExpansionPanel' 

const Subscribe = ({closeModal}) => {
    const [open, setOpen] = React.useState(true);
    const [mail, setMail] = React.useState('')

    const onSetMail = (e) => {
        setMail(e.target.value)
    }

    const onSubsribe = () => {
        console.log(mail)
        setMail('')
    }
  
    return (

        <div>
            <Dialog open={open}   aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText >
                    <TextField
                         onClick={closeModal} 
                        onChange={onSetMail}
                        value={mail}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>

                    <Button onClick={closeModal} color="primary">
                        Cancel
                     </Button>

                    <Button onClick={onSubsribe} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
                <SimpleExpansionPanel/>   
            </Dialog>
        </div>
    );
}

export default Subscribe
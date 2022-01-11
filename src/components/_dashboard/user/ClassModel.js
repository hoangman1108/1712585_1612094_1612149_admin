import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DetailModel({ open, setOpen, info }) {
  const handleClose = () => {
    setOpen(false);
  };
  console.log("info ne", info);

  const { name, codeJoin, teachers, students, assignments } = info || null;

  console.log(info);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Class</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <span>{`Name: ${name}`}</span>
            </div>
            <div>
              <span>{`CodeJoin: ${codeJoin}`}</span>
            </div>
            <div>
              <span>{`Teachers: ${teachers?.length}`}</span>
            </div>
            <div>
              <span>{`students: ${students?.length}`}</span>
            </div>

            <div>
              <span>{`Assignments: ${assignments?.length}`}</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#4a4a4a" }}>
            Close
          </Button>
          {/* <Button
            // onClick={() => {
            //   deleteAdmin(email);
            // }}
            autoFocus
          >
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

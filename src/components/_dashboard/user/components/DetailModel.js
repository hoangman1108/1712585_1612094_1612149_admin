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

  const { id, name, dob, mssv, role, phone, email, status } = info;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail user</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <h6></h6>
              <span>{`Name: ${name}`}</span>
            </div>
            <div>
              <span>{`Birthday: ${dob}`}</span>
            </div>
            <div>{role === "admin" ? "" : <span>{`Mssv: ${mssv}`}</span>}</div>
            <div>
              <span>{`Role: ${role}`}</span>
            </div>
            <div>
              <span>{`Phone: ${phone ? phone : "not data"}`}</span>
            </div>
            <div>
              <span>{`Email: ${email}`}</span>
            </div>
            <div>
              <span>{`Status: ${status}`}</span>
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

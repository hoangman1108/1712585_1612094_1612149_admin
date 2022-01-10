import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useDashboard from '../../../../hooks/useDashboard';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ActionStatusModel({ open, setOpen, info }) {
  const { updateStudentID } = useDashboard();
  const { checked, setChecked } = React.useState(info.status);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

//   const formik = useFormik({
//     initialValues: {
//       mssv: info?.mssv ? info.mssv : ""
//     },
//     onSubmit: () => {
//       info.mssv = values.mssv;
//       info.phone = info.phone ? info.phone : "";
//       info.status = "banned";
//       updateStudentID(info.id, info).then((response) => {
//         if (response?.error) {
//           setMsg(response.error);
//           return;
//         }
//         if (response) {
//           handleClose();
//         }
//       });
//     }
//   });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Action Status</DialogTitle>
        <DialogContent>
        <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="active"
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="Active"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="unactive"
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="Unactive"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="locked"
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="Locked"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="banned"
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="Banned"
                    labelPlacement="end"
                />
        </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#4a4a4a' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

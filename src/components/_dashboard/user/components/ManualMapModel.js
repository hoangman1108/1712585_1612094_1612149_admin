import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useDashboard from '../../../../hooks/useDashboard';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import ErrorMessage from '../../../../components/ErrorMessage';

export default function ManualMapModel({ open, setOpen, info }) {
  const { deleteAdmin } = useDashboard();
  const [msg, setMsg] = React.useState('');
  console.log("info: ", info);

  const handleClose = () => {
    setOpen(false);
  };

  const StudentIDSchema = Yup.object().shape({
    mssv: Yup.string().required('StudentID is required')
  });

  const formik = useFormik({
    initialValues: {
      mssv: info.mssv
    },
    validationSchema: StudentIDSchema,
    onSubmit: () => {
    //   createAdmin({ ...values, dob: formatDate }).then((response) => {
    //     if (response.error) {
    //       setMsg(response.error);
    //       setSubmitting(false);
    //       return;
    //     }
    //     if (response) {
    //       setSubmitting(false);
    //       handleClose();
    //     }
    //   });
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Mapping StudentID</DialogTitle>
        <DialogContent>
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="mssv"
                  type="text"
                  label="StudentID"
                  {...getFieldProps('mssv')}
                  error={Boolean(touched.mssv && errors.mssv)}
                  helperText={touched.mssv && errors.mssv}
                />
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                style={{ marginTop: 20 }}
              >
                Mapping
              </LoadingButton>
              <ErrorMessage message={msg} />
            </Form>
          </FormikProvider>
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

import * as React from 'react';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, Checkbox, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { DesktopDatePicker, LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ErrorMessage from '../ErrorMessage';
import useDashboard from '../../hooks/useDashboard';
import moment from "moment";

export default function CreateAccountModal({ open, setOpen }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [date, setDate] = React.useState(new Date('1-1-2000'));
  const [msg, setMsg] = React.useState('');
  const { createAdmin } = useDashboard();
  const handleClose = () => {
    setOpen(false);
  };

  const CreateAdminSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name must be a valid name'),
    password: Yup.string().required('Password is required')
  });

  const handleChangeDate = (newDate) => {
    setDate(newDate);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: ''
    },
    validationSchema: CreateAdminSchema,
    onSubmit: () => {
      const formatDate = moment(date).format("DD/MM/YYYY");
      createAdmin({ ...values, dob: formatDate }).then((response) => {
        if (response.error) {
          setMsg(response.error);
          setSubmitting(false);
          return;
        }
        if (response) {
          setSubmitting(false);
          handleClose();
        }
      });
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } =
    formik;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ width: '600px' }}>Create Admin Account</DialogTitle>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Full Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
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
                Create account
              </LoadingButton>
              <ErrorMessage message={msg} />
            </Form>
          </FormikProvider>
        </LocalizationProvider>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Create Account</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

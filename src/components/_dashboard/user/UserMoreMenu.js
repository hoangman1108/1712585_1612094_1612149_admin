import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteModel from './components/DeleteModel';
import DetailModel from './components/DetailModel';
import ManualMapModel from './components/ManualMapModel';
import ActionStatusModel from './components/ActionStatusModel';
import cubeOutline from '@iconify/icons-eva/cube-outline';


export default function UserMoreMenu({ id, name, dob, mssv, role, phone, email, status }) {
  const isTeacher = role === "teacher" ? true : false;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openManualMap, setOpenManualMap] = useState(false);
  const [openActionStatus, setOpenActionStatus] = useState(false);
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 240, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => setOpenDelete(true)}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => setOpenDetail(true)}>
          <ListItemIcon>
            <Icon icon={eyeOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {
          !isTeacher ? (
            <MenuItem sx={{ color: 'text.secondary' }} onClick={() => setOpenManualMap(true)}>
              <ListItemIcon>
                <Icon icon={cubeOutline} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Manual Map StudentID" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ) : ""
        }

        <MenuItem MenuItem sx={{ color: 'text.secondary' }} onClick={() => setOpenActionStatus(true)}>
          <ListItemIcon>
            <Icon icon={eyeOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Action Status" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <DeleteModel open={openDelete} setOpen={setOpenDelete} email={email} />
      <DetailModel open={openDetail} setOpen={setOpenDetail} />
      {
        !isTeacher ? (
          <ManualMapModel open={openManualMap} setOpen={setOpenManualMap} info={{ id, name, dob, mssv, role, phone, email, status }} />
        ) : ""
      }
      <ActionStatusModel open={openActionStatus} setOpen={setOpenActionStatus} info={{ id, name, dob, mssv, role, phone, email, status }} />
    </>
  );
}

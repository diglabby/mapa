import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';

const ActionButtonStyled = styled(SpeedDial)`
  .MuiFab-root {
    background-color: white;

    &:hover {
      background-color: white;
    }
  }

  .MuiFab-label {
    color: black;
  }
`;

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    bottom: '50%',
    right: theme.spacing(1)
  }
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' }
];

export const ActionButton = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ActionButtonStyled
      ariaLabel='SpeedDial tooltip example'
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onBlur={handleClose}
      onClose={handleClose}
      onFocus={handleOpen}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      open={isOpen}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </ActionButtonStyled>
  );
};

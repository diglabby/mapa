import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';

import Subscribe from '../components/Subcribe'

import logo from './icons/logo.svg'
import map from './icons/map.svg'

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
  { icon: <img src={logo} />, name: 'Subcribe' },
  { icon:<img src={map} />, name: 'Iframe' },
  { icon: <PrintIcon />, name: 'Print' }
];

export const ActionButton = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const [modal, setModal] = React.useState(false)



  const closeModal = () => setModal(false)
  // const handleWindowOpen = () => {
  //   setShowWindow(true)
  // }

  // const handleWindowClose = () => {
  //   setShowWindow(false)
  // }

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* {modal ?  <Subcribe closeModal={closeModal} /> : null} */}

      {modal ? (modal === 'Subcribe' ?
        <Subscribe closeModal={closeModal} /> :
        <Iframe closeModal={closeModal} />) : null}

      <ActionButtonStyled
        ariaLabel='SpeedDial tooltip example'
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onBlur={handleClose}
        onClose={handleClose}
        onFocus={handleOpen}
        onClick={handleOpen}
        onMouseLeave={handleClose}
        open={isOpen}
      >

        {actions.map(action => (
          <SpeedDialAction

            onClick={() => setModal(action.name)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </ActionButtonStyled>
    </div>
  );
};

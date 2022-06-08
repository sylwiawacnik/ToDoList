import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';


interface Props {
  children: React.ReactElement;
}

const ScrollTop = (props: Props) => {

  const {children} = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box
        className='upp'
        onClick={handleClick}
        role="presentation"
      >
        {children}
      </Box>
    </Zoom>
  );

}

export default ScrollTop;

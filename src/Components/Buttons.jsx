import Button from '@mui/material/Button';

import React from 'react'

export default function Buttons(props) {
    let {value,trigger} = props
  return (

    <Button variant="outlined" onClick={trigger}>{value}</Button>
    
  )
}

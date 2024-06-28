'use client'

import { RotatingLines } from 'react-loader-spinner';

function Loader() {
  return (
    <RotatingLines
      strokeColor="#4B352B"
      strokeWidth="5"
      animationDuration="0.75"
      width="50"
      visible={true}
    />
  )
}

export default Loader;
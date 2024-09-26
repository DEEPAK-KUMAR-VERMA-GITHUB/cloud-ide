import React from 'react'

type Props = {}

const StatusBar = (props: Props) => {
  return (
    <div className='bg-gray-800 text-white text-sm p-2 flex justify-between items-center' >
        <span>Ready</span>̥
        <span>Ln 1, Col 1</span>
    </div>
  )
}

export default StatusBar
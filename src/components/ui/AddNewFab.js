import React from 'react'

export const AddNewFab = ({event}) => {
  return (
    <button className='btn btn-primary fab' onClick={event} >
        <i className='fa fa-plus' />
    </button>
  )
}

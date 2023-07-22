import React from 'react'
import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    startDeletingEvent();
  }

  return (
    <button
      aria-label='btn-delete'
      className='btn btn-danger fab-delete'
      onClick={ handleClickDelete }
      style={{display: hasEventSelected ? '': 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}

"use client";
import React from 'react'

const RefreshPage = () => {    

    const handleClick = () => {
        window.location.reload();
    }
  return (
    <div className='w-full my-3 text-light-gray-22 font-bold text-center'>
        <button onClick={handleClick}>Intente recargar la página</button>
    </div>
  )
}

export default RefreshPage
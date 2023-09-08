import React from 'react'

export const TitleBarSimple = ({ title }: { title: string }) => {
  return (
    <div>        
      <div className="flex flex-row items-center w-full px-10">

        <label className="block text-4xl font-bold">
          {title}
        </label>

      </div>

      
      <div className="border-t border-light-gray-22 border-solid mt-3 px-6 w-11/12 mx-auto"></div>
      </div>
  )
}

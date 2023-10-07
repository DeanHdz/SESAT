"use client";
import { useRouter } from 'next/navigation'
import React from 'react'

export const TitleBar = ({ title }: { title: string }) => {
  const navigate = useRouter();
  return (
    <div className='w-full'>
      <div className="flex flex-row items-center w-full">
        <a className='cursor-pointer flex flex-row' onClick={() => {
          navigate.back();
          //navigate.refresh();
        }}>


          <svg className='mr-2' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>

        </a>

        <label className="block text-4xl font-bold ml-10 lg:ml-auto">
          {title}
        </label>

      </div>


      <div className="border-t border-light-gray-22 border-solid mt-3 w-full mx-auto"></div>
    </div>
  )
}

"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function Search({url}:{url: string}) {

  const [text, setText] = useState("");
  const [query] = useDebounce(text, 750);
  const router = useRouter();

  useEffect(() => {
    if(!query)
      router.push(`${url}`);
    else
      router.push(`${url}?search=${query}`);
  }, [query, router]);
  

  return (
    <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
      <input
        type="search"
        placeholder="Buscar..."
        className="rounded-full border-b border-light-gray-22 border-solid px-6"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="flex items-center ml-2">
        <svg
          stroke="#d5d3dd"
          fill="#d5d3dd"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path>
        </svg>
      </div>
    </div>
  )
}

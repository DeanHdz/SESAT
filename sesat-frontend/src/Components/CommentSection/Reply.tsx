const Reply = ({userName, date, body} : {userName: string, date: string, body: string}) =>
{
  return(
    <>
      <hr className="my-2 ml-16 border-gray-200" />
      <div className="flex flex-row pt-1 md-10 ml-16">
        {/*User Image*/}
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
          <div className="bg-[#31325c] text-neutral-content rounded-full w-[40px]">
            <span className="text-2xl"> JA </span>
          </div>
        </label>
        {/*User Image*/}
        <div className="flex-col mt-1">
          {/*User name and date of comment is here*/}
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            {userName}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {date}
            </span>
          {/*User name and date of comment is here*/}
          </div>
          {/* Text is here*/}
          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
            {body}
          </div>
          {/* Text is here*/}          
        </div>
      </div>
    </>
  )
}

export default Reply
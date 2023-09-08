const UserIcon = ({userName}:{userName:string}) =>
{
  return(
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
      <div className="bg-[#31325c] text-neutral-content rounded-full w-[40px]">
        <span className="text-xl">{userName}</span>
      </div>
    </label>
  )
}

export default UserIcon
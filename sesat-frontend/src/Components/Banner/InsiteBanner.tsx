const InsiteBaner = ({topic}:{topic:string}) =>
{
  return(
    <div className="w-screen h-[250px] bg-[#003067]">
      <p className="relative top-[125px] left-[80px] text-[50px] text-white font-normal">
        {topic}
      </p>
    </div>
  ) 
  
}

export default InsiteBaner
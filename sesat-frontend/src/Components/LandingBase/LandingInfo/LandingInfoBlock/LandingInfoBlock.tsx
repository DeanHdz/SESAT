const LandingInfoBlock = ({title, body, link}:{title:string, body:string[], link:string}) =>
{
  let lines = [];
  for(let i = 0; i < body.length-1; i++)
  {
    lines.push(
      <article key={i} className="prose prose-sm text-black font-medium"> 
        {body[i]} 
      </article>
    );
  }
  lines.push(
    <a key={body.length} href={`${link}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
      {link}
    </a>
  )
  
  return(
    <div className="ml-2 mr-2 items-center relative right-1">
      <article className="mt-3 prose prose-lg text-blue-600 font-bold">
        {title}
      </article>
      <div className="relative bottom-4 divider"></div>
      <div className="relative bottom-8">
        {lines}
      </div>
    </div>
  )
}

export default LandingInfoBlock
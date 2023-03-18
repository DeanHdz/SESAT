const BreadcrumbLast = ({text, link}:{text: string, link:string}) =>
{
  return(
    <li className="text-black hover:text-sky-600 text-base font-semibold">
      <a href={`${link}`}>
        {text}
      </a>
    </li>
  )
}

export default BreadcrumbLast
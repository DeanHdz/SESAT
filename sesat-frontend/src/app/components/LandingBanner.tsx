import image from '../../public/banner.jpg'
const LandingBanner = () =>
{
  return(
    <div className='w-screen h-[250px] bg-cover'>
      {/*<a href="https://www.nga.gov/collection/art-object-page.56240.html" target="_blank" rel="noopener noreferrer" className="">
        
  </a>*/}
        <img src="/images/banner.jpg" alt="Art Banner" className="w-screen h-[250px] bg-cover"/>
    </div>
  )
}

export default LandingBanner
import React, { useEffect, useState } from 'react';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  const [index , setindex] = useState(0);

 
useEffect(() => {
    const interval = setInterval(() => {
     setindex((index+1)%5)
    }, 2000);
    return () => clearInterval(interval);
  }, );


  return (

<div>
  
        <img src={urlFor(heroBanner.image[index])} alt="headphones" className="hero-banner-image"  />
    </div>
  )
}

export default HeroBanner
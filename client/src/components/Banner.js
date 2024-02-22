import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {

    // let img1 = "https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.jpg"
    // let img2 ="https://fastly.picsum.photos/id/480/640/640.jpg?hmac=a7a7nRiZrfMwWvIxWmA9Tp601D59-ZSwqcMLdtAMuBU"
    // let img3 = "https://fastly.picsum.photos/id/100/640/640.jpg?hmac=AnbRK9KTkoNoTRD0UsIwii_JtwZLQMIpWJfJL_Jod0k"

    let img1 ="./furniture.jpeg";
    let img2 ="./ele.jpeg";
    let img3 ="./shoes.jpeg";



  return (
       <div style={{width: "100%", height: "100%" ,margin: "0 auto", objectFit: "cover"
    }}>
            <Carousel width="100%" style={{ height: "50%" }}   showThumbs={false} autoPlay={true} 
        infiniteLoop={true} 
        >

    
            
            <div sx={{ height: "50%" }}>
                <img src={img1}  />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img src={img2} />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
                <img src={img3} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>

      </div>

       
    )
}

export default Banner

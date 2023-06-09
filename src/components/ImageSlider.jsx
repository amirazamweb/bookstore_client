import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import poster1 from '../images/poster1.png';
import poster2 from '../images/poster2.png';
import poster3 from '../images/poster3.png';

const ImageSlider = () => {
    let img1 = poster1;
    let img2 = poster2;
    let img3 = poster3;

    const images = [
        { url: img1 },
        { url: img2 },
        { url: img3 }
    ]
    return (
        <div className='w-full mt-6'>
            <SimpleImageSlider
                width={'100%'}
                height={'50vh'}
                images={images}
                showBullets={true}
                showNavs={false}
                autoPlay={true}
                slideDuration={3}
            />
        </div>
    )
}

export default ImageSlider
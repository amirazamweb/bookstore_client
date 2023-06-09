import React from 'react'
import Layout from '../components/Layout/Layout'
import aboutImg from '../images/about.png'

const About = () => {
    return (
        <Layout title={'About | Book Store'}>
            <div className='w-full'>
                <img src={aboutImg} alt="about us" className='w-full' />
            </div>
        </Layout>
    )
}

export default About
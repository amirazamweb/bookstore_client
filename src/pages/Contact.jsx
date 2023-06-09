import React from 'react'
import Layout from '../components/Layout/Layout';
import contactImg from '../images/contact.png'

const Contact = () => {
    return (
        <Layout title={'Contact | Book Store'}>
            <div className='w-full'>
                <img src={contactImg} alt="contact us" className='w-full' />
            </div>
        </Layout>
    )
}

export default Contact
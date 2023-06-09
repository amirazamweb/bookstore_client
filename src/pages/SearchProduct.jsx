import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import Card from '../components/Card';
import notFoundAnimation from '../images/not-found-animation.gif'

const SearchProduct = () => {
    const [search] = useSearch();
    return (
        <Layout title={'Search Products'}>
            {
                search.length > 0 ?
                    (
                        <div>
                            <h2 className='my-8 text-center text-xl font-semibold text-slate-500'>
                                {`Found ${search?.length} products`}
                            </h2>
                            <div className='grid grid-cols-5 gap-12 px-24'>
                                {search?.map((e) => {
                                    return (
                                        <Card
                                            key={e._id}
                                            name={e.name}
                                            author={e.author}
                                            price={e.price}
                                            id={e._id}
                                            slug={e.productSlug}
                                            cardInfo={e}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ) :
                    (
                        <div className='text-center my-8'>
                            <h2 className='text-xl font-semibold text-slate-500'>No product found</h2>
                            <div className='w-1/3 m-auto my-4'>
                                <img src={notFoundAnimation} alt="not product found" className='w-full' />
                            </div>
                        </div>
                    )
            }
        </Layout>
    )
}

export default SearchProduct
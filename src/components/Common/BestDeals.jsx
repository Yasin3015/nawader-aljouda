import React from 'react'
import ProductCard from './Products/ProductCard'
import BestSaleCard from './Products/BestSaleCard'
import { products } from '../../FakeData/Products'
import Container from '../UI/Container'
import product1 from '../../assets/images/product1.jpg'

const BestDeals = () => {
  return (
    <div className='bg-[var(--color-gray-1)] py-15'>
      <Container>
        <h1 className='text-xl font-semibold'>Best Deals</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-8 ">
          <div className="lg:col-span-2">
            <BestSaleCard
              product={{
                image: product1,
                name: "Chinese cabbage",
                price: 12.0,
                oldPrice: 24.0,
                salePercent: 50,
                rating: 4.5,
                reviewsCount: 524,
                isBestSale: true,
                offerEndsAt: "2025-11-18T00:00:00",
              }}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={`${
                    i >= 4 ? "hidden sm:block" : ""
                  }`}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BestDeals

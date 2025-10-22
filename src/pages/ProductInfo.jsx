import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductImageGallery from '../components/ProductInfo/ProductImageGallery';
import ProductInfoSection from '../components/ProductInfo/ProductInfoSection';
import ProductTabs from '../components/ProductInfo/ProductTabs';
import ProductVideo from '../components/ProductInfo/ProductVideo';
import RelatedProductsSection from '../components/ProductInfo/RelatedProductsSection';

const ProductInfo = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Sample product data - in a real app, this would come from an API
  const product = {
    id: productId || '1',
    name: 'اسم المنتج',
    rating: 5,
    reviewCount: 4,
    originalPrice: 48.00,
    discountedPrice: 17.28,
    discountPercentage: 84,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'بالاستيك',
    tags: 'الأكثر مبيعا معدن خطر حديد',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'
    ],
    videoUrl: 'https://example.com/video.mp4',
    weight: '1 كيلو',
    type: 'نحاس',
    classification: 'معدن',
    stockStatus: 'متوفر (5413)',
    additionalTags: 'سلوك كهرباء معدن مصري الاكثر مبيع التماس',
    reviews: [
      {
        id: 1,
        userName: 'Mohamed Mansour',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        comment: 'Duis at ullamcorper nulla, eu dictum eros.',
        date: '2 min ago'
      },
      {
        id: 2,
        userName: 'Mohamed Mansour',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        comment: 'Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to bolt or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.',
        date: '2 min ago'
      },
      {
        id: 3,
        userName: 'Mohamed Mansour',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        comment: 'Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus',
        date: '2 min ago'
      },
      {
        id: 4,
        userName: 'Mohamed Mansour',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        comment: '200+ Conton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a Canton\'s Choice, Bok Choi, from USA',
        date: '30 Apr. 2021'
      }
    ]
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-7">
            <ProductImageGallery 
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Middle Column - Product Info */}
          <div className="lg:col-span-5">
            <ProductInfoSection product={product} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="p-6 mb-8">
          <ProductTabs 
            product={product}
            // relatedProducts={relatedProducts}
          />
        </div>

        {/* Related Products Section */}
        <RelatedProductsSection />
      </div>
    </div>
  );
};

export default ProductInfo;


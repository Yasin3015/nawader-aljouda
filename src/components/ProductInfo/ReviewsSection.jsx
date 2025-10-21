import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReviewsSection = ({ reviews = [] }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  // Default reviews if none provided
  const defaultReviews = [
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
  ];

  const displayReviews = showAll ? reviews : reviews.slice(0, 3);
  const reviewsToShow = reviews.length > 0 ? displayReviews : defaultReviews;

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* Keywords */}
      <div className="text-sm text-gray-600">
        {t('productInfo.reviews.keywords')}: الأكثر مبيعا معدن خطر جديد
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsToShow.map((review) => (
          <div key={review.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={review.avatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            {/* Review Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <div className="flex text-yellow-400 text-sm mb-2">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-green-100 text-green-700 px-6 py-2 rounded-lg hover:bg-green-200 transition-colors font-medium"
          >
            {showAll ? t('productInfo.reviews.showLess') : t('productInfo.reviews.viewMore')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;


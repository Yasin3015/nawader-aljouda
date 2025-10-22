import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Check, Leaf } from 'lucide-react';

const ProductVideo = ({ videoUrl, productName = "Product" }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Here you would implement actual video playback logic
    console.log('Playing video:', videoUrl);
  };

  return (
    <div className="!w-full">
      {/* Video Player */}
      <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
        {isPlaying ? (
          <div className="w-full h-full flex items-center justify-center bg-black/50">
            <div className="text-white text-center">
              <p className="text-lg font-medium mb-2">{t('productInfo.video.playing')}</p>
              <p className="text-sm text-gray-300">{productName}</p>
            </div>
          </div>
        ) : (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="bg-green-600 hover:bg-green-700 rounded-full p-4 transition-colors">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </button>
        )}
      </div>

      {/* Product Badges */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{t('productInfo.badges.safeProduct')}</p>
            <p className="text-sm text-gray-600">{t('productInfo.badges.safeDescription')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{t('productInfo.badges.organic')}</p>
            <p className="text-sm text-gray-600">{t('productInfo.badges.organicDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVideo;


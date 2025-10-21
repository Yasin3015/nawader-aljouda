import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PinterestIcon from './PinterestIcon';

const SocialShare = () => {
  const { t } = useTranslation();
  
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(t('wishlist.shareText', 'Check out my wishlist!'));
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };

  const shareOnPinterest = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}`, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(t('wishlist.linkCopied', 'تم نسخ الرابط! يمكنك مشاركته على Instagram'));
  };

  return (
    <div className="flex items-center gap-3  px-5 py-6">
      <span className="text-gray-700 font-medium">{t('wishlist.share', 'مشاركة')}</span>
      <button 
        onClick={shareOnFacebook}
        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors"
      >
        <Facebook className="w-5 h-5 " fill="white" />
      </button>
      <button 
        onClick={shareOnTwitter}
        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors text-gray-700"
      >
        <Twitter className="w-5 h-5" />
      </button>
      <button 
        onClick={shareOnPinterest}
        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors text-gray-700"
      >
        <PinterestIcon />
      </button>
      <button 
        onClick={shareOnInstagram}
        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors text-gray-700"
      >
        <Instagram className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SocialShare;

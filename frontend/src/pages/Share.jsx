import React, { useState } from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { FaFacebook } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { IoMdShareAlt } from 'react-icons/io'
import { useParams } from 'react-router-dom';

const Share = ({ url}) => {

  const { id } = useParams();
  const [isSocialMediaVisible, setSocialMediaVisible] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState('');

  const handleShareClick = () => {
    setSocialMediaVisible(!isSocialMediaVisible);
    setSelectedSocialMedia('');
  };

  const handleSocialMediaClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
  };

  const handleShare = () => {

    let shareUrl = `https://recipe-app-gamma-ochre.vercel.app/viewmeal/${id}`;
    const message = encodeURIComponent(`Check out this recipe: ${shareUrl}`)

    switch (selectedSocialMedia) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${message}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${message}`;
        break;
      default:
        break;
    }

    if (url !== `https://recipe-app-gamma-ochre.vercel.app/viewmeal/${id}`) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className='p-4'>
      {/* Share icon */}
      <button onClick={handleShareClick} className='flex items-center gap-2'>
        <IoMdShareAlt /> Share
      </button>
<div className='flex gap-5'>


      {/* Social media icons (hidden by default) */}
      {isSocialMediaVisible && (
        <div className='flex flex-row gap-5 mb-5 mt-5'>
          <button onClick={() => handleSocialMediaClick('whatsapp')}>
            <AiOutlineWhatsApp />
          </button>
          <button onClick={() => handleSocialMediaClick('twitter')}>
            <FaTwitter />
          </button>
          <button onClick={() => handleSocialMediaClick('facebook')}>
            <FaFacebook />
          </button>
        </div>
      )}

      {/* Share button for selected social media */}
      {selectedSocialMedia !== '' && (
        <button onClick={handleShare} className='border-l border-black p-1'>
          Share on {selectedSocialMedia.toUpperCase()}
        </button>
      )}
    </div>
    </div>
  );
};

export default Share;

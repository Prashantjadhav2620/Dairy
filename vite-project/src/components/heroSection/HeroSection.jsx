// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroSection.css'; // Import the CSS file

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg',
    'https://th.bing.com/th/id/R.9ef7cdf2453a4e9aab98c9b8f7ab44cc?rik=dOMH6OPPLXyLXQ&riu=http%3a%2f%2fblog.primalmuscle.com%2fwp-content%2fuploads%2f2013%2f09%2fiStock_000013802628Large.jpg&ehk=A2FvqmTF4IGDAJTuFPViIcKH0%2fKkAgIQ2YO75%2bsjB8w%3d&risl=&pid=ImgRaw&r=0',
    'https://images.pexels.com/photos/108370/pexels-photo-108370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg',
    'https://th.bing.com/th/id/OIP.9WJX9SkpzpPPYN8_VbDjxgHaEK?rs=1&pid=ImgDetMain',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  return (
    <div className="hero-section">
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        className="image-size"
      />
    </div>
  );
}

export default HeroSection;

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroSection.css'; // Import the CSS file

function HeroSection() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    'https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg',
    'https://th.bing.com/th/id/R.9ef7cdf2453a4e9aab98c9b8f7ab44cc?rik=dOMH6OPPLXyLXQ&riu=http%3a%2f%2fblog.primalmuscle.com%2fwp-content%2fuploads%2f2013%2f09%2fiStock_000013802628Large.jpg&ehk=A2FvqmTF4IGDAJTuFPViIcKH0%2fKkAgIQ2YO75%2bsjB8w%3d&risl=&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/OIP.9WJX9SkpzpPPYN8_VbDjxgHaEK?rs=1&pid=ImgDetMain',
    'https://pixabay.com/photos/strawberry-dessert-fruit-berry-3304967/',
    './assets/Milk_Based_Products.png',  // Assuming assets folder is at the root of your project
    './assets/images.jpeg',              // Assuming assets folder is at the root of your project
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next slide index
      const nextSlide = (currentSlide + 1) % images.length;
      // Set the current slide index
      setCurrentSlide(nextSlide);
    }, 30000); // 30 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [currentSlide, images.length]);

  return (
    <Slider {...sliderSettings} initialSlide={currentSlide}>
      {images.map((image, index) => (
        <div key={index} className="slide-item">
          <img src={image} alt={`Slide ${index + 1}`} className="image-size" />
        </div>
      ))}
    </Slider>
  );
}

export default HeroSection;


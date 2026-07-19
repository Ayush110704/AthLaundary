// components/Carousel.jsx
import React, { useEffect, useRef, useState } from 'react';

const Carousel = ({ 
  children, 
  speed = 0.8, 
  pauseOnHover = true,
  autoScroll = true,
  className = '',
  containerClassName = '',
  itemsPerView = 1,
  gap = 24 // gap in pixels
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(320);
  const scrollContainerRef = useRef(null);

  // Auto-scroll with pause on hover
  useEffect(() => {
    if (!autoScroll) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    let startTime;
    let scrollPosition = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      if (!isPaused) {
        scrollPosition += speed;
        
        // Reset when reaching the content width (since we have 3 copies)
        const containerWidth = container.scrollWidth / 3;
        if (scrollPosition >= containerWidth) {
          scrollPosition = 0;
        }
        
        container.style.transform = `translateX(-${scrollPosition}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, speed, autoScroll]);

  // Responsive card sizing
  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth >= 1280) setCardWidth(320);
      else if (window.innerWidth >= 1024) setCardWidth(300);
      else if (window.innerWidth >= 640) setCardWidth(280);
      else setCardWidth(260);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Clone children to add cardWidth prop
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        key: index,
        cardWidth: child.props.cardWidth || cardWidth,
        style: {
          ...child.props.style,
          flexShrink: 0,
          width: `${child.props.cardWidth || cardWidth}px`
        }
      });
    }
    return child;
  });

  return (
    <div 
      className={`relative px-4 md:px-8 ${containerClassName}`}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      <div className="overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className={`flex will-change-transform ${className}`}
          style={{ 
            width: 'fit-content',
            gap: `${gap}px`
          }}
        >
          {childrenWithProps}
        </div>
      </div>
      
      {/* Optional: Show pause indicator */}
      {/* {isPaused && (
        <div className="absolute top-4 right-8 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          ⏸ Paused
        </div>
      )} */}
    </div>
  );
};

export default Carousel;
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  /** Classes for the <img>. When neither `fill` nor `wrapperClassName` is set, also applied to the wrapper (legacy behaviour). */
  className?: string;
  /** Classes for the wrapper only. Opting in stops `className` being duplicated on the wrapper. */
  wrapperClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Absolutely fill the nearest positioned parent instead of sizing from width/height. */
  fill?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName,
  width,
  height,
  priority = false,
  fill = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const usesSplitClasses = fill || wrapperClassName !== undefined;
  const wrapperClasses = fill
    ? `absolute inset-0 overflow-hidden ${wrapperClassName ?? ''}`
    : `relative overflow-hidden ${usesSplitClasses ? wrapperClassName : className}`;
  const imageClasses = fill ? `absolute inset-0 h-full w-full ${className}` : className;

  return (
    <div
      ref={imgRef}
      className={wrapperClasses}
      style={{ aspectRatio: !fill && width && height ? `${width}/${height}` : undefined }}
    >
      {/* Placeholder while the image streams in */}
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden="true" />}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClasses}`}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
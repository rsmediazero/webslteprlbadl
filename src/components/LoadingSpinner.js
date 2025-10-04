import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-dramabox-amber border-t-transparent`}></div>
    </div>
  );
};

export const DramaCardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
          <Skeleton height={256} className="bg-gray-700" />
          <div className="p-4">
            <Skeleton count={2} className="bg-gray-700 mb-2" />
            <Skeleton width={100} className="bg-gray-700" />
          </div>
        </div>
      ))}
    </>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="relative h-96 md:h-screen overflow-hidden">
      <Skeleton height="100%" className="bg-gray-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16">
        <Skeleton count={3} className="bg-gray-700 mb-4" />
        <Skeleton width={200} height={48} className="bg-gray-700" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
import React from 'react';

interface BossImageProps {
  seed: string;
  size?: number;
}

export const BossImage: React.FC<BossImageProps> = ({ seed, size = 150 }) => {
  // Use DiceBear Pixel Art API
  const url = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
  
  return (
    <div style={{ width: size, height: size, margin: '0 auto' }}>
      <img 
        src={url} 
        alt={`Boss ${seed}`} 
        className="pixel-art-img"
        // Prevent drag to feel more app-like
        draggable="false"
      />
    </div>
  );
};

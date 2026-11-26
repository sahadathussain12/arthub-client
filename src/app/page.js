import ArtCategoriesSection from '@/component/ArtCategoriesSection';
import Banner from '@/component/Banner';
import FeaturedArtworks from '@/component/home/FeaturedArtworks';
import TopArtistsSection from '@/component/TopArtistsSection';
import React from 'react';


const HomePage = () => {
  return (
    <div>
      <Banner/>
      <FeaturedArtworks/>
      <TopArtistsSection/>
      <ArtCategoriesSection/>
    </div>
  );
};

export default HomePage;

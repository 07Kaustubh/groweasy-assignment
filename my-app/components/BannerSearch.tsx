'use client'
// Import React dependencies and local components/hooks
import { useState } from 'react';
import BannerList from "@/components/BannerList";
import { run as fetchGeminiContent } from "../app/gemini";
import { fetchImages as fetchUnsplashImages } from "../app/unsplash.mjs";
import { Button } from './ui/button';
import { Input } from './ui/input';

// Define a functional component to encapsulate your search and display logic
const BannerSearch = () => {
  const [banners, setBanners] = useState([]);
  const [query, setQuery] = useState("");

  // Asynchronous function to handle the search process
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const images = await fetchUnsplashImages(query);
      console.log('images:', images);
      const content = await fetchGeminiContent(query);
      console.log('content:', content);
      const newBanners = content.map((item:any, index:number) => ({
        image: images[index % images.length], // Ensure there are enough images
        title: item.title,
        description: item.description,
        cta: item.callToAction,
        background: 'bg-gradient-to-r from-cyan-500 to-blue-500', // Example background
      }));
      setBanners(newBanners);
      console.log('Updated Banners:', newBanners);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    }
  };

  // JSX to render the search input and banner list
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4">
        <Input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for banners..."
          className="w-full max-w-md p-3 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <Button 
          type="submit"
          className="w-full max-w-md bg-cyan-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Search
        </Button>
      </form>
      <BannerList bannersProp={banners} className="mt-6" />
    </div>
  );
};

export default BannerSearch;

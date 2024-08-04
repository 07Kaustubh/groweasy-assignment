"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EditBannerSheet from "./EditBannerSheet";
import { PencilIcon } from "@heroicons/react/24/solid";

interface Banner {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

interface BannerListProps {
  bannersProp?: Banner[]; // Prop to accept banners from parent
}

const BannerList: React.FC<BannerListProps> = ({ bannersProp }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load banners from prop or JSON file
  useEffect(() => {
    if (bannersProp && bannersProp.length > 0) {
      setBanners(bannersProp); // Use provided banners if available
    } else {
      const loadBanners = async () => {
        try {
          const response = await fetch("/banners.json");
          const data = await response.json();
          setBanners(data);
        } catch (error) {
          console.error("Error fetching banners:", error);
        }
      };

      loadBanners();
    }
  }, [bannersProp]); // Depend on bannersProp so changes can trigger a reload

  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsEditing(true);
  };

  const handleSave = (updatedBanner: Banner) => {
    if (selectedBanner) {
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner === selectedBanner ? updatedBanner : banner
        )
      );
    }
    setIsEditing(false);
    setSelectedBanner(null);
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedBanner(null);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`overflow-hidden ${banner.background} rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 w-full md:w-1/2 lg:w-1/3 relative`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            width={500}
            height={300}
            className="object-cover w-full h-64 rounded-t-2xl"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{banner.title}</h2>
            <p className="mt-2 text-gray-600">{banner.description}</p>
            <a
              href="#"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              {banner.cta}
            </a>
            <button
              onClick={() => handleEditClick(banner)}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
              aria-label={`Edit ${banner.title}`}
            >
              <PencilIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      ))}
      {selectedBanner && (
        <EditBannerSheet
          isOpen={isEditing}
          onClose={handleClose}
          banner={selectedBanner}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default BannerList;

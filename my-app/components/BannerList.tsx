// components/BannerList.tsx
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

const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/banners.json");
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

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
    <div className="flex flex-wrap gap-4">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`p-4 ${banner.background} rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 relative`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            width={500}
            height={300}
            className="object-cover w-full h-48 rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{banner.title}</h2>
          <p className="mt-2">{banner.description}</p>
          <a
            href="#"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {banner.cta}
          </a>
          <button
            onClick={() => handleEditClick(banner)}
            className="absolute top-2 right-2 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
            aria-label={`Edit ${banner.title}`}
          >
            <PencilIcon className="h-6 w-6 text-gray-600" />
          </button>
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

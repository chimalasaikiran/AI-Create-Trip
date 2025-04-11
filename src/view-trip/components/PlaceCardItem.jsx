import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place&&GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
  const data = {
    textQuery: place?.placeName
  };

  try {
    const resp = await GetPlaceDetails(data);
    const photos = resp?.data?.places?.[0]?.photos;

    if (photos && photos.length > 0) {
      // Pick the first available photo
      const firstPhotoName = photos[0].name;
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', firstPhotoName);
      setPhotoUrl(PhotoUrl);
    } else {
      // Fallback image or null
      setPhotoUrl(null);
    }
  } catch (error) {
    console.error("Error fetching place photo:", error);
    setPhotoUrl(null);
  }
};

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName}
      target="_blank"
    >
      <div className="my-2 border rounded-xl p-3 mt-2 flex items-center gap-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img src={photoUrl} className='rounded-xl h-[130px] w-[130px] object-cover' />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <Button size="sm">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

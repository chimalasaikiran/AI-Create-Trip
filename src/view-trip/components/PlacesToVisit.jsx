// PlacesToVisit.jsx
import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || typeof itinerary !== 'object') {
    return <div>No itinerary data available.</div>;
  }

  const itineraryArray = Object.entries(itinerary).sort((a, b) => {
    const dayA = parseInt(a[0].replace('day', ''));
    const dayB = parseInt(b[0].replace('day', ''));
    return dayA - dayB;
  });

  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to Visit</h2>
      <div>
        {itineraryArray.map(([dayKey, dayValue], index) => (
          <div key={index} className='mt-4'>
            <h2 className='font-medium text-lg'>{`${dayKey}`}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {dayValue.activities?.map((place, idx) => (
                <div key={idx} className='ml-4 mt-3 my-4'>
                  <h2 className='font-medium text-sm text-orange-500'>{place.timeTravel}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
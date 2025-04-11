import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Footer from '../components/Footer';
import Hotels from '../components/Hotels';
import InfoSection from '../components/InfoSection';
import PlacesToVisit from '../components/PlacesToVisit';

function Viewtrip() {
  const { tripId } = useParams(); // ✅ Get tripId from the URL
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId&&GetTripData();
  }, [tripId]);

  // Fetch Trip Information from Firestore
  const GetTripData = async () => {
      const docRef = doc(db, 'AITrips', tripId);  
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        toast.error("No trip found!");
      }
    } 

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-55 '>
      {/* Infromation Section */}
        <InfoSection trip={trip}/>
      {/* Recommened Hotels */}
        <Hotels trip={trip} />
      {/* Daily Plan */}
        <PlacesToVisit trip={trip}/>
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;

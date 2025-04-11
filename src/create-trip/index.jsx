import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from '@/service/AIModal';
import { db } from '@/service/firebaseConfig';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [tripDays, setTripDays] = useState('');
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (place) {
      handleInputChange('location', place);
    }
  }, [place]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData?.noOfDays ||
      formData?.noOfDays <= 0
    ) {
      toast.error("Please enter all details correctly.");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log("🧠 AI Response Text:", responseText);

      await SaveAiTrip(responseText);
    } catch (err) {
      console.error("❌ Error generating trip:", err);
      toast.error('Something went wrong while generating your trip.');
    } finally {
      setLoading(false);
    }
  };

const SaveAiTrip = async (TripData) => {
  try {
    console.log("📦 Raw TripData received:", TripData); // <- log this!

    const parsedData = JSON.parse(TripData); // Might throw if not valid
    if (!parsedData) {
      throw new Error("TripData is not valid JSON.");
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsedData,
      userEmail: user?.email,
      id: docId
    });

    navigate('/view-trip/' + docId);
  } catch (err) {
    console.error("🔥 Failed to save trip:", err);
    toast.error('Failed to save trip data.');
  }
};


  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">#Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: setPlace,
              placeholder: 'Search for a destination...'
            }}
          />
        </div>

        {/* Trip Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
          <Input
            type="number"
            placeholder="Ex. 4"
            className="w-full"
            value={tripDays}
            onChange={(e) => {
              setTripDays(e.target.value);
              handleInputChange('noOfDays', e.target.value);
            }}
          />
        </div>

        {/* Traveler Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SelectTravelesList.map((item) => (
              <div key={item.id}
                onClick={() => {
                  setSelectedTraveler(item.people);
                  handleInputChange('traveler', item.people);
                }}
                className={`p-4 border rounded-lg flex flex-col items-center hover:cursor-pointer hover:shadow-lg transition ${selectedTraveler === item.people ? 'border-blue-500 shadow-md bg-blue-100' : ''}`}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="font-semibold">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget preference?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedBudget(item.title);
                  handleInputChange('budget', item.title);
                }}
                className={`p-4 border rounded-lg flex flex-col items-center hover:cursor-pointer hover:shadow-lg transition ${selectedBudget === item.title ? 'border-blue-500 shadow-md bg-blue-100' : ''}`}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="font-semibold">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      {/* Dialog for Sign In */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="WanderMind" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex items-center">
                <FcGoogle className='h-7 w-7' /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

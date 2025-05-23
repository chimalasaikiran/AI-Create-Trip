import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle state

  useEffect(() => {
    console.log(user);
    gsap.from('.header-title', { duration: 1, y: -50, opacity: 0, stagger: 0.2 });
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className='p-4 not-last:shadow-sm flex justify-between items-center px-5 relative'>
      <Link to={'/'}>
        <img  src='/logo.svg' alt="Logo" className='h-[30px]' />
      </Link>
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
              <Button variant="outline" className='rounded-full cursor-pointer'>Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className='rounded-full cursor-pointer'>View My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='rounded-full h-[35px] w-[35px]' alt="User Profile" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Sign Out</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>LogIn</Button>
        )}
      </div>
      
      {/* Mobile menu toggle */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="text-2xl"
        >
          {menuOpen ? 'X' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-5 bg-white shadow-lg p-4 rounded-md w-40 z-10">
          {user ? (
            <div className="flex flex-col gap-2">
              <Link to='/create-trip'>
                <Button variant="outline" className='w-full rounded-full cursor-pointer'>Create Trip</Button>
              </Link>
              <Link to='/my-trips'>
                <Button variant="outline" className='w-full rounded-full cursor-pointer'>View My Trips</Button>
              </Link>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} className='rounded-full h-[35px] w-[35px] ' alt="User Profile" />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Sign Out</h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)} className="w-full">Log In</Button>
          )}
        </div>
      )}

      {/* Dialog for login */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="header-title font-bold text-lg mt-7">Join Us with Google</h2>
              <p>Access your adventures securely with Google authentication.</p>
              <Button onClick={login} className="w-full mt-5 flex items-center">
                <FcGoogle className='h-7 w-7' /> Log In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

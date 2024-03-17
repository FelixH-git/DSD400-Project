import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import CreateBook from '../components/createBookComponent';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/isloggedin'); 
        if (response.ok) {
          setIsLoggedIn(true);
        } else if(response.status == 403) {
          setIsLoggedIn(false);

        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {isLoggedIn ? (
          <CreateBook />
      ) : (
        <div>
          <p>Not Logged in</p>
          <a href='/login'>Click here to login</a>
        </div>
          
      )}
    </>
  );
}

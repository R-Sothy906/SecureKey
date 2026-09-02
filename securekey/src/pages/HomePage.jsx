import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import BestsellersSection from '@/components/BestsellersSection';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>SecureKey - Home | Genuine Software Licenses</title>
        <meta name="description" content="Welcome to SecureKey. Your trusted source for genuine Windows, Office, and Antivirus keys with instant delivery." />
        <link rel="canonical" href="https://securekey.online/" />
        <meta property="og:title" content="SecureKey - Home | Genuine Software Licenses" />
        <meta property="og:url" content="https://securekey.online/" />
        <meta property="og:image" content="https://securekey.online/og-image.jpg" />
      </Helmet>
      <HeroSection />
      <BestsellersSection />
    </>
  );
}

export default HomePage;
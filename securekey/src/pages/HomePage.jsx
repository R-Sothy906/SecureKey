// import React from 'react';
// import { Helmet } from 'react-helmet';
// import HeroSection from '@/components/HeroSection';
// import BestsellersSection from '@/components/BestsellersSection';

// function HomePage() {
//   return (
//     <>
//       <Helmet>
//         <title>SecureKey - Home | Genuine Software Licenses</title>
//         <meta name="description" content="Welcome to SecureKey. Your trusted source for genuine Windows, Office, and Antivirus keys with instant delivery." />
//         <link rel="canonical" href="https://securekey.online/" />
//         <meta property="og:title" content="SecureKey - Home | Genuine Software Licenses" />
//         <meta property="og:url" content="https://securekey.online/" />
//         <meta property="og:image" content="https://securekey.online/og-image.jpg" />
//       </Helmet>
//       <HeroSection />
//       <BestsellersSection />
//     </>
//   );
// }

// export default HomePage;



import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import BestsellersSection from '@/components/BestsellersSection';

function HomePage() {
  useEffect(() => {
    // Load Adterra scripts dynamically
    const script1 = document.createElement('script');
    script1.src = 'https://pl31181497.profitableratecpmnetwork.com/bc/bb/ba/bcbbba9b9fe5dfa2ea029920fa1dda50.js';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://pl31181498.profitableratecpmnetwork.com/a0/7a/89/a07a89c664a104816037084740e67715.js';
    script2.async = true;
    document.head.appendChild(script2);

    // Cleanup: Remove scripts when component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

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

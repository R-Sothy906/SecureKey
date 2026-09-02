import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  En: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      send: 'Send',
      required: 'Required',
      back: 'Back',
      continue: 'Continue',
      search: 'Search',
      clearFilters: 'Clear All',
      filters: 'Filters',
      perPage: 'per page',
      viewDetails: 'View Details',
      quickView: 'Quick View',
      outOfStock: 'Out of Stock',
      soldOut: 'Sold Out'
    },
    nav: {
      home: 'Home',
      products: 'Products',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      logout: 'Log out',
      welcome: 'Welcome',
      guest: 'Guest User',
      loggedIn: 'Logged in',
      notLoggedIn: 'Not logged in',
      language: 'Language'
    },
    footer: {
      brandDesc: 'Your trusted source for genuine software licenses. We provide secure, instant delivery for enterprise and personal needs.',
      quickLinks: 'Quick Links',
      support: 'Support',
      contactUs: 'Contact Us',
      rights: 'All rights reserved.',
      shipping: 'Shipping Info',
      returns: 'Returns',
      faq: 'FAQ',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    hero: {
      title: "Enterprise Upgrade:",
      subtitle: "60% OFF First Year!",
      limited: "Limited Time Offer...",
      hotDeal: "Hot Deal 4 of 8",
      cycle: "Promotion auto-cycles every 15.78s"
    },
    bestsellers: {
      header: "Best Selling Products",
      subHeader: "Discover our most popular items loved by thousands of customers worldwide.",
      happyCustomers: "Happy Customers",
      flashSale: "Flash Sale Ends In",
      days: "days",
      hours: "hours",
      mins: "mins",
      save: "Save",
      quantity: "Quantity",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      bestSellerBadge: "Best Seller"
    },
    productsPage: {
      title: "Our Products",
      subtitle: "Discover amazing products at great prices",
      searchPlaceholder: "Search products...",
      productsFound: "Products Found",
      noProducts: "No products found",
      noProductsDesc: "We couldn't find any products matching your current filters. Try adjusting your search criteria.",
      categories: "Categories",
      priceRange: "Price Range",
      sort: {
        label: "Sort By",
        featured: "Featured",
        priceLowHigh: "Price: Low to High",
        priceHighLow: "Price: High to Low",
        nameAZ: "Name: A-Z"
      }
    },
    about: {
      heroTitle: "Your Trusted Partner for",
      heroTitleHighlight: "Genuine Software Licenses",
      heroDesc: "We specialize in providing authentic software licenses for Windows, Kaspersky antivirus, and premium productivity tools. With years of experience in digital distribution, we ensure you get 100% genuine products with instant delivery and lifetime activation.",
      statLicenses: "Licenses Sold",
      statSuccess: "Activation Success Rate",
      statSupport: "Technical Support",
      officialReseller: "Official Reseller",
      officialResellerDesc: "Authorized distributor for Microsoft, Kaspersky, and leading software brands",
      missionTitle: "Global Reach",
      missionDesc: "Serving customers worldwide with instant digital delivery to any location",
      instantTitle: "Instant Delivery",
      instantDesc: "License keys delivered immediately after purchase via email and dashboard",
      supportTitle: "Complete Support",
      supportDesc: "Activation assistance and technical support for all purchased software",
      valuesTitle: "Our Core Values",
      valuesSubtitle: "Building trust through authenticity, reliability, and exceptional customer service",
      valGenuine: "100% Genuine Products",
      valGenuineDesc: "We guarantee all our software licenses are authentic and directly sourced from authorized distributors.",
      valCustomer: "Customer-First Approach",
      valCustomerDesc: "Your satisfaction is our priority. We provide personalized recommendations and ongoing support.",
      valExpertise: "Industry Expertise",
      valExpertiseDesc: "Years of experience in software licensing ensures you get the best advice and solutions.",
      whyTitle: "Why Choose Us?",
      whySubtitle: "We make software purchasing simple, secure, and reliable",
      why1: "Wide Selection",
      why1Desc: "From Windows OS to security software and productivity tools",
      why2: "Competitive Pricing",
      why2Desc: "Best prices for genuine software with transparent costs",
      why3: "Lifetime Updates",
      why3Desc: "Enjoy free updates and security patches for your software",
      why4: "Money-Back Guarantee",
      why4Desc: "Full refund if your license doesn't activate successfully",
      ctaTitle: "Ready to Get Your Genuine Software?",
      ctaDesc: "Browse our collection of authentic software licenses with instant delivery and full support.",
      viewProducts: "View Products",
      contactUs: "Contact Us"
    },
    contact: {
      heroTitle: "Get in",
      heroTitleHighlight: "Touch",
      heroDesc: "Have questions about software licenses? Our support team is here to help you 24/7.",
      emailSupport: "Email Support",
      emailDesc: "Get detailed assistance via email",
      phoneSupport: "Phone Support",
      phoneDesc: "Call us during business hours",
      responseTime: "Response Time",
      responseDesc: "We typically respond within",
      hours: "2-4 Hours",
      supportFeatures: "24/7 Support Features",
      feat1: "Instant response to license issues",
      feat2: "Activation assistance within minutes",
      feat3: "Genuine product guarantee",
      formTitle: "Send us a Message",
      formSubtitle: "We'll get back to you as soon as possible",
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      message: "Your Message",
      sendMessage: "Send Message",
      sending: "Sending...",
      privacyNote: "By submitting, you agree to our terms. Your data is protected and sent securely.",
      loginRequired: "Login Required",
      loginDesc: "Please login first to use the contact form. We need to verify your identity to provide secure support for your licenses.",
      loginBtn: "Login to Continue",
      fastResponse: "Fast Response",
      securePrivate: "Secure & Private",
      expertSupport: "Expert Support"
    },
    login: {
      title: "SecureKey",
      subtitle: "Secure access to your enterprise licenses",
      footerText: "By signing in, you agree to our",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy"
    },
    cart: {
      emptyTitle: "Your cart is empty",
      emptyDesc: "Looks like you haven't added any software licenses yet.",
      continueShopping: "Continue Shopping",
      title: "Shopping Cart",
      items: "items",
      licenseKey: "License Key (Digital Delivery)",
      clearCart: "Clear Cart",
      summary: "Order Summary",
      subtotal: "Subtotal",
      discount: "Discount",
      tax: "Tax",
      total: "Total",
      checkout: "Checkout",
      secure: "Secure Checkout with SSL Encryption"
    },
    checkout: {
      title: "Secure Checkout",
      contactInfo: "Contact Information",
      firstName: "First Name",
      lastName: "Last Name",
      paymentMethod: "Payment Method",
      card: "Credit / Debit Card",
      expiry: "Expiry Date",
      cvc: "CVC",
      pay: "Pay",
      orderConfirmed: "Order Confirmed!",
      thankYou: "Thank you for your purchase.",
      nextSteps: "What happens next?",
      backHome: "Back to Home"
    },
    services: {
      heroTitle: "Software Licenses & Tech Accessories",
      heroDesc: "Genuine software licenses and premium accessories at competitive prices. Instant delivery with full technical support.",
      badges: {
        genuine: "100% Genuine Licenses",
        instant: "Instant Delivery",
        guarantee: "Money-Back Guarantee",
        support: "Technical Support"
      },
      softwareTitle: "Software Licenses",
      softwareDesc: "Authentic software licenses with lifetime activation and automatic updates",
      accessoriesTitle: "Tech Accessories",
      accessoriesDesc: "Premium accessories and peripherals for your devices",
      popular: "Popular Products:",
      brands: "Featured Brands:",
      browseBtn: "Browse Accessories",
      ctaTitle: "Ready to Get Started?",
      ctaDesc: "Get genuine software licenses and premium accessories with instant delivery. Need help choosing? Our team is here to assist you.",
      browseAll: "Browse All Products"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our products and billing. Can't find the answer you're looking for? Please chat to our friendly team.",
      stillQuestions: "Still have questions?",
      contactSupport: "Contact Support",
      submitTicket: "Submit a Ticket"
    },
    shipping: {
      title: "Digital Delivery Policy",
      subtitle: "At SecureKey, we believe in speed. That's why 99% of our products are delivered instantly to your inbox.",
      instantTitle: "Instant Delivery",
      instantDesc: "Once your payment is confirmed, our automated system sends the license key to your registered email address within seconds.",
      emailTitle: "Check Your Email",
      emailDesc: "The email will contain your product key, official download link, and basic installation instructions.",
      physicalTitle: "No Physical Shipping",
      physicalDesc: "We sell digital licenses only. No physical boxes, CDs, or USB drives will be shipped to your address.",
      verificationTitle: "Manual Verification",
      verificationDesc: "In rare cases (large orders or high-value items), we may manually verify the order to prevent fraud.",
      questionsTitle: "Questions about your order?",
      questionsDesc: "If you haven't received your key within 1 hour of purchase, please contact our support team immediately."
    },
    returns: {
      title: "Returns & Refund Policy",
      subtitle: "We want you to be completely satisfied with your purchase. However, due to the nature of digital products, our refund policy has specific conditions.",
      eligible: "Eligible for Refund",
      notEligible: "Not Eligible",
      request: "How to Request a Refund",
      unredeemed: "Unredeemed Keys",
      unredeemedDesc: "If you have not viewed or redeemed the key, you can request a full refund within 14 days of purchase.",
      faulty: "Faulty Keys",
      faultyDesc: "If a key is invalid or fails to activate, we will first verify the error. If confirmed faulty, we will provide a replacement or full refund.",
      redeemed: "Redeemed Keys",
      redeemedDesc: "Once a key has been viewed, revealed, or redeemed, it cannot be refunded as we can no longer sell it to another customer.",
      contactSupport: "To initiate a return, please contact our support team at"
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Please read these terms carefully before using our service.",
      acceptance: "1. Acceptance of Terms",
      acceptanceDesc: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
      licensing: "2. Product Licensing & Usage",
      licensingDesc: "SecureKey sells legitimate digital license keys. By purchasing a key, you are granted a license to use the software according to the manufacturer's End User License Agreement (EULA).",
      liability: "3. Limitation of Liability",
      liabilityDesc: "In no event shall SecureKey be liable for any damages arising out of the use or inability to use the materials on SecureKey's website.",
      account: "4. Account Responsibilities",
      accountDesc: "You are responsible for maintaining the confidentiality of your account and password.",
      pricing: "5. Pricing & Availability",
      pricingDesc: "Prices and availability of products are subject to change without notice."
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 08, 2025",
      collect: "1. Information We Collect",
      collectDesc: "We collect information you provide directly to us when you create an account, make a purchase, or communicate with us.",
      use: "2. How We Use Your Information",
      useDesc: "We use the information we collect to process your transactions, deliver digital license keys, and send transaction confirmations.",
      security: "3. Data Protection & Security",
      securityDesc: "We implement a variety of security measures to maintain the safety of your personal information. All sensitive/credit information is encrypted via SSL technology.",
      cookies: "4. Cookies and Tracking",
      cookiesDesc: "We use cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits.",
      contact: "If you have any questions about this Privacy Policy, please contact us at"
    },
    profile: {
      fullName: "Full Name",
      phone: "Phone Number",
      address: "Address",
      save: "Save Changes",
      saving: "Saving...",
      verified: "Verified Member"
    }
  },
  Kh: {
    common: {
      loading: 'កំពុងដំណើរការ...',
      save: 'រក្សាទុក',
      cancel: 'បោះបង់',
      submit: 'ដាក់ស្នើ',
      send: 'ផ្ញើ',
      required: 'ចាំបាច់',
      back: 'ត្រឡប់ក្រោយ',
      continue: 'បន្ត',
      search: 'ស្វែងរក',
      clearFilters: 'សម្អាតទាំងអស់',
      filters: 'តម្រង',
      perPage: 'ក្នុងមួយទំព័រ',
      viewDetails: 'មើលលម្អិត',
      quickView: 'មើលរហ័ស',
      outOfStock: 'អស់ពីស្តុក',
      soldOut: 'លក់អស់'
    },
    nav: {
      home: 'ទំព័រដើម',
      products: 'ផលិតផល',
      services: 'សេវាកម្ម',
      about: 'អំពីយើង',
      contact: 'ទំនាក់ទំនង',
      login: 'ចូលប្រើ',
      register: 'ចុះឈ្មោះ',
      logout: 'ចាកចេញ',
      welcome: 'សូមស្វាគមន៍',
      guest: 'ភ្ញៀវ',
      loggedIn: 'បានចូល',
      notLoggedIn: 'មិនទាន់ចូល',
      language: 'ភាសា'
    },
    footer: {
      brandDesc: 'ប្រភពដែលអាចទុកចិត្តបានរបស់អ្នកសម្រាប់អាជ្ញាប័ណ្ណកម្មវិធីពិត។ យើងផ្តល់ជូននូវការដឹកជញ្ជូនដោយសុវត្ថិភាពនិងរហ័សសម្រាប់តម្រូវការសហគ្រាសនិងផ្ទាល់ខ្លួន។',
      quickLinks: 'តំណភ្ជាប់រហ័ស',
      support: 'ជំនួយ',
      contactUs: 'ទាក់ទងមកយើង',
      rights: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
      shipping: 'ព័ត៌មានដឹកជញ្ជូន',
      returns: 'ការត្រឡប់មកវិញ',
      faq: 'សំណួរដែលសួរញឹកញាប់',
      privacy: 'គោលការណ៍ឯកជនភាព',
      terms: 'លក្ខខណ្ឌប្រើប្រាស់'
    },
    hero: {
      title: "ការធ្វើឱ្យប្រសើរឡើងសហគ្រាស:",
      subtitle: "បញ្ចុះតម្លៃ ៦០% ឆ្នាំដំបូង!",
      limited: "ការផ្តល់ជូនមានពេលកំណត់...",
      hotDeal: "ការផ្តល់ជូនពិសេស ៤ នៃ ៨",
      cycle: "ការផ្សព្វផ្សាយវិលជុំរៀងរាល់ ១៥.៧៨ វិនាទី"
    },
    bestsellers: {
      header: "ផលិតផលលក់ដាច់បំផុត",
      subHeader: "ស្វែងរកផលិតផលពេញនិយមបំផុតរបស់យើងដែលពេញចិត្តដោយអតិថិជនរាប់ពាន់នាក់នៅទូទាំងពិភពលោក។",
      happyCustomers: "អតិថិជនសប្បាយចិត្ត",
      flashSale: "ការលក់បញ្ចុះតម្លៃបញ្ចប់ក្នុង",
      days: "ថ្ងៃ",
      hours: "ម៉ោង",
      mins: "នាទី",
      save: "សន្សំ",
      quantity: "ចំនួន",
      addToCart: "បន្ថែមទៅកន្ត្រក",
      buyNow: "ទិញឥឡូវនេះ",
      bestSellerBadge: "លក់ដាច់បំផុត"
    },
    productsPage: {
      title: "ផលិតផលរបស់យើង",
      subtitle: "ស្វែងរកផលិតផលដ៏អស្ចារ្យក្នុងតម្លៃសមរម្យ",
      searchPlaceholder: "ស្វែងរកផលិតផល...",
      productsFound: "ផលិតផលត្រូវបានរកឃើញ",
      noProducts: "រកមិនឃើញផលិតផលទេ",
      noProductsDesc: "យើងរកមិនឃើញផលិតផលណាមួយដែលត្រូវនឹងតម្រងបច្ចុប្បន្នរបស់អ្នកទេ។ សូមព្យាយាមកែសម្រួលការស្វែងរករបស់អ្នក។",
      categories: "ប្រភេទ",
      priceRange: "ចន្លោះតម្លៃ",
      sort: {
        label: "តម្រៀបតាម",
        featured: "លក្ខណៈពិសេស",
        priceLowHigh: "តម្លៃ៖ ទាបទៅខ្ពស់",
        priceHighLow: "តម្លៃ៖ ខ្ពស់ទៅទាប",
        nameAZ: "ឈ្មោះ៖ A-Z"
      }
    },
    about: {
      heroTitle: "ដៃគូដែលអាចទុកចិត្តបានរបស់អ្នកសម្រាប់",
      heroTitleHighlight: "អាជ្ញាប័ណ្ណកម្មវិធីពិតប្រាកដ",
      heroDesc: "យើងមានជំនាញក្នុងការផ្តល់ជូនអាជ្ញាប័ណ្ណកម្មវិធីពិតប្រាកដសម្រាប់ Windows, កំចាត់មេរោគ Kaspersky និងឧបករណ៍ផលិតភាពលំដាប់ខ្ពស់។ ជាមួយនឹងបទពិសោធន៍ជាច្រើនឆ្នាំក្នុងការចែកចាយឌីជីថល យើងធានាថាអ្នកទទួលបានផលិតផលពិត ១០០% ជាមួយនឹងការដឹកជញ្ជូនភ្លាមៗ និងការប្រើប្រាស់មួយជីវិត។",
      statLicenses: "អាជ្ញាប័ណ្ណដែលបានលក់",
      statSuccess: "អត្រាជោគជ័យនៃការបើកដំណើរការ",
      statSupport: "ជំនួយបច្ចេកទេស",
      officialReseller: "អ្នកលក់បន្តផ្លូវការ",
      officialResellerDesc: "អ្នកចែកចាយដែលមានការអនុញ្ញាតសម្រាប់ Microsoft, Kaspersky និងម៉ាកកម្មវិធីឈានមុខគេ",
      missionTitle: "ការឈានដល់សកលលោក",
      missionDesc: "បម្រើអតិថិជនទូទាំងពិភពលោកជាមួយនឹងការដឹកជញ្ជូនឌីជីថលភ្លាមៗទៅកាន់ទីតាំងណាមួយ",
      instantTitle: "ការដឹកជញ្ជូនភ្លាមៗ",
      instantDesc: "កូដអាជ្ញាប័ណ្ណត្រូវបានចែកចាយភ្លាមៗបន្ទាប់ពីការទិញតាមរយៈអ៊ីមែល និងផ្ទាំងគ្រប់គ្រង",
      supportTitle: "ជំនួយពេញលេញ",
      supportDesc: "ជំនួយការបើកដំណើរការ និងជំនួយបច្ចេកទេសសម្រាប់កម្មវិធីទាំងអស់ដែលបានទិញ",
      valuesTitle: "គុណតម្លៃស្នូលរបស់យើង",
      valuesSubtitle: "កសាងទំនុកចិត្តតាមរយៈភាពត្រឹមត្រូវ ភាពអាចទុកចិត្តបាន និងសេវាកម្មអតិថិជនដ៏ល្អឥតខ្ចោះ",
      valGenuine: "ផលិតផលពិត ១០០%",
      valGenuineDesc: "យើងធានាថាអាជ្ញាប័ណ្ណកម្មវិធីរបស់យើងទាំងអស់គឺពិតប្រាកដ និងមានប្រភពផ្ទាល់ពីអ្នកចែកចាយដែលមានការអនុញ្ញាត។",
      valCustomer: "អតិថិជនជាចម្បង",
      valCustomerDesc: "ការពេញចិត្តរបស់អ្នកគឺជាអាទិភាពរបស់យើង។ យើងផ្តល់ជូននូវអនុសាសន៍ផ្ទាល់ខ្លួន និងជំនួយបន្ត។",
      valExpertise: "ជំនាញក្នុងឧស្សាហកម្ម",
      valExpertiseDesc: "បទពិសោធន៍ជាច្រើនឆ្នាំក្នុងការផ្តល់អាជ្ញាប័ណ្ណកម្មវិធីធានាថាអ្នកទទួលបានដំបូន្មាន និងដំណោះស្រាយល្អបំផុត។",
      whyTitle: "ហេតុអ្វីជ្រើសរើសយើង?",
      whySubtitle: "យើងធ្វើឱ្យការទិញកម្មវិធីមានភាពសាមញ្ញ សុវត្ថិភាព និងអាចទុកចិត្តបាន",
      why1: "ជម្រើសទូលំទូលាយ",
      why1Desc: "ពីប្រព័ន្ធប្រតិបត្តិការ Windows ដល់កម្មវិធីសុវត្ថិភាព និងឧបករណ៍ផលិតភាព",
      why2: "តម្លៃប្រកួតប្រជែង",
      why2Desc: "តម្លៃល្អបំផុតសម្រាប់កម្មវិធីពិតជាមួយនឹងតម្លៃតម្លាភាព",
      why3: "ការធ្វើបច្ចុប្បន្នភាពមួយជីវិត",
      why3Desc: "រីករាយជាមួយការធ្វើបច្ចុប្បន្នភាពឥតគិតថ្លៃ និងបំណះសុវត្ថិភាពសម្រាប់កម្មវិធីរបស់អ្នក",
      why4: "ធានាសងប្រាក់វិញ",
      why4Desc: "សងប្រាក់វិញពេញលេញប្រសិនបើអាជ្ញាប័ណ្ណរបស់អ្នកមិនដំណើរការ",
      ctaTitle: "ត្រៀមខ្លួនទទួលកម្មវិធីពិតរបស់អ្នកហើយឬនៅ?",
      ctaDesc: "មើលបណ្តុំអាជ្ញាប័ណ្ណកម្មវិធីពិតប្រាកដរបស់យើងជាមួយនឹងការដឹកជញ្ជូនភ្លាមៗ និងជំនួយពេញលេញ។",
      viewProducts: "មើលផលិតផល",
      contactUs: "ទាក់ទងមកយើង"
    },
    contact: {
      heroTitle: "ទំនាក់ទំនង",
      heroTitleHighlight: "មកយើង",
      heroDesc: "មានសំណួរអំពីអាជ្ញាប័ណ្ណកម្មវិធីមែនទេ? ក្រុមជំនួយរបស់យើងនៅទីនេះដើម្បីជួយអ្នក ២៤/៧។",
      emailSupport: "ជំនួយតាមអ៊ីមែល",
      emailDesc: "ទទួលបានជំនួយលម្អិតតាមរយៈអ៊ីមែល",
      phoneSupport: "ជំនួយតាមទូរស័ព្ទ",
      phoneDesc: "ហៅមកយើងក្នុងម៉ោងធ្វើការ",
      responseTime: "ពេលវេលាឆ្លើយតប",
      responseDesc: "យើងឆ្លើយតបជាធម្មតាក្នុងរយៈពេល",
      hours: "២-៤ ម៉ោង",
      supportFeatures: "លក្ខណៈពិសេសជំនួយ ២៤/៧",
      feat1: "ការឆ្លើយតបភ្លាមៗចំពោះបញ្ហាអាជ្ញាប័ណ្ណ",
      feat2: "ជំនួយការបើកដំណើរការក្នុងរយៈពេលប៉ុន្មាននាទី",
      feat3: "ការធានាផលិតផលពិត",
      formTitle: "ផ្ញើសារមកយើង",
      formSubtitle: "យើងនឹងទាក់ទងអ្នកវិញឱ្យបានឆាប់តាមដែលអាចធ្វើទៅបាន",
      name: "ឈ្មោះ​ពេញ",
      email: "អាសយដ្ឋានអ៊ីមែល",
      subject: "ប្រធានបទ",
      message: "សាររបស់អ្នក",
      sendMessage: "ផ្ញើសារ",
      sending: "កំពុងផ្ញើ...",
      privacyNote: "ដោយការដាក់ស្នើ អ្នកយល់ព្រមនឹងលក្ខខណ្ឌរបស់យើង។ ទិន្នន័យរបស់អ្នកត្រូវបានការពារ និងផ្ញើដោយសុវត្ថិភាព។",
      loginRequired: "តម្រូវឱ្យចូលប្រើ",
      loginDesc: "សូមចូលប្រើជាមុនដើម្បីប្រើទម្រង់ទំនាក់ទំនង។ យើងត្រូវផ្ទៀងផ្ទាត់អត្តសញ្ញាណរបស់អ្នកដើម្បីផ្តល់ជំនួយដែលមានសុវត្ថិភាពសម្រាប់អាជ្ញាប័ណ្ណរបស់អ្នក។",
      loginBtn: "ចូលដើម្បីបន្ត",
      fastResponse: "ការឆ្លើយតបរហ័ស",
      securePrivate: "សុវត្ថិភាព & ឯកជន",
      expertSupport: "ជំនួយអ្នកជំនាញ"
    },
    login: {
      title: "SecureKey",
      subtitle: "ការចូលប្រើដោយសុវត្ថិភាពទៅកាន់អាជ្ញាប័ណ្ណសហគ្រាសរបស់អ្នក",
      footerText: "ដោយការចូលប្រើ អ្នកយល់ព្រមនឹង",
      terms: "លក្ខខណ្ឌប្រើប្រាស់",
      and: "និង",
      privacy: "គោលការណ៍ឯកជនភាព",
      ours: "របស់យើង"
    },
    cart: {
      emptyTitle: "កន្ត្រករបស់អ្នកទទេ",
      emptyDesc: "មើលទៅអ្នកមិនទាន់បានបន្ថែមអាជ្ញាប័ណ្ណកម្មវិធីណាមួយនៅឡើយទេ។",
      continueShopping: "បន្តការទិញទំនិញ",
      title: "កន្ត្រកទំនិញ",
      items: "ធាតុ",
      licenseKey: "កូដអាជ្ញាប័ណ្ណ (ការដឹកជញ្ជូនតាមឌីជីថល)",
      clearCart: "សម្អាតកន្ត្រក",
      summary: "សង្ខេបការបញ្ជាទិញ",
      subtotal: "សរុប",
      discount: "ការបញ្ចុះតម្លៃ",
      tax: "ពន្ធ",
      total: "សរុបរួម",
      checkout: "ទូទាត់ប្រាក់",
      secure: "ការទូទាត់ដោយសុវត្ថិភាពជាមួយការអ៊ិនគ្រីប SSL"
    },
    checkout: {
      title: "ការទូទាត់ដោយសុវត្ថិភាព",
      contactInfo: "ព័ត៌មានទំនាក់ទំនង",
      firstName: "នាមខ្លួន",
      lastName: "នាមត្រកូល",
      paymentMethod: "វិធីសាស្រ្តទូទាត់",
      card: "កាតឥណទាន / ឥណពន្ធ",
      expiry: "កាលបរិច្ឆេទផុតកំណត់",
      cvc: "CVC",
      pay: "បង់ប្រាក់",
      orderConfirmed: "ការបញ្ជាទិញត្រូវបានបញ្ជាក់!",
      thankYou: "សូមអរគុណសម្រាប់ការទិញរបស់អ្នក។",
      nextSteps: "តើមានអ្វីកើតឡើងបន្ទាប់?",
      backHome: "ត្រឡប់ទៅទំព័រដើម"
    },
    services: {
      heroTitle: "អាជ្ញាប័ណ្ណកម្មវិធី និងគ្រឿងបន្លាស់បច្ចេកវិទ្យា",
      heroDesc: "អាជ្ញាប័ណ្ណកម្មវិធីពិតប្រាកដ និងគ្រឿងបន្លាស់លំដាប់ខ្ពស់ក្នុងតម្លៃប្រកួតប្រជែង។ ការដឹកជញ្ជូនភ្លាមៗជាមួយនឹងជំនួយបច្ចេកទេសពេញលេញ។",
      badges: {
        genuine: "អាជ្ញាប័ណ្ណពិត ១០០%",
        instant: "ការដឹកជញ្ជូនភ្លាមៗ",
        guarantee: "ធានាសងប្រាក់វិញ",
        support: "ជំនួយបច្ចេកទេស"
      },
      softwareTitle: "អាជ្ញាប័ណ្ណកម្មវិធី",
      softwareDesc: "អាជ្ញាប័ណ្ណកម្មវិធីពិតប្រាកដជាមួយនឹងការបើកដំណើរការមួយជីវិត និងការធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ",
      accessoriesTitle: "គ្រឿងបន្លាស់បច្ចេកវិទ្យា",
      accessoriesDesc: "គ្រឿងបន្លាស់ និងឧបករណ៍លំដាប់ខ្ពស់សម្រាប់ឧបករណ៍របស់អ្នក",
      popular: "ផលិតផលពេញនិយម៖",
      brands: "ម៉ាកពិសេស៖",
      browseBtn: "មើលគ្រឿងបន្លាស់",
      ctaTitle: "ត្រៀមខ្លួនចាប់ផ្តើមហើយឬនៅ?",
      ctaDesc: "ទទួលបានអាជ្ញាប័ណ្ណកម្មវិធីពិតប្រាកដ និងគ្រឿងបន្លាស់លំដាប់ខ្ពស់ជាមួយនឹងការដឹកជញ្ជូនភ្លាមៗ។ ត្រូវការជំនួយក្នុងការជ្រើសរើសមែនទេ? ក្រុមការងាររបស់យើងនៅទីនេះដើម្បីជួយអ្នក។",
      browseAll: "មើលផលិតផលទាំងអស់"
    },
    faq: {
      title: "សំណួរដែលសួរញឹកញាប់",
      subtitle: "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងអំពីផលិតផលនិងការទូទាត់របស់យើង។ រកមិនឃើញចម្លើយដែលអ្នកកំពុងស្វែងរកមែនទេ? សូមជជែកជាមួយក្រុមការងាររបស់យើង។",
      stillQuestions: "នៅតែមានសំណួរ?",
      contactSupport: "ទាក់ទងជំនួយ",
      submitTicket: "ដាក់ស្នើសំណើ"
    },
    shipping: {
      title: "គោលការណ៍ដឹកជញ្ជូនឌីជីថល",
      subtitle: "នៅ SecureKey យើងជឿជាក់លើល្បឿន។ នោះហើយជាមូលហេតុដែល ៩៩% នៃផលិតផលរបស់យើងត្រូវបានចែកចាយភ្លាមៗទៅកាន់ប្រអប់សំបុត្ររបស់អ្នក។",
      instantTitle: "ការដឹកជញ្ជូនភ្លាមៗ",
      instantDesc: "នៅពេលដែលការទូទាត់របស់អ្នកត្រូវបានបញ្ជាក់ ប្រព័ន្ធស្វ័យប្រវត្តិរបស់យើងផ្ញើកូដអាជ្ញាប័ណ្ណទៅកាន់អាសយដ្ឋានអ៊ីមែលដែលបានចុះឈ្មោះរបស់អ្នកក្នុងរយៈពេលប៉ុន្មានវិនាទី។",
      emailTitle: "ពិនិត្យអ៊ីមែលរបស់អ្នក",
      emailDesc: "អ៊ីមែលនឹងមានកូដផលិតផលរបស់អ្នក តំណទាញយកផ្លូវការ និងការណែនាំអំពីការដំឡើងជាមូលដ្ឋាន។",
      physicalTitle: "មិនមានការដឹកជញ្ជូនរូបវ័ន្ត",
      physicalDesc: "យើងលក់តែអាជ្ញាប័ណ្ណឌីជីថលប៉ុណ្ណោះ។ គ្មានប្រអប់ ស៊ីឌី ឬ USB នឹងត្រូវបានដឹកជញ្ជូនទៅកាន់អាសយដ្ឋានរបស់អ្នកឡើយ។",
      verificationTitle: "ការផ្ទៀងផ្ទាត់ដោយដៃ",
      verificationDesc: "ក្នុងករណីកម្រ (ការបញ្ជាទិញធំ ឬទំនិញដែលមានតម្លៃខ្ពស់) យើងអាចផ្ទៀងផ្ទាត់ការបញ្ជាទិញដោយដៃដើម្បីការពារការក្លែងបន្លំ។",
      questionsTitle: "មានសំណួរអំពីការបញ្ជាទិញរបស់អ្នកមែនទេ?",
      questionsDesc: "ប្រសិនបើអ្នកមិនទាន់បានទទួលកូដរបស់អ្នកក្នុងរយៈពេល ១ ម៉ោងនៃការទិញ សូមទាក់ទងក្រុមជំនួយរបស់យើងភ្លាមៗ។"
    },
    returns: {
      title: "គោលការណ៍ត្រឡប់មកវិញនិងសងប្រាក់",
      subtitle: "យើងចង់ឱ្យអ្នកពេញចិត្តនឹងការទិញរបស់អ្នកទាំងស្រុង។ ទោះយ៉ាងណាក៏ដោយ ដោយសារតែលក្ខណៈនៃផលិតផលឌីជីថល គោលការណ៍សងប្រាក់វិញរបស់យើងមានលក្ខខណ្ឌជាក់លាក់។",
      eligible: "មានសិទ្ធិទទួលបានការសងប្រាក់វិញ",
      notEligible: "មិនមានសិទ្ធិ",
      request: "របៀបស្នើសុំការសងប្រាក់វិញ",
      unredeemed: "កូដដែលមិនទាន់បានប្រើ",
      unredeemedDesc: "ប្រសិនបើអ្នកមិនទាន់បានមើល ឬប្រើកូដ អ្នកអាចស្នើសុំការសងប្រាក់វិញពេញលេញក្នុងរយៈពេល ១៤ ថ្ងៃនៃការទិញ។",
      faulty: "កូដមានបញ្ហា",
      faultyDesc: "ប្រសិនបើកូដមិនត្រឹមត្រូវឬមិនអាចដំណើរការបាន យើងនឹងធ្វើការត្រួតពិនិត្យជាមុន។ ប្រសិនបើបញ្ជាក់ថាមានបញ្ហា យើងនឹងផ្តល់ជូនការជំនួសឬសងប្រាក់វិញពេញលេញ។",
      redeemed: "កូដដែលបានប្រើ",
      redeemedDesc: "នៅពេលដែលកូដត្រូវបានមើល បង្ហាញ ឬប្រើប្រាស់ វាមិនអាចសងប្រាក់វិញបានទេព្រោះយើងមិនអាចលក់វាទៅឱ្យអតិថិជនផ្សេងទៀតបានទេ។",
      contactSupport: "ដើម្បីចាប់ផ្តើមការត្រឡប់មកវិញ សូមទាក់ទងក្រុមគាំទ្ររបស់យើងនៅ"
    },
    terms: {
      title: "លក្ខខណ្ឌប្រើប្រាស់",
      subtitle: "សូមអានលក្ខខណ្ឌទាំងនេះដោយប្រុងប្រយ័ត្នមុនពេលប្រើប្រាស់សេវាកម្មរបស់យើង។",
      acceptance: "១. ការទទួលយកលក្ខខណ្ឌ",
      acceptanceDesc: "ដោយការចូលប្រើ និងប្រើប្រាស់គេហទំព័រនេះ អ្នកទទួលយក និងយល់ព្រមគោរពតាមលក្ខខណ្ឌ និងបទប្បញ្ញត្តិនៃកិច្ចព្រមព្រៀងនេះ។",
      licensing: "២. អាជ្ញាប័ណ្ណផលិតផល និងការប្រើប្រាស់",
      licensingDesc: "SecureKey លក់កូដអាជ្ញាប័ណ្ណឌីជីថលស្របច្បាប់។ ដោយការទិញកូដ អ្នកត្រូវបានផ្តល់អាជ្ញាប័ណ្ណឱ្យប្រើប្រាស់កម្មវិធីស្របតាមកិច្ចព្រមព្រៀងអាជ្ញាប័ណ្ណអ្នកប្រើប្រាស់ចុងក្រោយ (EULA) របស់ក្រុមហ៊ុនផលិត។",
      liability: "៣. ការកំណត់ការទទួលខុសត្រូវ",
      liabilityDesc: "មិនថាស្ថិតក្នុងព្រឹត្តិការណ៍ណាក៏ដោយ SecureKey នឹងមិនទទួលខុសត្រូវចំពោះការខូចខាតណាមួយដែលកើតឡើងដោយសារការប្រើប្រាស់ ឬអសមត្ថភាពក្នុងការប្រើប្រាស់សម្ភារៈនៅលើគេហទំព័ររបស់ SecureKey ឡើយ។",
      account: "៤. ការទទួលខុសត្រូវគណនី",
      accountDesc: "អ្នកទទួលខុសត្រូវក្នុងការរក្សាការសម្ងាត់នៃគណនី និងពាក្យសម្ងាត់របស់អ្នក។",
      pricing: "៥. តម្លៃ និងភាពអាចរកបាន",
      pricingDesc: "តម្លៃ និងភាពអាចរកបាននៃផលិតផលគឺអាចផ្លាស់ប្តូរដោយគ្មានការជូនដំណឹងជាមុន។"
    },
    privacy: {
      title: "គោលការណ៍ឯកជនភាព",
      lastUpdated: "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ ថ្ងៃទី ០៨ ខែ ធ្នូ ឆ្នាំ ២០២៥",
      collect: "១. ព័ត៌មានដែលយើងប្រមូល",
      collectDesc: "យើងប្រមូលព័ត៌មានដែលអ្នកផ្តល់ឱ្យយើងដោយផ្ទាល់នៅពេលអ្នកបង្កើតគណនី ធ្វើការទិញ ឬទំនាក់ទំនងជាមួយយើង។",
      use: "២. របៀបដែលយើងប្រើព័ត៌មានរបស់អ្នក",
      useDesc: "យើងប្រើព័ត៌មានដែលយើងប្រមូលដើម្បីដំណើរការប្រតិបត្តិការរបស់អ្នក ផ្តល់កូដអាជ្ញាប័ណ្ណឌីជីថល និងផ្ញើការបញ្ជាក់ប្រតិបត្តិការ។",
      security: "៣. ការការពារទិន្នន័យ និងសុវត្ថិភាព",
      securityDesc: "យើងអនុវត្តវិធានការសុវត្ថិភាពជាច្រើនដើម្បីរក្សាសុវត្ថិភាពនៃព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក។ ព័ត៌មានរសើប/ឥណទានទាំងអស់ត្រូវបានអ៊ិនគ្រីបតាមរយៈបច្ចេកវិទ្យា SSL ។",
      cookies: "៤. ឃុកគី និងការតាមដាន",
      cookiesDesc: "យើងប្រើឃុកគីដើម្បីជួយយើងចងចាំ និងដំណើរការធាតុនៅក្នុងកន្ត្រកទំនិញរបស់អ្នក និងស្វែងយល់ និងរក្សាទុកចំណូលចិត្តរបស់អ្នកសម្រាប់ការចូលមើលនាពេលអនាគត។",
      contact: "ប្រសិនបើអ្នកមានសំណួរអំពីគោលការណ៍ឯកជនភាពនេះ សូមទាក់ទងមកយើងនៅ"
    },
    profile: {
      fullName: "ឈ្មោះ​ពេញ",
      phone: "លេខ​ទូរស័ព្ទ",
      address: "អាសយដ្ឋាន",
      save: "រក្សាទុកការផ្លាស់ប្តូរ",
      saving: "កំពុងរក្សាទុក...",
      verified: "សមាជិកដែលបានផ្ទៀងផ្ទាត់"
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'En';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        console.warn(`Missing translation for key: ${path} in language: ${language}`);
        return path; 
      }
      current = current[key];
    }
    return current;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'En' ? 'Kh' : 'En');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
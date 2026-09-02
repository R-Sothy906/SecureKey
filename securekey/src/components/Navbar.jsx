import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ShoppingCart, Globe, LogIn, UserPlus, LogOut, Settings } from 'lucide-react'; 
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const { user, profile, signOut } = useAuth();

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  const handleSignOut = async (e) => {
    // Prevent event bubbling if needed, though item selection usually handles this
    e?.preventDefault();
    await signOut();
    navigate('/');
  };

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.products'), href: '/products' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' }
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1d21] border-b-4 border-[#0ea5e9] shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left Side: Logo */}
          <Link 
            to="/"
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0" 
            aria-label="Home"
          >
            {/* Logo Icon */}
            <div className="text-[#ff3b30] group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2.5} />
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col justify-center select-none">
              <div className="flex items-center gap-1 font-bold text-lg sm:text-xl tracking-wider">
                <span className="text-[#ff3b30]">SECURE</span>
                <span className="text-[#ff3b30]">|</span>
                <span className="text-[#ff3b30]">KEY</span>
              </div>
              <span className="text-[8px] sm:text-[10px] text-[#ff3b30]/80 tracking-[0.2em] uppercase leading-none mt-0.5">
                Software Licenses
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
               <Link 
                    key={item.href}
                    to={item.href}
                    className="text-white hover:text-[#0ea5e9] text-sm font-medium transition-colors"
                >
                    {item.label}
                </Link>
            ))}
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Shopping Cart */}
            <Link 
              to="/cart"
              className="text-white hover:text-[#0ea5e9] transition-colors p-2 relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a1d21] group-hover:scale-110 transition-transform">
                      {totalItems}
                  </span>
              )}
            </Link>
            
            {/* Language Switcher (Desktop) */}
            <button
              onClick={handleLanguageToggle}
              className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white text-[#1a1d21] hover:bg-[#0ea5e9] hover:text-white transition-all font-bold text-xs shadow-md"
              title={`Switch to ${language === 'En' ? 'Khmer' : 'English'}`}
            >
              {language}
            </button>

            {/* Auth Buttons / User Menu (Desktop) */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full focus:ring-0">
                      <Avatar className="h-9 w-9 border-2 border-slate-600 hover:border-[#0ea5e9] transition-colors">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={profile?.full_name || "User"} />
                        <AvatarFallback className="bg-slate-700 text-white font-bold">
                          {getInitials(profile?.full_name || user.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-64 p-2 bg-white text-slate-900 shadow-xl rounded-xl border border-slate-200 mt-2" 
                    align="end"
                  >
                    <DropdownMenuLabel className="font-normal px-4 py-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-base font-bold text-slate-900 leading-none">
                          {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-slate-500 font-medium truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator className="bg-slate-100 my-1" />
                    
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer flex items-center justify-center bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 focus:bg-red-600 focus:text-white transition-colors duration-200 group"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="font-semibold">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-white hover:text-[#0ea5e9] hover:bg-white/10">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Hamburger Menu Box */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-12 border border-white/30 rounded text-white hover:bg-white/10 hover:border-white/50 transition-all ml-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#1a1d21] border-b border-white/10 shadow-2xl overflow-hidden md:hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="block w-full text-left text-lg font-medium text-white/90 hover:text-[#0ea5e9] hover:bg-white/5 transition-all py-3 px-4 rounded-lg mb-2"
                    >
                    {item.label}
                    </motion.div>
                </Link>
              ))}
              
              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Mobile Auth */}
              <div className="px-4 space-y-3">
                {user ? (
                  <>
                     <div className="flex items-center gap-3 py-2">
                        <Avatar className="h-10 w-10 border border-slate-600">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-slate-700 text-white">
                            {getInitials(profile?.full_name || user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium text-sm">{profile?.full_name}</p>
                          <p className="text-white/60 text-xs">{user.email}</p>
                        </div>
                     </div>
                     <Button 
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        variant="destructive" 
                        className="w-full justify-start bg-red-500 hover:bg-red-600 text-white"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Log out
                      </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      variant="outline" 
                      className="w-full border-slate-600 text-white hover:bg-slate-800 hover:text-white"
                    >
                      <LogIn className="mr-2 h-4 w-4" /> Log in
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-[#0ea5e9] hover:bg-[#0284c7]"
                    >
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile Language Option */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between px-4"
              >
                  <span className="text-white/60 text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" /> {t('nav.language')}
                  </span>
                  <button 
                    onClick={handleLanguageToggle}
                    className="flex items-center gap-2 text-white bg-white/10 hover:bg-[#0ea5e9] px-3 py-1 rounded-full transition-colors"
                  >
                    <span className="text-sm font-bold">{language === 'En' ? 'English' : 'Khmer'}</span>
                    <div className="h-5 w-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                      {language}
                    </div>
                  </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch detailed profile data
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      // Don't block auth if profile fetch fails, but maybe log it
    }
  };

  // Handle session updates
  const handleSession = useCallback(async (session) => {
    try {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Session handling error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (mounted) handleSession(session);
      } catch (error) {
        console.error("Get session error:", error);
        if (mounted) setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) handleSession(session);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleSession]);

  // Enhanced SignUp
  const signUp = useCallback(async (email, password, fullName) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            username: fullName.split(' ')[0].toLowerCase() + Math.floor(Math.random() * 1000)
          }
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      if (error.status === 429 || error.message?.toLowerCase().includes("rate limit")) {
        error.isRateLimited = true;
        error.message = "Too many signup attempts. Please wait a moment before trying again.";
      }
      return { data: null, error };
    }
  }, []);

  // Enhanced SignIn with Email
  const signInWithEmail = useCallback(async (email, password) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const msg = error.message?.toLowerCase() || "";
      if (msg.includes("email not confirmed")) {
        error.isUnconfirmed = true;
      }
      if (error.status === 429 || msg.includes("rate limit")) {
        error.isRateLimited = true;
      }
      return { data: null, error };
    }
  }, []);

  // SignIn with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Google sign in error:", error);
      return { data: null, error };
    }
  }, []);

  // SignOut
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setProfile(null);
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
      return { error };
    }
  }, [toast]);

  const resetPasswordForEmail = useCallback(async (email) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      const redirectTo = `${window.location.origin}/update-password`; 
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo,
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }, []);

  const checkEmailExists = useCallback(async (email) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      const { data, error } = await supabase.rpc('check_email_exists', { email_arg: cleanEmail });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Check email error:", error);
      return false; 
    }
  }, []);

  const resendConfirmationEmail = useCallback(async (email) => {
    try {
      const cleanEmail = email.toLowerCase().trim();
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: cleanEmail,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      if (error.status === 429 || error.message?.toLowerCase().includes("rate limit")) {
           error.isRateLimited = true;
           error.message = "Please wait before requesting another email.";
      }
      return { data: null, error };
    }
  }, []);

  const value = useMemo(() => ({
    user,
    profile,
    session,
    loading,
    signUp,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    resetPasswordForEmail,
    checkEmailExists,
    resendConfirmationEmail
  }), [user, profile, session, loading, signUp, signInWithEmail, signInWithGoogle, signOut, resetPasswordForEmail, checkEmailExists, resendConfirmationEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
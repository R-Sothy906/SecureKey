import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bell, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const MessageBox = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const scrollRef = useRef(null);

    // Fetch initial messages
    const fetchMessages = async () => {
        if (!user) return;
        
        try {
            const { data, error } = await supabase
                .from('support_messages')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: true });

            if (error) throw error;

            setMessages(data || []);
            // Count unread messages from admin
            const unread = data?.filter(m => m.sender === 'admin' && !m.is_read).length || 0;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast({
                variant: "destructive",
                title: "Connection Error",
                description: "Could not load messages. Please check your internet connection."
            });
        }
    };

    // Mark messages as read when opening the box
    const markAsRead = async () => {
        if (!user || unreadCount === 0) return;

        try {
            const { error } = await supabase
                .from('support_messages')
                .update({ is_read: true })
                .eq('user_id', user.id)
                .eq('sender', 'admin')
                .eq('is_read', false);

            if (error) throw error;

            setUnreadCount(0);
            // Update local state to reflect read status
            setMessages(prev => prev.map(m => 
                m.sender === 'admin' ? { ...m, is_read: true } : m
            ));
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    // Handle sending a message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        const messageText = newMessage.trim();
        setNewMessage(''); // Clear immediately for better UX
        setIsLoading(true);

        try {
            const { data, error } = await supabase
                .from('support_messages')
                .insert([{
                    user_id: user.id,
                    sender: 'user',
                    message_text: messageText,
                    is_read: false
                }])
                .select()
                .single();

            if (error) throw error;
            
        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send message. Please try again."
            });
            setNewMessage(messageText); // Restore text on error
        } finally {
            setIsLoading(false);
        }
    };

    // Set up Realtime subscription
    useEffect(() => {
        if (!user) return;

        fetchMessages();

        let channel;
        try {
            channel = supabase
                .channel('public:support_messages')
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'support_messages',
                        filter: `user_id=eq.${user.id}`
                    },
                    (payload) => {
                        const newMessage = payload.new;
                        setMessages(prev => [...prev, newMessage]);
                        
                        // If it's an admin message and popover is closed, increment badge
                        if (newMessage.sender === 'admin' && !isOpen) {
                            setUnreadCount(prev => prev + 1);
                            toast({
                                title: "New Message from Support",
                                description: newMessage.message_text.substring(0, 50) + (newMessage.message_text.length > 50 ? '...' : ''),
                                duration: 4000
                            });
                        }
                        
                        // Scroll to bottom
                        if (scrollRef.current) {
                            setTimeout(() => {
                                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                            }, 100);
                        }
                    }
                )
                .subscribe((status) => {
                    if (status === 'SUBSCRIBED') {
                        // console.log('Subscribed to support messages');
                    } else if (status === 'CHANNEL_ERROR') {
                        console.error('Failed to subscribe to support messages');
                    }
                });
        } catch (err) {
            console.error("Realtime subscription error:", err);
        }

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, [user]);

    // Scroll to bottom when messages change or box opens
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            markAsRead();
        }
    }, [messages, isOpen]);

    if (!user) return null;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <div className="relative cursor-pointer group p-2">
                    <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:text-[#0ea5e9] transition-colors" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0 -right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-[#1a1d21] animate-pulse">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[350px] sm:w-[400px] p-0 border-slate-700 bg-[#1a1d21] shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#0ea5e9]/20 p-2 rounded-full">
                            <Bell className="h-4 w-4 text-[#0ea5e9]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm">Support Chat</h4>
                            <p className="text-xs text-slate-400">Ask us anything!</p>
                        </div>
                    </div>
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 px-2 text-[10px]">
                            {unreadCount} New
                        </Badge>
                    )}
                </div>

                {/* Messages Area */}
                <div 
                    ref={scrollRef}
                    className="h-[350px] overflow-y-auto p-4 space-y-4 bg-[#1a1d21] scroll-smooth"
                >
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                            <MessageSquare className="h-10 w-10 opacity-20" />
                            <p className="text-sm">No messages yet.</p>
                            <p className="text-xs">Start a conversation with our team!</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                        msg.sender === 'user'
                                            ? 'bg-[#0ea5e9] text-white rounded-tr-none'
                                            : 'bg-slate-700 text-slate-200 rounded-tl-none'
                                    }`}
                                >
                                    <p>{msg.message_text}</p>
                                    <p className={`text-[10px] mt-1 ${
                                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                                    }`}>
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-800 border-t border-slate-700">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#0ea5e9]"
                        />
                        <Button 
                            type="submit" 
                            size="icon"
                            disabled={isLoading || !newMessage.trim()}
                            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white shrink-0"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MessageBox;
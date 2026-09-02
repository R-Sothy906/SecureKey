
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Copy, XCircle, QrCode, Bug, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useABAPayment } from '@/hooks/useABAPayment';
import { getBackendUrl } from '@/hooks/useBackendUrl';

const QRCodeDisplay = ({ qrImageDataUrl }) => {
    if (!qrImageDataUrl) return null;

    return (
        <div className="flex flex-col items-center justify-center p-4 border-4 border-[#005ea6] rounded-xl relative z-10 bg-white shadow-sm min-w-[280px] min-h-[280px]">
            <img 
                src={qrImageDataUrl} 
                alt="Generated QR Code" 
                className="w-[280px] h-[280px] object-contain"
            />
            <div className="absolute -bottom-4 bg-[#005ea6] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg border-2 border-white z-20">
                ABA PAY
            </div>
        </div>
    );
};

const ABAPaymentPage = () => {
    const { toast } = useToast();
    const { 
        amount, setAmount,
        currency, setCurrency,
        lifetime, setLifetime,
        qrImageTemplate, setQrImageTemplate,
        qrImage, qrString, loading, error, debugInfo,
        generateQR, resetPayment
    } = useABAPayment();
    const [showDebug, setShowDebug] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied!', description: 'KHQR string copied to clipboard.' });
    };

    const formatAmount = (amt, curr) => {
        const num = parseFloat(amt) || 0;
        return curr === 'USD' ? `$${num.toFixed(2)}` : `${num.toLocaleString()} KHR`;
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative z-0">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Generate ABA KHQR</h1>
                    <p className="text-slate-500 text-lg">Create payment codes for seamless transactions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Input Section */}
                    <Card className="shadow-lg border-0 bg-white z-10">
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                            <CardDescription>Enter the transaction parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount *</Label>
                                <div className="flex gap-2">
                                    <Input 
                                        id="amount" 
                                        type="number" 
                                        step="0.01" 
                                        value={amount} 
                                        onChange={(e) => setAmount(e.target.value)} 
                                        disabled={loading || qrImage}
                                        className="text-slate-900 bg-white"
                                        min="0.01"
                                    />
                                    <select 
                                        className="flex h-10 w-28 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        disabled={loading || qrImage}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="KHR">KHR</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lifetime">Lifetime (Mins)</Label>
                                    <Input 
                                        id="lifetime" 
                                        type="number"
                                        value={lifetime} 
                                        onChange={(e) => setLifetime(e.target.value)} 
                                        disabled={loading || qrImage}
                                        className="text-slate-900 bg-white"
                                        min="3"
                                        max="43200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="qrImageTemplate">QR Template</Label>
                                    <select 
                                        id="qrImageTemplate"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={qrImageTemplate}
                                        onChange={(e) => setQrImageTemplate(e.target.value)}
                                        disabled={loading || qrImage}
                                    >
                                        <option value="template3_color">Color (Default)</option>
                                        <option value="template3_bw">Black & White</option>
                                    </select>
                                </div>
                            </div>

                            {!qrImage && (
                                <Button 
                                    onClick={generateQR} 
                                    disabled={loading} 
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-xl transition-all shadow-md hover:shadow-lg mt-4"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <QrCode className="w-5 h-5 mr-2" />}
                                    Generate QR Code
                                </Button>
                            )}

                            {error && !qrImage && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm flex flex-col gap-3 mt-4">
                                    <div className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                                        <div>
                                            <p className="font-bold text-red-800">Failed to Connect</p>
                                            <p className="mt-1">{error}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white/50 p-2 rounded border border-red-100">
                                        <p className="text-[11px] font-medium text-red-900 flex items-center gap-1 mb-1">
                                            <Info className="w-3 h-3" /> Target Backend URL:
                                        </p>
                                        <p className="text-[11px] font-mono break-all">{getBackendUrl()}</p>
                                    </div>

                                    {debugInfo && (
                                        <div className="mt-2 border-t border-red-200 pt-2">
                                            <button 
                                                onClick={() => setShowDebug(!showDebug)} 
                                                className="text-xs font-bold flex items-center gap-1 hover:text-red-900 uppercase"
                                            >
                                                <Bug className="w-3 h-3"/> Toggle Debug Payload
                                            </button>
                                            {showDebug && (
                                                <div className="mt-2 text-left text-[10px] text-slate-700 font-mono overflow-y-auto max-h-[150px] break-all bg-white p-2 rounded shadow-inner border border-slate-200">
                                                    <strong className="block text-slate-900">Request:</strong>
                                                    <pre className="mb-2 whitespace-pre-wrap">{JSON.stringify(debugInfo.sanitized_request, null, 2)}</pre>
                                                    <strong className="block text-slate-900 border-t border-slate-200 pt-2">Response:</strong>
                                                    <pre className="whitespace-pre-wrap">{JSON.stringify(debugInfo.gateway_raw, null, 2)}</pre>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {qrImage && (
                                <Button onClick={resetPayment} variant="outline" className="w-full text-slate-600 border-slate-300 bg-white hover:bg-slate-50 mt-4">
                                    Create New Payment
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* QR Display Section */}
                    <Card className="shadow-lg border-0 bg-white flex flex-col items-center justify-center p-6 relative min-h-[450px] z-10">
                        <AnimatePresence mode="wait">
                            {!qrImage && !loading ? (
                                <motion.div 
                                    key="empty"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex flex-col items-center text-slate-400 space-y-4"
                                >
                                    <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
                                        <QrCode className="w-12 h-12 text-slate-300" />
                                    </div>
                                    <p className="font-medium text-slate-500">Fill details to generate QR</p>
                                </motion.div>
                            ) : loading ? (
                                <motion.div 
                                    key="loading"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex flex-col items-center text-blue-500 space-y-4"
                                >
                                    <Loader2 className="w-12 h-12 animate-spin" />
                                    <p className="text-slate-600 font-medium">Connecting to Backend API...</p>
                                    <p className="text-xs text-slate-400 font-mono">{getBackendUrl()}</p>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="result"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className="w-full space-y-6 flex flex-col items-center"
                                >
                                    <div className="text-center w-full bg-blue-50 py-3 rounded-lg border border-blue-100">
                                        <span className="block text-sm font-medium text-slate-500 mb-1">Amount to pay</span>
                                        <span className="text-3xl font-bold text-blue-700">{formatAmount(amount, currency)}</span>
                                    </div>

                                    <QRCodeDisplay qrImageDataUrl={qrImage} />

                                    <div className="w-full space-y-3 text-center px-4 mt-2">
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-left">
                                            <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider text-center">KHQR String</p>
                                            <p className="text-xs text-slate-600 font-mono break-all line-clamp-2 text-center">
                                                {qrString || "No QR String Provided"}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant="secondary" size="sm" onClick={() => handleCopy(qrString)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700">
                                                <Copy className="w-4 h-4 mr-2" /> Copy KHQR
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ABAPaymentPage;

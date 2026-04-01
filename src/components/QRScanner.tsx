'use client';

import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QRScanner({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleScan = (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const code = detectedCodes[0].rawValue;
            if (code) {
                const assetPrefixes = ['LAP', 'DSK', 'PRT', 'SCN', 'MON', 'UPS', 'HHD', 'INT'];
                try {
                    // Check if it's a URL
                    if (code.startsWith('http')) {
                        const url = new URL(code);
                        if (url.pathname.includes('/asset/') || url.pathname.includes('/truck/')) {
                            router.push(url.pathname);
                            onClose();
                        } else {
                            setError('Scanned code is not a valid QR code');
                        }
                    } else {
                        // Direct ID — route based on prefix
                        const isAsset = assetPrefixes.some(prefix => code.toUpperCase().startsWith(prefix));
                        router.push(isAsset ? `/asset/${code}` : `/truck/${code}`);
                        onClose();
                    }
                } catch (err) {
                    console.error(err);
                    setError('Invalid QR code format');
                }
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 p-1"
                    aria-label="Close scanner"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="mb-4 text-center">
                    <h2 className="text-xl font-bold text-gray-900">Scan QR Code</h2>
                    <p className="text-sm text-gray-500">Point your camera at a truck QR code</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="overflow-hidden rounded-lg aspect-square bg-black relative">
                    <Scanner
                        onScan={handleScan}
                        onError={(error: unknown) => {
                            console.log(error);
                            if (error instanceof Error) {
                                setError(error.message);
                            } else {
                                setError('Camera error');
                            }
                        }}
                        styles={{ container: { width: '100%', height: '100%' } }}
                    />
                </div>
            </div>
        </div>
    );
}

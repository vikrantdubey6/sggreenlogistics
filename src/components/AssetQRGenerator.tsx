'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

interface AssetQRGeneratorProps {
    assetId: string;
}

export default function AssetQRGenerator({ assetId }: AssetQRGeneratorProps) {
    const qrRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const [qrValue, setQrValue] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setQrValue(`${window.location.origin}/asset/${assetId}`);
        }
    }, [assetId]);

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = `asset-${assetId}-qr.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const downloadAssetTag = async () => {
        if (tagRef.current) {
            try {
                const canvas = await html2canvas(tagRef.current, {
                    scale: 3,
                    backgroundColor: '#ffffff',
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                });
                const url = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = url;
                link.download = `asset-${assetId}-tag.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err: any) {
                console.error('Error generating asset tag:', err);
                alert(`Failed to generate asset tag: ${err?.message || 'Unknown error'}`);
            }
        }
    };

    if (!qrValue) return null;

    return (
        <div className="flex flex-col items-center gap-6 mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900">Asset QR Code & Tag</h3>

            {/* Visible QR */}
            <div ref={qrRef} className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <QRCodeCanvas
                    value={qrValue}
                    size={180}
                    level={"H"}
                    includeMargin={true}
                    imageSettings={{
                        src: '/favicon.ico',
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                    }}
                />
            </div>

            <div className="flex gap-4">
                <button
                    onClick={downloadQR}
                    className="text-sm bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download QR
                </button>
                <button
                    onClick={downloadAssetTag}
                    className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
                    </svg>
                    Download ID Card
                </button>
            </div>

            <p className="text-xs text-gray-400 text-center max-w-[200px]">
                Scan to view this asset&apos;s details instantly
            </p>

            {/* ─── Hidden Asset ID Card ─── All inline styles, zero Tailwind to avoid html2canvas lab() bug */}
            <div style={{ position: "fixed", left: "-9999px", top: 0 }}>
                <div
                    ref={tagRef}
                    style={{
                        width: "400px",
                        padding: "32px 32px 28px 32px",
                        backgroundColor: "#ffffff",
                        boxSizing: "border-box",
                        fontFamily: "Arial Black, Arial, Helvetica, sans-serif",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    {/* QR code with logo in the middle */}
                    <div style={{ background: "#fff", padding: "6px" }}>
                        <QRCodeCanvas
                            value={qrValue}
                            size={280}
                            level="H"
                            includeMargin={false}
                            fgColor="#000000"
                            bgColor="#ffffff"
                            imageSettings={{
                                src: "/favicon.ico",
                                x: undefined,
                                y: undefined,
                                height: 36,
                                width: 36,
                                excavate: true,
                            }}
                        />
                    </div>

                    {/* Asset ID below */}
                    <div
                        style={{
                            fontSize: "36px",
                            fontWeight: "900",
                            letterSpacing: "5px",
                            color: "#000",
                            textAlign: "center",
                        }}
                    >
                        {assetId}
                    </div>
                </div>
            </div>
        </div>
    );
}

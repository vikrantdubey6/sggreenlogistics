'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

interface QRGeneratorProps {
    truckId: string;
}

export default function QRGenerator({ truckId }: QRGeneratorProps) {
    const qrRef = useRef<HTMLDivElement>(null);
    const idCardRef = useRef<HTMLDivElement>(null);
    const [qrValue, setQrValue] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const origin = window.location.origin;
            setQrValue(`${origin}/truck/${truckId}`);
        }
    }, [truckId]);

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = `truck-${truckId}-qr.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const downloadIDCard = async () => {
        if (idCardRef.current) {
            try {
                const canvas = await html2canvas(idCardRef.current, {
                    scale: 2,
                    backgroundColor: '#d8dde3',
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                });
                const url = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = url;
                link.download = `truck-${truckId}-id-card.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err: any) {
                console.error('Error generating ID card:', err);
                alert(`Failed to generate ID card: ${err?.message || 'Unknown error'}`);
            }
        }
    };

    if (!qrValue) return null;

    return (
        <div className="flex flex-col items-center gap-6 mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900">Truck QR Code &amp; ID</h3>

            {/* Visible QR for scanning */}
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
                    onClick={downloadIDCard}
                    className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="12" cy="10" r="3" />
                        <path d="M7 15h10" />
                    </svg>
                    Download ID Card
                </button>
            </div>

            <p className="text-xs text-gray-400 text-center max-w-[200px]">
                Scan to view this truck&apos;s details instantly
            </p>

            {/* ─── Hidden ID Card ─── */}
            <div style={{ position: "fixed", left: "-9999px", top: 0 }}>
                <div
                    ref={idCardRef}
                    style={{
                        width: "720px",
                        height: "380px",
                        padding: "18px",
                        backgroundColor: "#ffffff",
                        backgroundImage: `
  radial-gradient(240px 240px at top left,
    rgba(0,153,153,0.35) 0%,
    rgba(0,153,153,0.20) 40%,
    rgba(0,153,153,0.08) 65%,
    rgba(0,153,153,0.00) 80%
  ),
  radial-gradient(240px 240px at bottom right,
    rgba(0,153,153,0.35) 0%,
    rgba(0,153,153,0.20) 40%,
    rgba(0,153,153,0.08) 65%,
    rgba(0,153,153,0.00) 80%
  )
`,
                        backgroundRepeat: "no-repeat",
                        boxSizing: "border-box",
                        fontFamily: "Arial Black, Arial, Helvetica, sans-serif",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "3px solid #000",
                            borderRadius: "10px",
                            display: "flex",
                            padding: "26px",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* LEFT SECTION */}
                        <div
                            style={{
                                width: "44%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px",
                            }}
                        >
                            <div style={{ background: "#fff", padding: "6px" }}>
                                <QRCodeCanvas
                                    value={qrValue}
                                    size={200}
                                    level="H"
                                    includeMargin={false}
                                    fgColor="#000000"
                                    bgColor="#ffffff"
                                />
                            </div>

                            <div
                                style={{
                                    fontSize: "44px",
                                    fontWeight: "900",
                                    letterSpacing: "5px",
                                    color: "#000",
                                }}
                            >
                                {truckId}
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingLeft: "28px",
                                textAlign: "center",
                                color: "#000",
                            }}
                        >
                            {/* PROPERTY OF */}
                            <div
                                style={{
                                    fontSize: "30px",
                                    fontWeight: "900",
                                    letterSpacing: "2px",
                                }}
                            >
                                PROPERTY OF
                            </div>

                            {/* LOGO BOX */}
                            <div
                                style={{
                                    width: "100%",
                                    border: "2px solid #000",
                                    padding: "10px 18px",
                                    background: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: "90px",
                                }}
                            >
                                <img
                                    src="/logo.jpeg"
                                    alt="SG Green Logistics"
                                    style={{
                                        height: "68px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>

                            {/* ASSISTANCE TEXT */}
                            <div style={{ lineHeight: "1.4" }}>
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "900",
                                        letterSpacing: "0.8px",
                                    }}
                                >
                                    FOR FURTHER ASSISTANCE
                                </div>

                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "900",
                                        letterSpacing: "0.8px",
                                    }}
                                >
                                    PLEASE CALL
                                </div>

                                <div
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "900",
                                        marginTop: "6px",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    +91 92203 39980
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

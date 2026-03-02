'use client'
import React, { useState } from 'react'

export default function Trial() {

    const [isOpen, setIsOpen] = useState(false)
    const [hover, setHover] = useState(false)
    const [closeHover, setCloseHover] = useState(false)

    const openViz = () => setIsOpen(true)
    const closeViz = () => setIsOpen(false)

    return (
        <>
            {/* Floating Button + Label */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 9999,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont'
                }}
            >

                {/* Label */}
                <div
                    style={{
                        background: '#fff',
                        color: '#000',
                        padding: '10px 14px',
                        borderRadius: '999px',
                        fontSize: '14px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease'
                    }}
                >
                    Try our products in your space
                </div>

                {/* Open Button */}
                <div
                    onClick={openViz}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: '#fff',
                        transform: hover ? 'scale(1.08)' : 'scale(1)',
                        boxShadow: hover
                            ? '0 14px 30px rgba(0,0,0,0.4)'
                            : '0 10px 25px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <svg width="26" height="26" viewBox="0 0 24 24">
                        <line
                            x1="3"
                            y1="12"
                            x2="21"
                            y2="12"
                            stroke="rgb(44,169,188)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path d="M3 7V4A1 1 0 0 1 4 3H7" stroke="black" strokeWidth="2" />
                        <path d="M21 7V4A1 1 0 0 0 20 3H17" stroke="black" strokeWidth="2" />
                        <path d="M3 17v3a1 1 0 0 0 1 1H7" stroke="black" strokeWidth="2" />
                        <path d="M21 17v3a1 1 0 0 1-1 1H17" stroke="black" strokeWidth="2" />
                    </svg>
                </div>
            </div>


            {/* Overlay */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(6px)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease'
                }}
            >

                {/* Modal */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#000',
                        position: 'relative',
                        transform: isOpen ? 'scale(1)' : 'scale(0.92)',
                        transition: 'transform 0.35s ease'
                    }}
                >

                    {/* Close Button */}
                    <div
                        onClick={closeViz}
                        onMouseEnter={() => setCloseHover(true)}
                        onMouseLeave={() => setCloseHover(false)}
                        style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: closeHover
                                ? 'rgba(0,0,0,0.85)'
                                : 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transform: closeHover ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.2s ease',
                            zIndex: 2
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </div>


                    {/* Viz2D iframe */}
                    <iframe
                        src="https://viz2d.com/visualizer/cmkjuyobw0007pn01nl6ksibp"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none'
                        }}
                        allowFullScreen
                    />

                </div>
            </div>

        </>
    )
}

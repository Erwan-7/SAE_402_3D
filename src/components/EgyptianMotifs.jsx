import React from 'react';

const Motif = React.memo(({ path, ...props }) => (
    <svg viewBox="0 0 24 24" {...props}>
        {path}
    </svg>
));

export const HeaderMotifs = React.memo(() => {
    const style = { position: "absolute", color: "var(--color-gold)", opacity: 0.25, pointerEvents: "none", transformOrigin: "center" };
    return (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, transform: "translateZ(0)" }}>
            {/* Center-Left */}
            <Motif style={{ ...style, top: "25%", left: "25%", width: '4vw', minWidth: 20, height: '4vw', minHeight: 20, transform: "rotate(10deg)" }} fill="currentColor" path={<path d="M12 2C10.34 2 9 3.34 9 5c0 1.8 2 3.5 3 4.5 1-1 3-2.7 3-4.5 0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1 0 .6-.8 1.5-1 1.7-.2-.2-1-1.1-1-1.7 0-.55.45-1 1-1zM11 10v4H8v2h3v6h2v-6h3v-2h-3v-4h-2z" />} />
            {/* Center */}
            <Motif style={{ ...style, top: "40%", left: "45%", width: '5vw', minWidth: 25, height: '5vw', minHeight: 25, transform: "rotate(-15deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 12s4-5 10-5 10 5 10 5-4 5-10 5-10-5-10-5z" /><circle cx="12" cy="12" r="3" /><path d="M12 15v4c0 1-1 2-2 2" /><path d="M14 15l2 4" /></>} />
            {/* Center-Right */}
            <Motif style={{ ...style, top: "20%", right: "35%", width: '6vw', minWidth: 30, height: '6vw', minHeight: 30, transform: "rotate(5deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 14c3-3 6-3 9 0s6 3 9 0M2 10c3-3 6-3 9 0s6 3 9 0" /></>} />
            {/* Far Center-Right */}
            <Motif style={{ ...style, bottom: "15%", right: "20%", width: '5vw', minWidth: 25, height: '5vw', minHeight: 25, transform: "rotate(-10deg)" }} fill="currentColor" path={<path d="M12 3L2 21h20L12 3zm0 3.8L17.5 19h-11L12 6.8z" />} />
        </div>
    );
});

export const FooterMotifs = React.memo(() => {
    const style = { position: "absolute", color: "var(--color-gold)", opacity: 0.25, pointerEvents: "none", transformOrigin: "center" };
    return (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, transform: "translateZ(0)" }}>
            {/* Left */}
            <Motif style={{ ...style, bottom: "10%", left: "10%", width: '5vw', minWidth: 25, height: '5vw', minHeight: 25, transform: "rotate(-15deg)" }} fill="currentColor" path={<path d="M12 3L2 21h20L12 3zm0 3.8L17.5 19h-11L12 6.8z" />} />
            {/* Center-Left */}
            <Motif style={{ ...style, top: "20%", left: "30%", width: '4vw', minWidth: 20, height: '4vw', minHeight: 20, transform: "rotate(10deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 12s4-5 10-5 10 5 10 5-4 5-10 5-10-5-10-5z" /><circle cx="12" cy="12" r="3" /><path d="M12 15v4c0 1-1 2-2 2" /><path d="M14 15l2 4" /></>} />
            {/* Center-Right */}
            <Motif style={{ ...style, bottom: "15%", right: "25%", width: '6vw', minWidth: 30, height: '6vw', minHeight: 30, transform: "rotate(-5deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 14c3-3 6-3 9 0s6 3 9 0M2 10c3-3 6-3 9 0s6 3 9 0" /></>} />
            {/* Right */}
            <Motif style={{ ...style, top: "15%", right: "8%", width: '4.5vw', minWidth: 22, height: '4.5vw', minHeight: 22, transform: "rotate(20deg)" }} fill="currentColor" path={<path d="M12 2C10.34 2 9 3.34 9 5c0 1.8 2 3.5 3 4.5 1-1 3-2.7 3-4.5 0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1 0 .6-.8 1.5-1 1.7-.2-.2-1-1.1-1-1.7 0-.55.45-1 1-1zM11 10v4H8v2h3v6h2v-6h3v-2h-3v-4h-2z" />} />
        </div>
    );
});

export const MapMotifs = React.memo(() => {
    const style = { position: "absolute", color: "var(--color-gold)", opacity: 0.15, pointerEvents: "none", transformOrigin: "center" };

    // Explicit, spacious, well-balanced coordinates preventing overlapping
    return (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, transform: "translateZ(0)" }}>
            {/* --- LEFT SIDE --- */}
            <Motif style={{ ...style, top: "8%", left: "5%", width: '8vw', minWidth: 40, height: '8vw', minHeight: 40, transform: "rotate(-25deg)" }} fill="currentColor" path={<path d="M12 2C10.34 2 9 3.34 9 5c0 1.8 2 3.5 3 4.5 1-1 3-2.7 3-4.5 0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1 0 .6-.8 1.5-1 1.7-.2-.2-1-1.1-1-1.7 0-.55.45-1 1-1zM11 10v4H8v2h3v6h2v-6h3v-2h-3v-4h-2z" />} />
            <Motif style={{ ...style, top: "25%", left: "15%", width: '6vw', minWidth: 30, height: '6vw', minHeight: 30, transform: "rotate(15deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" path={<><circle cx="12" cy="12" r="5" fill="currentColor" /><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" /></>} />
            <Motif style={{ ...style, top: "45%", left: "2%", width: '9vw', minWidth: 45, height: '9vw', minHeight: 45, transform: "rotate(-5deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 12s4-5 10-5 10 5 10 5-4 5-10 5-10-5-10-5z" /><circle cx="12" cy="12" r="3" /><path d="M12 15v4c0 1-1 2-2 2" /><path d="M14 15l2 4" /></>} />
            <Motif style={{ ...style, bottom: "30%", left: "18%", width: '7vw', minWidth: 35, height: '7vw', minHeight: 35, transform: "rotate(20deg)" }} fill="currentColor" path={<path d="M12 3L2 21h20L12 3zm0 3.8L17.5 19h-11L12 6.8z" />} />
            <Motif style={{ ...style, bottom: "10%", left: "6%", width: '8.5vw', minWidth: 42, height: '8.5vw', minHeight: 42, transform: "rotate(-10deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 14c3-3 6-3 9 0s6 3 9 0M2 10c3-3 6-3 9 0s6 3 9 0" /></>} />

            {/* --- RIGHT SIDE --- */}
            <Motif style={{ ...style, top: "10%", right: "6%", width: '7.5vw', minWidth: 38, height: '7.5vw', minHeight: 38, transform: "rotate(15deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 14c3-3 6-3 9 0s6 3 9 0M2 10c3-3 6-3 9 0s6 3 9 0" /></>} />
            <Motif style={{ ...style, top: "28%", right: "16%", width: '6.5vw', minWidth: 32, height: '6.5vw', minHeight: 32, transform: "rotate(-20deg)" }} fill="currentColor" path={<path d="M12 3L2 21h20L12 3zm0 3.8L17.5 19h-11L12 6.8z" />} />
            <Motif style={{ ...style, top: "50%", right: "3%", width: '9.5vw', minWidth: 48, height: '9.5vw', minHeight: 48, transform: "rotate(5deg)" }} fill="currentColor" path={<path d="M12 2C10.34 2 9 3.34 9 5c0 1.8 2 3.5 3 4.5 1-1 3-2.7 3-4.5 0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1 0 .6-.8 1.5-1 1.7-.2-.2-1-1.1-1-1.7 0-.55.45-1 1-1zM11 10v4H8v2h3v6h2v-6h3v-2h-3v-4h-2z" />} />
            <Motif style={{ ...style, bottom: "25%", right: "14%", width: '7vw', minWidth: 35, height: '7vw', minHeight: 35, transform: "rotate(-15deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" path={<><circle cx="12" cy="12" r="5" fill="currentColor" /><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" /></>} />
            <Motif style={{ ...style, bottom: "8%", right: "5%", width: '8vw', minWidth: 40, height: '8vw', minHeight: 40, transform: "rotate(25deg)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" path={<><path d="M2 12s4-5 10-5 10 5 10 5-4 5-10 5-10-5-10-5z" /><circle cx="12" cy="12" r="3" /><path d="M12 15v4c0 1-1 2-2 2" /><path d="M14 15l2 4" /></>} />
        </div>
    );
});

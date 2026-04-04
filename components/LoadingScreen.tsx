"use client";

export default function LoadingScreen() {
    return (
        <div
            role="status"
            className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-base-100/80 backdrop-blur-sm"
        >
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-base-100/95 shadow-2xl shadow-primary/10 border border-base-200">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-inner">
                    <img src="/logo.svg" alt="Ecomart logo" className="h-10 w-10" />
                </div>
            </div>
        </div>
    );
}

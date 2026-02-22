"use client";

import React, { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle, Info, Bell } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
    message: string;
    type?: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast = ({
    message,
    type = "info",
    isVisible,
    onClose,
    duration = 5000,
}: ToastProps) => {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!shouldRender && !isVisible) return null;

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <Bell className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const bgColors = {
        success: "bg-green-50 border-green-100",
        error: "bg-red-50 border-red-100",
        warning: "bg-amber-50 border-amber-100",
        info: "bg-blue-50 border-blue-100",
    };

    return (
        <div
            className={`fixed top-24 right-6 z-[9999] transition-all duration-500 ease-out transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
            onTransitionEnd={() => {
                if (!isVisible) setShouldRender(false);
            }}
        >
            <div
                className={`flex items-center gap-4 px-6 py-4 rounded-none border shadow-2xl backdrop-blur-sm min-w-[320px] max-w-md ${bgColors[type]}`}
            >
                <div className="shrink-0">{icons[type]}</div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900 uppercase tracking-tight italic">
                        {type === "error" ? "System Alert" : "Notification"}
                    </p>
                    <p className="text-xs text-zinc-600 mt-1 font-medium">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="shrink-0 p-1 hover:bg-black/5 transition-colors rounded-none"
                >
                    <X className="w-4 h-4 text-zinc-400" />
                </button>
            </div>
        </div>
    );
};

export default Toast;

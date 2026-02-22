"use client";

import React, { useState } from "react";
import { Flag } from "lucide-react";
import { createReport } from "@/lib/actions";

interface ReportButtonProps {
    targetUserId?: number;
    packageId?: number;
    label?: string;
    className?: string;
}

export default function ReportButton({ targetUserId, packageId, label = "Report", className = "" }: ReportButtonProps) {
    const [isReporting, setIsReporting] = useState(false);

    const handleReport = async () => {
        const reason = prompt("Enter the reason for your report:");
        if (!reason || !reason.trim()) return;

        try {
            setIsReporting(true);
            const result = await createReport({
                reason,
                targetUserId,
                packageId
            });

            if (result.success) {
                alert("Report submitted successfully. Thank you for helping keep our community safe.");
            } else {
                alert(result.error || "Failed to submit report. Please try again later.");
            }
        } catch (err) {
            console.error("Report error:", err);
            alert("An error occurred. Please try again later.");
        } finally {
            setIsReporting(false);
        }
    };

    return (
        <button
            onClick={handleReport}
            disabled={isReporting}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase transition-all shadow-sm active:scale-95 disabled:opacity-50 ${className}`}
        >
            <Flag className={`w-4 h-4 ${isReporting ? 'animate-pulse' : ''}`} />
            {isReporting ? "Reporting..." : label}
        </button>
    );
}

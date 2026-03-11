"use client";

import React, { useState } from "react";
import { Flag } from "lucide-react";
import { createReport } from "@/lib/actions";
import { showAlert, showPrompt } from "@/lib/swal";


interface ReportButtonProps {
    targetUserId?: number;
    packageId?: number;
    label?: string;
    className?: string;
}

export default function ReportButton({ targetUserId, packageId, label = "Report", className = "" }: ReportButtonProps) {
    const [isReporting, setIsReporting] = useState(false);

    const handleReport = async () => {
        const reason = await showPrompt("Report", "Enter the reason for your report:");
        if (!reason || !reason.trim()) return;

        try {
            setIsReporting(true);
            const result = await createReport({
                reason,
                targetUserId,
                packageId
            });

            if (result.success) {
                await showAlert("Success", "Report submitted successfully. Thank you for helping keep our community safe.", "success");
            } else {
                await showAlert("Error", result.error || "Failed to submit report. Please try again later.", "error");
            }
        } catch (err) {
            console.error("Report error:", err);
            await showAlert("Error", "An error occurred. Please try again later.", "error");
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

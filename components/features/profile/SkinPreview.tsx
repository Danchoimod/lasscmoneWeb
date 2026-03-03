'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SkinPreviewProps {
    skinUrl: string;
    model?: 'steve' | 'alex';
    className?: string;
}

const SkinPreview: React.FC<SkinPreviewProps> = ({ skinUrl, model = 'steve', className = "" }) => {
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!skinUrl) return;

        const renderSkin = async () => {
            setLoading(true);
            setError(false);
            try {
                const img = await loadImage(skinUrl);
                const ratio = img.width / 64;
                const isNewFormat = img.height === img.width;
                const armWidth = (model === 'alex' ? 3 : 4) * ratio;

                if (frontCanvasRef.current) {
                    renderSide(frontCanvasRef.current, img, ratio, isNewFormat, armWidth, 'front');
                }
                if (backCanvasRef.current) {
                    renderSide(backCanvasRef.current, img, ratio, isNewFormat, armWidth, 'back');
                }
            } catch (err) {
                console.error("Failed to render skin:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        renderSkin();
    }, [skinUrl, model]);

    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = url;
        });
    };

    const renderSide = (
        canvas: HTMLCanvasElement,
        skinImg: HTMLImageElement,
        ratio: number,
        isNewFormat: boolean,
        armWidth: number,
        side: 'front' | 'back'
    ) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Internal canvas for composition
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 16 * ratio;
        tempCanvas.height = 32 * ratio;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        if (side === 'front') {
            // Face
            tempCtx.drawImage(skinImg, 8 * ratio, 8 * ratio, 8 * ratio, 8 * ratio, 4 * ratio, 0, 8 * ratio, 8 * ratio);
            // Chest
            tempCtx.drawImage(skinImg, 20 * ratio, 20 * ratio, 8 * ratio, 12 * ratio, 4 * ratio, 8 * ratio, 8 * ratio, 12 * ratio);
            // Right Arm
            tempCtx.drawImage(skinImg, 44 * ratio, 20 * ratio, armWidth, 12 * ratio, (4 * ratio) - armWidth, 8 * ratio, armWidth, 12 * ratio);

            // Left Arm
            if (!isNewFormat) {
                drawFlipped(tempCtx, skinImg, 44 * ratio, 20 * ratio, armWidth, 12 * ratio, 12 * ratio, 8 * ratio);
            } else {
                tempCtx.drawImage(skinImg, 36 * ratio, 52 * ratio, armWidth, 12 * ratio, 12 * ratio, 8 * ratio, armWidth, 12 * ratio);
            }

            // Right Leg
            tempCtx.drawImage(skinImg, 4 * ratio, 20 * ratio, 4 * ratio, 12 * ratio, 4 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);

            // Left Leg
            if (!isNewFormat) {
                drawFlipped(tempCtx, skinImg, 4 * ratio, 20 * ratio, 4 * ratio, 12 * ratio, 8 * ratio, 20 * ratio);
            } else {
                tempCtx.drawImage(skinImg, 20 * ratio, 52 * ratio, 4 * ratio, 12 * ratio, 8 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);
            }

            // Overlays
            tempCtx.drawImage(skinImg, 40 * ratio, 8 * ratio, 8 * ratio, 8 * ratio, 4 * ratio, 0, 8 * ratio, 8 * ratio);
            if (isNewFormat) {
                tempCtx.drawImage(skinImg, 16 * ratio, 32 * ratio, 8 * ratio, 12 * ratio, 4 * ratio, 8 * ratio, 8 * ratio, 12 * ratio);
                tempCtx.drawImage(skinImg, 40 * ratio, 32 * ratio, armWidth, 12 * ratio, (4 * ratio) - armWidth, 8 * ratio, armWidth, 12 * ratio);
                tempCtx.drawImage(skinImg, 48 * ratio, 48 * ratio, armWidth, 12 * ratio, 12 * ratio, 8 * ratio, armWidth, 12 * ratio);
                tempCtx.drawImage(skinImg, 0 * ratio, 32 * ratio, 4 * ratio, 12 * ratio, 4 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);
                tempCtx.drawImage(skinImg, 0 * ratio, 48 * ratio, 4 * ratio, 12 * ratio, 8 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);
            }
        } else {
            // Back
            tempCtx.drawImage(skinImg, 24 * ratio, 8 * ratio, 8 * ratio, 8 * ratio, 4 * ratio, 0, 8 * ratio, 8 * ratio);
            tempCtx.drawImage(skinImg, 32 * ratio, 20 * ratio, 8 * ratio, 12 * ratio, 4 * ratio, 8 * ratio, 8 * ratio, 12 * ratio);
            tempCtx.drawImage(skinImg, (48 + (4 - (model === 'alex' ? 3 : 4))) * ratio, 20 * ratio, armWidth, 12 * ratio, 12 * ratio, 8 * ratio, armWidth, 12 * ratio);

            if (!isNewFormat) {
                drawFlipped(tempCtx, skinImg, (48 + (4 - (model === 'alex' ? 3 : 4))) * ratio, 20 * ratio, armWidth, 12 * ratio, (4 * ratio) - armWidth, 8 * ratio);
            } else {
                tempCtx.drawImage(skinImg, (40 + (4 - (model === 'alex' ? 3 : 4))) * ratio, 52 * ratio, armWidth, 12 * ratio, (4 * ratio) - armWidth, 8 * ratio, armWidth, 12 * ratio);
            }

            tempCtx.drawImage(skinImg, 12 * ratio, 20 * ratio, 4 * ratio, 12 * ratio, 8 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);

            if (!isNewFormat) {
                drawFlipped(tempCtx, skinImg, 12 * ratio, 20 * ratio, 4 * ratio, 12 * ratio, 4 * ratio, 20 * ratio);
            } else {
                tempCtx.drawImage(skinImg, 28 * ratio, 52 * ratio, 4 * ratio, 12 * ratio, 4 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);
            }

            // Overlays Back
            tempCtx.drawImage(skinImg, 56 * ratio, 8 * ratio, 8 * ratio, 8 * ratio, 4 * ratio, 0, 8 * ratio, 8 * ratio);
            if (isNewFormat) {
                tempCtx.drawImage(skinImg, (48 + 8) * ratio, (32 + 16) * ratio, armWidth, 12 * ratio, 12 * ratio, 8 * ratio, armWidth, 12 * ratio);
                tempCtx.drawImage(skinImg, (56 + 8) * ratio, (52) * ratio, armWidth, 12 * ratio, (4 * ratio) - armWidth, 8 * ratio, armWidth, 12 * ratio);
                tempCtx.drawImage(skinImg, (8) * ratio, (32 + 16) * ratio, 4 * ratio, 12 * ratio, 8 * ratio, 20 * ratio, 4 * ratio, 12 * ratio);
            }
        }

        // Draw to output canvas with smoothing disabled for pixel art
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
    };

    const drawFlipped = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) => {
        ctx.save();
        ctx.translate(dx + sw / 2, dy + sh / 2);
        ctx.scale(-1, 1);
        ctx.drawImage(img, sx, sy, sw, sh, -sw / 2, -sh / 2, sw, sh);
        ctx.restore();
    };

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <div className="flex gap-8 justify-center p-6 bg-gray-50 border border-gray-100 shadow-inner rounded-sm relative overflow-hidden group">
                <div className="text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 block">Front</span>
                    <canvas
                        ref={frontCanvasRef}
                        width={128}
                        height={256}
                        className={`w-32 h-64 grayscale-0 transition-all duration-500 ${loading ? 'opacity-30 blur-sm' : 'opacity-100'} ${error ? 'hidden' : 'block'}`}
                        style={{ imageRendering: 'pixelated' }}
                    />
                </div>
                <div className="text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 block">Back</span>
                    <canvas
                        ref={backCanvasRef}
                        width={128}
                        height={256}
                        className={`w-32 h-64 grayscale-0 transition-all duration-500 ${loading ? 'opacity-30 blur-sm' : 'opacity-100'} ${error ? 'hidden' : 'block'}`}
                        style={{ imageRendering: 'pixelated' }}
                    />
                </div>

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-4 text-center">
                        <p className="text-xs text-red-500 font-bold uppercase tracking-tight">Failed to load skin.<br />Check URL or CORS.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkinPreview;

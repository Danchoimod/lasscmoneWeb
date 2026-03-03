"use client";

import React from "react";

export default function AndroidInstallGuide() {
    const lastModified = "March 4th, 2026";

    return (
        <div className="bg-[#E9ECEF] font-sans text-[#333]">
            <main className="mx-auto flex w-full max-w-[1100px] flex-grow gap-6 px-4 py-6">
                {/* Main Content Column */}
                <div className="flex-grow rounded-sm border border-[#D1D4D7] bg-white">
                    {/* Header */}
                    <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
                        <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
                            ANDROID INSTALLATION GUIDE (MINECRAFT BEDROCK)
                        </h1>
                    </div>

                    {/* Text Content */}
                    <div className="p-8 text-[15px] leading-[1.7] text-[#444] space-y-8">
                        <p>
                            Welcome to the mobile guide. Adding Add-Ons, Resource Packs, Worlds, or Skins to Minecraft on Android is extremely simple if you follow the steps below.
                        </p>

                        <div className="space-y-6">
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <p><strong>1. Quick Download & Installation (LFLAUNCHER Recommended)</strong><br />
                                    To make the installation process as smooth as possible, we recommend using the <strong>LFLAUNCHER</strong> app to manage <code className="bg-gray-100 px-1 font-mono text-green-700">.mcpack</code>, <code className="bg-gray-100 px-1 font-mono text-green-700">.mcaddon</code>, or <code className="bg-gray-100 px-1 font-mono text-green-700">.mcworld</code> files.</p>

                                <div className="pl-4 space-y-2">
                                    <p><strong>Step 1:</strong> Choose your favorite content and press the <strong>Download</strong> button.</p>
                                    <p><strong>Step 2:</strong> Once the download is complete, tap the download icon (or the downloaded file in your notification bar).</p>
                                    <p><strong>Step 3:</strong> The system will show an <strong>"Open with..."</strong> dialog. Select the <strong>Minecraft</strong> icon.</p>
                                </div>

                                <p>Immediately, the game will automatically launch and perform the import process. You will see an <strong>"Import started..."</strong> notification at the top of the screen. When you receive the <strong>"Successfully imported"</strong> message, you are ready to play!</p>

                                <div className="mt-4 border border-dashed border-[#DDD] p-2 bg-[#FAFAFA]">
                                    <img src="https://api.mcpedl.com/storage/pages/1187/67f2a6abda159.png" alt="Download and Import" className="w-full h-auto bg-white min-h-[150px] flex items-center justify-center text-[#999] italic" />
                                    <p className="text-[11px] text-[#999] text-center mt-2 italic">Screenshot: Importing content on Android</p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <p><strong>2. How to Activate Content In-Game</strong><br />
                                    After the file has been successfully imported, follow these instructions to start using it:</p>

                                <div className="pl-4 space-y-4">
                                    <p><strong>For Add-Ons & Resource Packs:</strong><br />
                                        - Go to the <strong>Edit World</strong> screen or create a new one.<br />
                                        - Find the <strong>Resource Packs</strong> or <strong>Behavior Packs</strong> section.<br />
                                        - Select the <strong>Available</strong> tab, find your pack, and tap <strong>Activate</strong>.<br />
                                        <span className="text-orange-700 italic border-l-4 border-orange-500 pl-2 bg-orange-50 block py-1 mt-2">* Tip: Remember to activate both packs (if applicable) for the Mod to function fully.</span></p>

                                    <p><strong>For Worlds (Maps):</strong><br />
                                        The new map will appear immediately in your <strong>Worlds</strong> list. Don't forget to wait for the import notification to finish before clicking to play!</p>

                                    <p><strong>For Skins:</strong><br />
                                        In the main lobby, select <strong>Dressing Room</strong> {"->"} Tap the <strong>Classic Skins</strong> icon (hanger icon) to find and change into your new skin collection.</p>
                                </div>

                                <div className="mt-4 border border-dashed border-[#DDD] p-2 bg-[#FAFAFA]">
                                    <img src="https://api.mcpedl.com/storage/pages/1187/67f2a6ac02ec9.png" alt="Activate Content" className="w-full h-auto bg-white min-h-[150px]" />
                                    <p className="text-[11px] text-[#999] text-center mt-2 italic">Screenshot: Activating packs in Android world settings</p>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <p><strong>3. Troubleshooting</strong></p>
                                <p>If the installation does not go as expected, check the following cases:</p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-[14px] text-left border-collapse border border-[#EEE]">
                                        <thead className="bg-[#F8F9FA] text-[#555] font-bold uppercase text-[11px]">
                                            <tr>
                                                <th className="px-4 py-3 border border-[#EEE]">Problem</th>
                                                <th className="px-4 py-3 border border-[#EEE]">Solution</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[#666]">
                                            <tr>
                                                <td className="px-4 py-4 border border-[#EEE] font-bold text-red-600">Duplicate Pack Detected</td>
                                                <td className="px-4 py-4 border border-[#EEE]">An old version of this pack still exists on your device. Go to <strong>Settings {" > "} Storage</strong>, find the old pack, and tap the <strong>Trash</strong> icon to delete it before installing the new one.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4 border border-[#EEE] font-bold text-red-600">General Import Error</td>
                                                <td className="px-4 py-4 border border-[#EEE]">Usually due to a corrupted file or missing manifest. Try redownloading from another source or contact the author.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4 border border-[#EEE] font-bold text-red-600">Not a Valid Zip Archive</td>
                                                <td className="px-4 py-4 border border-[#EEE]">The file may have been corrupted during download (mobile data/Wi-Fi issues). Delete the old file and try redownloading with a different browser.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Final Note */}
                            <div className="space-y-4 pt-4 border-t border-[#EEE]">
                                <p className="text-[14px] italic text-[#666] bg-[#F1F3F5] p-4 border-l-4 border-blue-500">
                                    <strong>Pro Tip:</strong> If you have difficulty opening files directly from your browser, use a file manager app like <strong>ZArchiver</strong> to locate the downloaded file and select <strong>"Open with Minecraft"</strong>.
                                </p>
                            </div>
                        </div>

                        <p className="pt-4 border-t border-[#EEE] text-center italic text-[#777]">
                            Enjoy your mobile gaming experience with LFLauncher!
                        </p>

                        <p className="text-[13px] text-[#777] text-right">
                            Last modified: [{lastModified}]
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

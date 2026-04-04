import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Windows Installation Guide",
  description: "Step-by-step guide to install Minecraft Bedrock content on Windows PC using LF Launcher. Install .mcpack, .mcaddon, and .mcworld files with ease.",
};

export default function WindowsInstallGuide() {
    const lastModified = "March 20, 2026";

    return (
        <div className="bg-[#E9ECEF] font-sans text-[#333]">
            <main className="mx-auto flex w-full max-w-[1100px] grow gap-6 px-4 py-6">
                {/* Main Content Column */}
                <div className="grow rounded-sm border border-[#D1D4D7] bg-white">
                    {/* Header */}
                    <div className="border-b border-[#EEE] bg-[#F8F9FA] px-6 py-3">
                        <h1 className="text-sm font-bold uppercase tracking-wide text-[#555]">
                            MINECRAFT CONTENT INSTALLATION GUIDE (WINDOWS)
                        </h1>
                    </div>

                    {/* Text Content */}
                    <div className="p-8 text-[15px] leading-[1.7] text-[#444] space-y-8">
                        <p>
                            Welcome to the LF Launcher user guide. This article will help you integrate Add-Ons, Resource Packs, Worlds, and Skins into Minecraft Bedrock on PC quickly.
                        </p>

                        <div className="space-y-6">
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <p><strong>1. File Preparation</strong><br />
                                    First, download the standard files for Minecraft Bedrock such as: <code className="bg-gray-100 px-1 font-mono text-green-700">.mcaddon</code>, <code className="bg-gray-100 px-1 font-mono text-green-700">.mcpack</code>, or <code className="bg-gray-100 px-1 font-mono text-green-700">.mcworld</code>.</p>

                                <p className="text-[14px] italic text-[#666] bg-[#F9F9F9] p-3 border-l-4 border-green-600">
                                    Tip: Prioritize using the "Download with LF LAUNCHER" option for the most standard file format.
                                </p>

                                <div className="mt-4 border border-dashed border-[#DDD] p-2 bg-[#FAFAFA]">
                                    <div className="w-full h-auto bg-white min-h-[150px] flex items-center justify-center text-[#999] italic border border-zinc-100">
                                        <img src="/images/guides/android_import_1.png" alt="" />
                                    </div>
                                    <p className="text-[11px] text-[#999] text-center mt-2 italic">Screenshot: Preparing content files</p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <p><strong>2. Fast Installation</strong><br />
                                    After the download is complete, open the folder containing the file (usually the Downloads folder):</p>

                                <div className="pl-4 space-y-2">
                                    <p>- <strong>Method 1:</strong> Double-click directly on the downloaded file.</p>
                                    <p>- <strong>Method 2:</strong> Right-click on the file {"->"} Select <strong>Open with</strong> {"->"} Choose the version of <strong>Minecraft</strong> you are using (Release or Preview).</p>
                                </div>

                                <p>The system will automatically launch Minecraft and start the import process. You will see "Import started..." followed by "Successfully imported" when finished.</p>

                                <div className="mt-4 border border-dashed border-[#DDD] p-2 bg-[#FAFAFA]">
                                    <div className="w-full h-auto bg-white flex items-center justify-center border border-zinc-100 overflow-hidden">
                                        <img src="/images/guides/android_import_2.png" alt="Installation process on Windows" className="w-full h-auto object-contain" />
                                    </div>
                                    <p className="text-[11px] text-[#999] text-center mt-2 italic">Screenshot: Installation on Windows</p>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <p><strong>3. Common Installation Issues</strong></p>
                                <p>If you encounter an "Import failed" error, the cause might be:</p>

                                <div className="pl-4 space-y-4">
                                    <p><strong>Missing Manifest File:</strong> The pack you downloaded might be missing descriptor data. Try redownloading from the LF Launcher homepage.<br /></p>

                                    <p><strong>Incompatible Game Version:</strong> Some Add-Ons require a newer version of Minecraft. Check if you have updated your game.<br /></p>

                                    <p><strong>Permission Error:</strong> Ensure you are running Minecraft with valid user permissions so the Windows folder system allows data writing.</p>
                                </div>
                            </div>

                            {/* Final Section */}
                            <div className="space-y-4 pt-4 border-t border-[#EEE]">
                                <p className="text-sm">
                                    After a successful installation on PC, the activation steps in the world settings are identical to the Android version. Don't forget to enable "Experiments" if the Mod requires it!
                                </p>
                            </div>
                        </div>

                        <p className="pt-4 border-t border-[#EEE] text-center italic text-[#777]">
                            Enjoy a smoother Minecraft experience with LF Launcher!
                        </p>

                        <p className="text-[13px] text-[#777] text-right">
                            Last modified: <strong>{lastModified}</strong>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

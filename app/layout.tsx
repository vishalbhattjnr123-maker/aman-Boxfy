import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Footer } from "@/components/footer/Footer";
import { UserProvider } from "@/components/providers/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "STREAMX | Boxfy AI Studio - 4K Cinematic Streaming",
    description: "Watch cutting-edge 3D animations, AI sci-fi films, superhero sagas, and digital creative productions in 4K Ultra HD on STREAMX.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased min-h-screen selection:bg-red-600 selection:text-white`}>
                <UserProvider>
                    <Sidebar />
                    <main className="md:pl-[76px] min-h-screen pb-16 md:pb-0 flex flex-col justify-between">
                        <div className="flex-1">
                            {children}
                        </div>
                        <Footer />
                    </main>
                </UserProvider>
            </body>
        </html>
    );
}

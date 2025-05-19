import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TappyMonad",
  description: "Click and earn MON!",
};

export default function Page() {
  // Використовуємо URL безпосередньо з process.env
  const appUrl = process.env.NEXT_PUBLIC_URL || "https://monad-clicker.app";

  const frame = {
    version: "vNext",
    image: `${appUrl}/images/feed.png`,
    buttons: [
      {
        label: "Start clicking",
        action: "post",
        target: `${appUrl}/clicker`
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full max-w-md mx-auto bg-gradient-to-b from-[#2d0036] to-[#1a0022] p-0 relative">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow">TappyMonad</h1>
        <p className="text-xl mb-4 text-white/90">Click and earn MON!</p>
        <Link 
          href="/clicker" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-medium text-xl transition-colors shadow-lg"
        >
          Start game
        </Link>
      </div>
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(frame) }}
      />
    </div>
  );
}

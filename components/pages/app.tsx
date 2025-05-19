import { useMiniAppContext } from "@/hooks/use-miniapp-context";
import { SafeAreaContainer } from "@/components/safe-area-container";
import { useState, useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { monadTestnet } from "viem/chains";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { useConnect } from "wagmi";

export default function Home() {
  const { context, actions } = useMiniAppContext();
  const [clicks, setClicks] = useState(0);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const [showPlusOne, setShowPlusOne] = useState(false);
  const plusOneTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Get MON balance
  const { data: balance } = useBalance({
    address,
    chainId: monadTestnet.id,
  });

  // Function to increase click count and show '+1'
  const handleClick = () => {
    setClicks(prev => prev + 1);
    setShowPlusOne(true);
    if (plusOneTimeout.current) clearTimeout(plusOneTimeout.current);
    plusOneTimeout.current = setTimeout(() => setShowPlusOne(false), 500);
  };

  // Function to share result
  const shareResult = () => {
    if (actions) {
      actions.composeCast({
        text: `I clicked ${clicks} times in TappyMonad! Try to beat my score!`,
      });
    }
  };

  return (
    <SafeAreaContainer insets={context?.client.safeAreaInsets}>
      <div className="flex flex-col items-center justify-between min-h-screen w-full max-w-md mx-auto bg-gradient-to-b from-[#2d0036] to-[#1a0022] p-0 relative">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full px-4 pt-4 text-white text-lg font-mono">
          <div className="w-6 h-6 rounded-full bg-gray-200 mr-2" />
          <div className="flex-1 text-center truncate">{address ? `${address.slice(0,6)}....${address.slice(-4)}` : ''}</div>
          <div className="ml-2">{balance ? `${parseFloat(balance.formatted).toFixed(2)} MON` : ''}</div>
        </div>

        {/* Center: Clickable image with +1 */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full">
          <div className="relative flex items-center justify-center" style={{minHeight: '260px'}}>
            <img src="/images/tappy.svg" alt="Click" className="w-60 h-60 cursor-pointer select-none" onClick={handleClick} />
            {showPlusOne && (
              <span className="absolute top-8 left-1/2 -translate-x-1/2 text-red-400 text-2xl font-bold animate-bounce select-none">+1</span>
            )}
          </div>
        </div>

        {/* Bottom: Buttons */}
        <div className="flex w-full gap-4 px-4 pb-4">
          <button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-3 text-lg font-medium"
            onClick={shareResult}
          >
            Share your score: {clicks}
          </button>
          <button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-3 text-lg font-medium"
            // onClick={...} // TODO: Add mint logic
          >
            Mint Score
          </button>
        </div>
      </div>
    </SafeAreaContainer>
  );
}

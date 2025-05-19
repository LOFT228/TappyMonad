"use client";

import { useState } from "react";
import { useFrame } from "./farcaster-provider";
import { useAccount, useBalance } from "wagmi";
import { monadTestnet } from "viem/chains";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { useConnect } from "wagmi";

export default function ClickerGame() {
  const { context, actions } = useFrame();
  const [clicks, setClicks] = useState(0);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  
  // Get MON balance
  const { data: balance } = useBalance({
    address,
    chainId: monadTestnet.id,
  });

  // Function to increase click count
  const handleClick = () => {
    setClicks(prev => prev + 1);
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
    <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        TappyMonad
      </h1>
      
      <div className="w-full max-w-md space-y-8 flex flex-col items-center">
        {/* Show balance */}
        {isConnected && balance && (
          <div className="text-xl">
            MON Balance: {parseFloat(balance.formatted).toFixed(4)} MON
          </div>
        )}
        
        {/* Click counter */}
        <div className="text-2xl font-bold">
          Clicks: {clicks}
        </div>
        
        {/* Clickable image */}
        <div 
          className="flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
          onClick={handleClick}
        >
          <img src="/images/tappy.svg" alt="Click" className="w-32 h-32" />
        </div>
        
        {/* Share result button */}
        <button
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 text-lg font-medium"
          onClick={shareResult}
        >
          Share result
        </button>
        
        {/* Connect wallet button */}
        {!isConnected && (
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-md p-3 text-lg font-medium"
            onClick={() => connect({ connector: farcasterFrame() })}
          >
            Connect wallet
          </button>
        )}
      </div>
    </div>
  );
} 
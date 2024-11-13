import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

import { cn } from "@/lib/utils";

const SEPOLIA_BRIDGE_ADDRESS = "0xcB750abDdA2d62827570ad12B484A379C3C0D85E";

export default function Bridge() {
  const [amount, setAmount] = useState("");
  const account = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const onSubmit = async () => {
    console.log(111);
    try {
      await sendTransactionAsync({
        to: SEPOLIA_BRIDGE_ADDRESS,
        value: parseEther(amount),
      });
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full items-center">
      <div className="min-w-96 mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-4">Bridge</h1>

        <div className="mb-4">
          <label
            htmlFor="token"
            className="block text-gray-700 font-medium mb-2"
          >
            From:
          </label>
          {account?.address && (
            <h5 className="text-base font-semibold">{account?.chain?.name}</h5>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="token"
            className="block text-gray-700 font-medium mb-2"
          >
            To:
          </label>
          {account?.address && (
            <h5 className="text-base font-semibold">
              {account?.chainId === 1115 ? "Sepolia Testnet" : "Core Testnet"}
            </h5>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className={cn(
            "w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition",
            !account?.address && "bg-gray-300 hover:bg-gray-300"
          )}
          disabled={!account?.address}
          onClick={onSubmit}
        >
          Move funds
        </button>
      </div>
    </div>
  );
}

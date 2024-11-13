export const coreChain = {
  id: 1115,
  name: "Core Testnet",
  network: "core",
  nativeCurrency: {
    name: "tCORE",
    symbol: "tCORE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.btcs.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Core Testnet Explorer",
      url: "https://scan.test.btcs.network",
    },
  },
  testnet: true,
};

export const sepoliaChain = {
  id: 11155111,
  name: "Sepolia Testnet",
  network: "sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://ethereum-sepolia-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sepolia Testnet Explorer",
      url: "https://sepolia.etherscan.io",
    },
  },
  testnet: true,
};

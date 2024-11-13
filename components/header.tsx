import { ConnectButton } from "@rainbow-me/rainbowkit";
export const Header = () => {
  return (
    <header className="top-0 w-full gap-4 border-border">
      <div className="flex h-[68px] items-center justify-end gap-4 border-b p-3.5">
        <ConnectButton />
      </div>
    </header>
  );
};

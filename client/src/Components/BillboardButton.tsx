import { PlayIcon } from "@heroicons/react/24/solid";

interface BillBoardButtonProps {
  text: string;
  theme: "light" | "dark";
}
export default function BillboardButton({ text, theme }: BillBoardButtonProps) {
  return (
    <button
      className={`${
        theme === "dark" ? "bg-opacity-30" : null
      } bg-white rounded-md py-2 px-4 text-lg font-semibold flex items-center hover:bg-neutral-400 transition`}
    >
      <PlayIcon
        className={`${theme === "light" ? null : "text-white"} w-7 mr-1`}
      />
      <p className={`${theme === "light" ? "text-black" : "text-white"}`}>
        {text}
      </p>
    </button>
  );
}

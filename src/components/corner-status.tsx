import { ChangeMagnitude } from "@/types/types";
import { cn } from "@/utilities/cn";

const StatusVariants = {
  MATCH: {
    color: "bg-green-600",
    text: "Match",
  },
  CLOSE: {
    color: "bg-yellow-600",
    text: "Close",
  },
  MISMATCH: {
    color: "bg-red-600",
    text: "Mismatched",
  },
} as const;

export const CornerStatus = ({
  magnitude,
  text,
}: {
  magnitude: ChangeMagnitude;
  text: string;
}) => {
  if (magnitude in StatusVariants) {
    return (
      <span
        className={cn(
          "inline-block rounded-full px-1 py-1 lg:px-3 lg:py-2 text-white uppercase text-xs font-semibold lg:tracking-wider",
          StatusVariants[magnitude].color
        )}
      >
        {magnitude !== "MATCH" ? text : StatusVariants[magnitude].text}
      </span>
    );
  }

  return null;
};

import { cn } from "@/utilities/cn";

const StatusVariants = {
  MATCHED: {
    color: "bg-green-600",
    text: "Match",
  },
  CLOSE: {
    color: "bg-yellow-600",
    text: "Close",
  },
  MISMATCHED: {
    color: "bg-red-600",
    text: "Mismatched",
  },
} as const;

export type Status = keyof typeof StatusVariants;

export const CornerStatus = ({
  status,
  text,
}: {
  status: Status;
  text: string;
}) => {
  if (status in StatusVariants) {
    return (
      <span
        className={cn(
          "inline-block rounded-full px-3 py-2 text-white",
          StatusVariants[status].color
        )}
      >
        {status !== "MATCHED" ? text : StatusVariants[status].text}
      </span>
    );
  }

  return null;
};

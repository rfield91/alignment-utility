import { cn } from "@/utilities/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex gap-2 items-baseline">
      <input
        className={cn(
          `w-full border-0 border-b-2 border-gray-400 focus:border-orange-500 focus:ring-0 focus:outline-none text-right px-1 pt-1 lg:text-xl`,
          props.className
        )}
        {...props}
      />
      {label && <label className="self-end">{label}</label>}
    </div>
  );
};

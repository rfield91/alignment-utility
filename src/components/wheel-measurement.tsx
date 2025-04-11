import { Input } from "@/components/input";

type WheelMeasurementProps = {
  label: string;
  value: number;
  onValueUpdated: (selectedValue: number) => void;
};

export const WheelMeasurement = ({
  label,
  value,
  onValueUpdated,
}: WheelMeasurementProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs lg:text-lg whitespace-nowrap">{label}</div>
      <Input
        type="number"
        step={1}
        min={0}
        max={1000}
        value={value}
        onChange={(e) => onValueUpdated(Number.parseFloat(e.target.value))}
        label="mm"
      />
    </div>
  );
};

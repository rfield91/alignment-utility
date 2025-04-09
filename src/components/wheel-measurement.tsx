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
    <div>
      <div className="mb-2">{label}</div>
      <div className="flex flex-row justify-center gap-2">
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
    </div>
  );
};

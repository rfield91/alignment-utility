import { Input } from "@/components/input";
import { AxleConfiguration } from "@/types/types";

type TargetToeInputProps = {
  axle: AxleConfiguration;
  handleTargetToeChange: (axleKey: string, targetToe: number) => void;
};

export const TargetToeInput = ({
  axle,
  handleTargetToeChange,
}: TargetToeInputProps) => {
  return (
    <>
      <div className="text-xl text-center">Desired Total Toe</div>
      <Input
        type="number"
        step={0.0625}
        value={axle.targetToe / 25.4}
        onChange={(e) =>
          handleTargetToeChange(
            axle.axleKey,
            Number.parseFloat(e.target.value) * 25.4
          )
        }
        label="in"
      />
    </>
  );
};

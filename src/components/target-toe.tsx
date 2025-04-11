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
    <div className="flex mx-auto gap-2 mt-2 items-baseline justify-center">
      <div className="lg:text-xl">Desired Total Toe</div>
      <div className="w-1/4">
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
      </div>
    </div>
  );
};

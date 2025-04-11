import { TargetToeInput } from "@/components/target-toe";
import WheelToe from "@/components/wheel-toe";
import { AxleConfiguration } from "@/types/types";

type AxleToeProps = {
  axle: AxleConfiguration;
  handleWheelMeasurementChange: (
    cornerKey: string,
    frontOfWheel: number,
    rearOfWheel: number
  ) => void;
  handleTargetToeChange: (axleKey: string, targetToe: number) => void;
};

export const AxleToe = ({
  axle,
  handleWheelMeasurementChange,
  handleTargetToeChange,
}: AxleToeProps) => {
  return (
    <div className="flex flex-col gap-5">
      <TargetToeInput
        axle={axle}
        handleTargetToeChange={handleTargetToeChange}
      />
      <div className="flex gap-10 lg:gap-28">
        {Object.keys(axle.wheels).map((wheel) => (
          <WheelToe
            key={axle.wheels[wheel].cornerKey}
            targetToeHalf={axle.targetToe / 2}
            wheelConfiguration={axle.wheels[wheel]}
            onChange={handleWheelMeasurementChange}
          />
        ))}
      </div>
    </div>
  );
};

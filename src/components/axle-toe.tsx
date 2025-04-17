import CornerToe from "@/components/corner-toe";
import { TargetToeInput } from "@/components/target-toe";
import { WheelDiameter } from "@/components/wheel-diameter";
import { AxleConfiguration } from "@/types/types";

type AxleToeProps = {
  axle: AxleConfiguration;
  handleWheelMeasurementChange: (
    cornerKey: string,
    frontOfWheel: number,
    rearOfWheel: number
  ) => void;
  handleTargetToeChange: (axleKey: string, targetToe: number) => void;
  handleWheelDiameterChange: (
    axleKey: string,
    newWheelDiameter: number
  ) => void;
};

export const AxleToe = ({
  axle,
  handleWheelMeasurementChange,
  handleTargetToeChange,
  handleWheelDiameterChange,
}: AxleToeProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col mx-auto gap-2 mt-2 items-baseline justify-center">
        <WheelDiameter
          wheelDiameter={axle.wheelDiameter}
          handleWheelDiameterChange={(newWheelDiameter) =>
            handleWheelDiameterChange(axle.axleKey, newWheelDiameter)
          }
        />
        <TargetToeInput
          axle={axle}
          handleTargetToeChange={handleTargetToeChange}
        />
      </div>
      <div className="flex gap-10 lg:gap-28">
        {Object.keys(axle.corners).map((corner) => (
          <CornerToe
            key={axle.corners[corner].cornerKey}
            targetToeHalf={axle.targetToe / 2}
            wheelDiameter={axle.wheelDiameter}
            cornerConfiguration={axle.corners[corner]}
            onChange={handleWheelMeasurementChange}
          />
        ))}
      </div>
    </div>
  );
};

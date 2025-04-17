import { CornerStatus } from "@/components/corner-status";
import { CornerVisual } from "@/components/corner-visual";
import { WheelMeasurement } from "@/components/wheel-measurement";
import { CornerConfiguration } from "@/types/types";
import {
  getToeDetailsFromMeasurement,
  getToeDetailsFromTarget,
  getToeRequiredChangeDetails,
} from "@/utilities/toe-calculations";

type WheelToeProps = {
  wheelDiameter: number;
  cornerConfiguration: CornerConfiguration;
  targetToeHalf: number;
  onChange: (
    cornerKey: string,
    frontOfWheel: number,
    rearOfWheel: number
  ) => void;
};

export const CornerToe = ({
  wheelDiameter,
  cornerConfiguration: wheelConfiguration,
  onChange,
  targetToeHalf,
}: WheelToeProps) => {
  const side = wheelConfiguration.cornerKey[0] == "L" ? "LEFT" : "RIGHT";
  const toeInDirection = side == "LEFT" ? "CLOCKWISE" : "COUNTERCLOCKWISE";

  const measuredDetails = getToeDetailsFromMeasurement(
    wheelConfiguration.frontOfWheel,
    wheelConfiguration.rearOfWheel,
    toeInDirection,
    wheelDiameter
  );

  const targetDetails = getToeDetailsFromTarget(
    targetToeHalf,
    toeInDirection,
    wheelDiameter
  );

  const requiredChange = getToeRequiredChangeDetails(
    measuredDetails,
    targetDetails
  );

  if (wheelConfiguration.cornerKey === "RF") {
    console.log(measuredDetails, requiredChange);
    console.log(256 - wheelDiameter * wheelDiameter);
  }

  return (
    <div className="flex flex-col gap-5 text-center">
      <div className="lg:text-xl text-center font-bold">
        {wheelConfiguration.cornerName}
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div>
          Target: {(targetToeHalf / 25.4).toFixed(3)}&quot;{" "}
          {targetDetails.direction}
        </div>
        <div>
          Current: {(measuredDetails.value / 25.4).toFixed(3)}&quot;{" "}
          {measuredDetails.direction}
        </div>
        <div>
          <CornerStatus
            magnitude={requiredChange.magnitude}
            text={requiredChange.direction}
          />
        </div>
      </div>
      <div
        className={`flex justify-between lg:gap-10 ${
          side == "LEFT" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="flex flex-col justify-center gap-10 mx-4">
          <WheelMeasurement
            label="Front of Wheel"
            value={wheelConfiguration.frontOfWheel}
            onValueUpdated={(selectedValue) =>
              onChange(
                wheelConfiguration.cornerKey,
                selectedValue,
                wheelConfiguration.rearOfWheel
              )
            }
          />
          <WheelMeasurement
            label="Rear of Wheel"
            value={wheelConfiguration.rearOfWheel}
            onValueUpdated={(selectedValue) =>
              onChange(
                wheelConfiguration.cornerKey,
                wheelConfiguration.frontOfWheel,
                selectedValue
              )
            }
          />
        </div>
        <div className="flex items-center">
          <CornerVisual
            wheelDiameter={wheelDiameter}
            targetDetails={targetDetails}
            measuredDetails={measuredDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default CornerToe;

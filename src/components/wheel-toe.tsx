import { CornerStatus } from "@/components/corner-status";
import { WheelMeasurement } from "@/components/wheel-measurement";
import { WheelConfiguration } from "@/types/types";
import {
  getToeDetailsFromMeasurement,
  getToeDetailsFromTarget,
  getToeRequiredChangeDetails,
} from "@/utilities/toe-calculations";

type WheelToeProps = {
  wheelConfiguration: WheelConfiguration;
  targetToeHalf: number;
  onChange: (
    cornerKey: string,
    frontOfWheel: number,
    rearOfWheel: number
  ) => void;
};

export const WheelToe = ({
  wheelConfiguration,
  onChange,
  targetToeHalf,
}: WheelToeProps) => {
  const side = wheelConfiguration.cornerKey[0] == "L" ? "LEFT" : "RIGHT";
  const toeInDirection = side == "LEFT" ? "CLOCKWISE" : "COUNTERCLOCKWISE";

  const measuredDetails = getToeDetailsFromMeasurement(
    wheelConfiguration.frontOfWheel,
    wheelConfiguration.rearOfWheel,
    toeInDirection
  );

  const targetDetails = getToeDetailsFromTarget(targetToeHalf, toeInDirection);

  const requiredChange = getToeRequiredChangeDetails(
    measuredDetails,
    targetDetails
  );

  if (wheelConfiguration.cornerKey === "RF") {
    console.log(measuredDetails, requiredChange);
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
        {/* <div>
          <CornerStatus
            status={status}
            text={changeDirectionLookup[requiredToeChangeDirection]}
          />
        </div> */}
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
        <div className="grid mx-auto items-center">
          <div
            className="h-32 w-16 lg:h-64 lg:w-36 col-start-1 row-start-1 bg-green-400 "
            style={{ transform: `rotate(${targetDetails.degrees}deg)` }}
          ></div>
          <div
            className="h-32 w-16 lg:h-64 lg:w-36 col-start-1 row-start-1 bg-gray-800 flex items-center justify-center transition-all"
            style={{ transform: `rotate(${measuredDetails.degrees}deg)` }}
          >
            <div>
              <CornerStatus
                magnitude={requiredChange.magnitude}
                text={requiredChange.direction}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelToe;

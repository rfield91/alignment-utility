import { CornerStatus, Status } from "@/components/corner-status";
import { WheelMeasurement } from "@/components/wheel-measurement";
import { WheelConfiguration } from "@/types/types";
import {
  getToeChangeDirection,
  getToeDetailsFromMeasurement,
  getToeDetailsFromTarget,
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

  const targetVsMeasuredDelta =
    measuredDetails.measuredToe - targetDetails.targetWheelToe;
  let status: Status = "MATCHED";

  if (targetVsMeasuredDelta === 0) status = "MATCHED";
  else if (Math.abs(targetVsMeasuredDelta) <= 0.5) status = "CLOSE";
  else status = "MISMATCHED";

  const requiredToeChangeDirection = getToeChangeDirection(
    measuredDetails.measuredToe,
    targetDetails.targetWheelToe
  );

  const changeDirectionLookup = {
    MATCH: "",
    ADDTOEIN: "Add toe in",
    ADDTOEOUT: "Add toe out",
  };

  if (wheelConfiguration.cornerKey === "LF") {
    console.log(measuredDetails, targetDetails, requiredToeChangeDirection);
  }

  return (
    <div className="flex flex-col gap-5 text-center">
      <div className="text-xl text-center font-bold">
        {wheelConfiguration.cornerName}
      </div>
      <div className="flex flex-col gap-0.5">
        <div>
          Target: {(targetToeHalf / 25.4).toFixed(3)}&quot;{" "}
          {targetDetails.direction}
        </div>
        <div>
          Current: {(measuredDetails.measuredToe / 25.4).toFixed(3)}&quot;{" "}
          {measuredDetails.direction}
        </div>
        <div>
          <CornerStatus
            status={status}
            text={changeDirectionLookup[requiredToeChangeDirection]}
          />
        </div>
      </div>
      <div
        className={`flex justify-between gap-10 ${
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
        <div className="grid mx-auto">
          <div
            className="h-64 col-start-1 row-start-1 bg-green-400 w-36"
            style={{ transform: `rotate(${targetDetails.degrees}deg)` }}
          ></div>
          <div
            className="h-64 col-start-1 row-start-1 bg-gray-800 w-36"
            style={{ transform: `rotate(${measuredDetails.degrees}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WheelToe;

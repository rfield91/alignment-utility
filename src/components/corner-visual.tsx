import { ToeDetails } from "@/types/types";

type CornerVisualProps = {
  wheelDiameter: number;
  targetDetails: ToeDetails;
  measuredDetails: ToeDetails;
};

export const CornerVisual = ({
  wheelDiameter,
  targetDetails,
  measuredDetails,
}: CornerVisualProps) => {
  return (
    <div className="grid mx-auto items-center h-[96px] w-[60px]  lg:w-[180px] lg:h-[250px]">
      <div
        className={`col-start-1 row-start-1 bg-green-400`}
        style={{
          transform: `rotate(${targetDetails.degrees}deg)`,
          height: `${Math.round(60 + (wheelDiameter * wheelDiameter) / 10)}%`,
          width: `${Math.round(20 + (wheelDiameter * wheelDiameter) / 10)}%`,
        }}
      ></div>
      <div
        className="col-start-1 row-start-1 bg-gray-800 flex items-center justify-center transition-all"
        style={{
          transform: `rotate(${measuredDetails.degrees}deg)`,
          height: `${Math.round(60 + (wheelDiameter * wheelDiameter) / 10)}%`,
          width: `${Math.round(20 + (wheelDiameter * wheelDiameter) / 10)}%`,
        }}
      ></div>
    </div>
  );
};

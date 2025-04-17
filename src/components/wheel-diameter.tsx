type WheelDiameterProps = {
  wheelDiameter: number;
  handleWheelDiameterChange: (newWheelDiameter: number) => void;
};
export const WheelDiameter = ({
  wheelDiameter,
  handleWheelDiameterChange,
}: WheelDiameterProps) => {
  return (
    <div className="flex flex-col gap-2 items-center mx-auto">
      <div>Wheel Diameter: {wheelDiameter}&quot;</div>
      <input
        type="range"
        min={13}
        max={22}
        value={wheelDiameter}
        onChange={(e) =>
          handleWheelDiameterChange(Number.parseInt(e.target.value))
        }
      />
    </div>
  );
};

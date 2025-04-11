import { ChangeDirection, ChangeMagnitude, ToeDetails } from "@/types/types";

export const getScaledAngle = (delta: number) => {
  const angle = Math.sin(Math.abs(delta) / 18);

  const scaledAngle = angle * 100;

  return scaledAngle;
};

export const getDegreesForWheel = (
  angle: number,
  direction: string,
  toeInDirection: string
) => {
  if (toeInDirection === "CLOCKWISE") {
    return direction === "IN" ? angle : 360 - angle;
  } else if (toeInDirection === "COUNTERCLOCKWISE") {
    return direction == "IN" ? 360 - angle : angle;
  }
};

export const getToeDetailsFromMeasurement = (
  frontOfWheel: number,
  rearOfWheel: number,
  toeInDirection: string
) => {
  const direction = frontOfWheel > rearOfWheel ? "IN" : "OUT";

  const delta = Math.abs(frontOfWheel - rearOfWheel);

  const scaledAngle = getScaledAngle(delta);

  const measuredToInMm =
    direction === "IN"
      ? frontOfWheel - rearOfWheel
      : rearOfWheel - frontOfWheel;

  return {
    degrees: getDegreesForWheel(scaledAngle, direction, toeInDirection),
    direction: direction,
    value: measuredToInMm,
  };
};

export const getToeDetailsFromTarget = (
  targetWheelToe: number,
  toeInDirection: string
) => {
  const direction = targetWheelToe < 0 ? "IN" : "OUT";

  const scaledAngle = getScaledAngle(targetWheelToe);

  return {
    degrees: getDegreesForWheel(scaledAngle, direction, toeInDirection),
    direction: direction,
    value: targetWheelToe,
  };
};

export const getToeRequiredChangeDetails = (
  measured: ToeDetails,
  target: ToeDetails
) => {
  const changeDirectionLookup = {
    MATCH: "",
    ADDTOEIN: "Add toe in",
    ADDTOEOUT: "Add toe out",
  };

  let changeDirection: ChangeDirection = "MATCH";

  if (measured.direction === "IN" && target.direction === "OUT")
    changeDirection = "ADDTOEOUT";
  else if (measured.direction === "OUT" && target.direction === "IN")
    changeDirection = "ADDTOEIN";
  else if (measured.value === target.value) changeDirection = "MATCH";
  else if (measured.value < target.value) changeDirection = "ADDTOEOUT";
  else changeDirection = "ADDTOEIN";

  let magnitude: ChangeMagnitude = "MATCH";

  const targetVsMeasuredDelta = measured.value - target.value;

  if (Math.abs(targetVsMeasuredDelta) <= 0.2) magnitude = "MATCH";
  else if (Math.abs(targetVsMeasuredDelta) <= 0.5) magnitude = "CLOSE";
  else magnitude = "MISMATCH";

  return {
    direction: changeDirectionLookup[changeDirection],
    magnitude: magnitude,
  };
};

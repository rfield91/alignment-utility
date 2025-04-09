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
    measuredToe: measuredToInMm,
    direction: direction,
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
    targetWheelToe: targetWheelToe,
  };
};

export const getToeChangeDirection = (
  measuredToe: number,
  targetToe: number
) => {
  if (measuredToe === targetToe) return "MATCH";
  if (measuredToe < targetToe) return "ADDTOEOUT";

  return "ADDTOEIN";
};

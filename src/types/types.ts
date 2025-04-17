export type CornerConfiguration = {
  cornerKey: string;
  cornerName: string;
  frontOfWheel: number;
  rearOfWheel: number;
};

export type AxleConfiguration = {
  axleKey: string;
  wheelDiameter: number;
  corners: {
    [key: string]: CornerConfiguration;
  };
  targetToe: number;
};

export type Vehicle = {
  toeSetup: {
    [axle: string]: AxleConfiguration;
  };
};

export type ToeDetails = {
  degrees: number | undefined;
  direction: string;
  value: number;
};

export type RequiredChange = {
  direction: string;
  magnitude: ChangeMagnitude;
};

export type ChangeDirection = "MATCH" | "ADDTOEIN" | "ADDTOEOUT";
export type ChangeMagnitude = "MATCH" | "CLOSE" | "MISMATCH";

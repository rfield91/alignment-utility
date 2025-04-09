export type WheelConfiguration = {
  cornerKey: string;
  cornerName: string;
  frontOfWheel: number;
  rearOfWheel: number;
};

export type AxleConfiguration = {
  axleKey: string;
  wheels: {
    [key: string]: WheelConfiguration;
  };
  targetToe: number;
};

export type Vehicle = {
  toeSetup: {
    [axle: string]: AxleConfiguration;
  };
};

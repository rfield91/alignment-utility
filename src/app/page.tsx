"use client";

import { AxleToe } from "@/components/axle-toe";
import { Vehicle } from "@/types/types";
import { useState } from "react";

export type Units = "METRIC" | "IMPERIAL";

export type UserSettings = {
  units: Units;
};

export default function Home() {
  const [vehicle, setVehicle] = useState<Vehicle>({
    toeSetup: {
      FRONT: {
        axleKey: "FRONT",
        wheelDiameter: 17,
        corners: {
          LF: {
            cornerKey: "LF",
            cornerName: "Left Front",
            frontOfWheel: 0,
            rearOfWheel: 0,
          },
          RF: {
            cornerKey: "RF",
            cornerName: "Right Front",
            frontOfWheel: 0,
            rearOfWheel: 0,
          },
        },
        targetToe: 0.125 * 25.4,
      },
      REAR: {
        axleKey: "REAR",
        wheelDiameter: 17,
        corners: {
          LR: {
            cornerKey: "LR",
            cornerName: "Left Rear",
            frontOfWheel: 0,
            rearOfWheel: 0,
          },
          RR: {
            cornerKey: "RR",
            cornerName: "Right Rear",
            frontOfWheel: 0,
            rearOfWheel: 0,
          },
        },
        targetToe: -0.125 * 25.4,
      },
    },
  });

  const handleWheelMeasurementChange = (
    cornerKey: string,
    frontOfWheel: number,
    rearOfWheel: number
  ) => {
    const toeUpdates = { ...vehicle.toeSetup };
    Object.keys(vehicle.toeSetup).forEach((axle) => {
      Object.keys(toeUpdates[axle].corners).forEach((wheel) => {
        if (toeUpdates[axle].corners[wheel].cornerKey == cornerKey) {
          toeUpdates[axle].corners[wheel].frontOfWheel = frontOfWheel;
          toeUpdates[axle].corners[wheel].rearOfWheel = rearOfWheel;
        }
      });
    });

    setVehicle({ ...vehicle, toeSetup: toeUpdates });
  };

  const handleTargetToeChange = (axleKey: string, targetToe: number) => {
    const toeUpdates = { ...vehicle.toeSetup };

    toeUpdates[axleKey].targetToe = targetToe;

    setVehicle({ ...vehicle, toeSetup: toeUpdates });
  };

  const handleWheelDiameterChange = (
    axleKey: string,
    newWheelDiameter: number
  ) => {
    const toeUpdates = { ...vehicle.toeSetup };

    toeUpdates[axleKey].wheelDiameter = newWheelDiameter;

    setVehicle({ ...vehicle, toeSetup: toeUpdates });
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 h-screen">
      <AxleToe
        axle={vehicle.toeSetup["FRONT"]}
        handleWheelMeasurementChange={handleWheelMeasurementChange}
        handleTargetToeChange={handleTargetToeChange}
        handleWheelDiameterChange={handleWheelDiameterChange}
      />
      <AxleToe
        axle={vehicle.toeSetup["REAR"]}
        handleWheelMeasurementChange={handleWheelMeasurementChange}
        handleTargetToeChange={handleTargetToeChange}
        handleWheelDiameterChange={handleWheelDiameterChange}
      />
    </main>
  );
}

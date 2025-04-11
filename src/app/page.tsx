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
        wheels: {
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
        wheels: {
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
      Object.keys(toeUpdates[axle].wheels).forEach((wheel) => {
        if (toeUpdates[axle].wheels[wheel].cornerKey == cornerKey) {
          toeUpdates[axle].wheels[wheel].frontOfWheel = frontOfWheel;
          toeUpdates[axle].wheels[wheel].rearOfWheel = rearOfWheel;
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

  return (
    <main className="flex flex-col items-center justify-center gap-10 h-screen">
      <AxleToe
        axle={vehicle.toeSetup["FRONT"]}
        handleWheelMeasurementChange={handleWheelMeasurementChange}
        handleTargetToeChange={handleTargetToeChange}
      />
      <AxleToe
        axle={vehicle.toeSetup["REAR"]}
        handleWheelMeasurementChange={handleWheelMeasurementChange}
        handleTargetToeChange={handleTargetToeChange}
      />
    </main>
  );
}

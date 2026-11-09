import type { ComponentType } from "react";
import { CablesBackground } from "./CablesBackground";
import { RooftopsBackground } from "./RooftopsBackground";
import { BalconiesBackground } from "./BalconiesBackground";

export const BACKGROUNDS: Record<string, ComponentType> = {
  cables: CablesBackground,
  tejados: RooftopsBackground,
  balcones: BalconiesBackground,
};

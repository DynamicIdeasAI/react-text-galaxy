import type { SizeUnitType } from './common.type';

interface TextGalaxyPropertyDataType {
  text: string;
  spiralSpeed?: SpiralSpeedType;
  font?: {
    sizeInPx: number;
    family: string;
    color: string;
  };
  background?: {
    color: string;
  };
  size?: {
    width: { value: number; unit: SizeUnitType };
    height: {
      value: number;
      unit: SizeUnitType;
    };
  };
}

interface CharacterInfoDataType {
  value: string;
  position: { x: number; y: number };
}

type SpiralSpeedType = 'slow' | 'normal' | 'fast';

export type { TextGalaxyPropertyDataType, CharacterInfoDataType, SpiralSpeedType };

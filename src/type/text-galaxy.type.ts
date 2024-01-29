import type { SizeUnitType, SpeedType } from './common.type';

interface TextGalaxyPropertyDataType {
  text: string;
  spiralSpeed?: SpeedType;
  font?: {
    sizeInPx: number;
    family: string;
  };
  textColors?: string[];
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

export type { TextGalaxyPropertyDataType, CharacterInfoDataType };

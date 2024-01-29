import type { DirectionType, SizeUnitType, SpeedType } from './common.type';

interface TextParallaxPropertyDataType {
  words: string[];
  movingSpeed?: SpeedType;
  movingDirection?: DirectionType;
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

interface WordInfoDataType {
  text: string;
  fontSizeInPx: number;
  color: string;
  speed: number;
  position: { x: number; y: number };
}

export type { TextParallaxPropertyDataType, WordInfoDataType };

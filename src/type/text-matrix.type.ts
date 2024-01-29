import type { SizeUnitType, SpeedType } from './common.type';

interface TextMatrixPropertyDataType {
  text: string;
  fallingSpeed?: SpeedType;
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

interface TextLineInfoDataType {
  text: string;
  currentFirstCharIndex: number;
  currentLastCharIndex: number;
  fallingTimes: number;
  speed: number;
  startPosition: { x: number; y: number };
}

export type { TextMatrixPropertyDataType, TextLineInfoDataType };

import type { SizeUnitType } from './common.type';

interface TextMatrixPropertyDataType {
  text: string;
  fallingSpeed?: FallingSpeedType;
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

type FallingSpeedType = 'slow' | 'normal' | 'fast';

export type { TextMatrixPropertyDataType, TextLineInfoDataType, FallingSpeedType };

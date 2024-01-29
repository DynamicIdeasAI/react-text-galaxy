import TextGalaxy from './component/text-galaxy';
import TextMatrix from './component/text-matrix';
import TextParallax from './component/text-parallax';
import DeviceHelper from './helper/device.helper';
import MathHelper from './helper/math.helper';
import type { TextGalaxyPropertyDataType, CharacterInfoDataType } from './type/text-galaxy.type';
import type { SizeUnitType, SpeedType, DirectionType } from './type/common.type';
import type { TextMatrixPropertyDataType, TextLineInfoDataType } from './type/text-matrix.type';

export { TextGalaxy, TextMatrix, TextParallax, DeviceHelper, MathHelper };
export type {
  TextGalaxyPropertyDataType,
  CharacterInfoDataType,
  SpeedType,
  DirectionType,
  SizeUnitType,
  TextMatrixPropertyDataType,
  TextLineInfoDataType
};

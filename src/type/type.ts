interface ITextGalaxyProps {
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

interface ICharacterInfo {
  value: string;
  position: { x: number; y: number };
}

type SpiralSpeedType = 'slow' | 'normal' | 'fast';

type SizeUnitType = 'px' | 'em' | 'rem' | 'vh' | 'vw' | '%';

export type { ITextGalaxyProps, ICharacterInfo, SpiralSpeedType, SizeUnitType };

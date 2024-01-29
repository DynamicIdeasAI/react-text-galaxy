'use client';

import React, { useEffect, useRef } from 'react';
import DeviceHelper from '../helper/device.helper';
import type { SpeedType } from '../type/common.type';
import type { TextParallaxPropertyDataType, WordInfoDataType } from '../type/text-parallax.type';
import MathHelper from '../helper/math.helper';

const colors = ['rgba(166, 213, 119, 1)', 'rgba(67, 128, 50, 1)', 'rgba(1, 68, 33, 0.8)', 'rgba(1, 50, 32, 0.5)'];
const speeds: { [key in SpeedType]: number } = { slow: 0.6, normal: 1.2, fast: 2 };
const refreshInterval = 80;
const density = 30;
const maxScaleLevel = 8;
const maxSpeedOffset = 0.3;

const TextParallax: React.FC<TextParallaxPropertyDataType> = (params: TextParallaxPropertyDataType) => {
  const {
    words,
    movingSpeed = 'normal',
    movingDirection = 'right-left',
    font = { sizeInPx: 26, family: 'Arial Black' },
    textColors = colors,
    background = { color: '#071104' },
    size = { width: { value: 100, unit: 'vw' }, height: { value: 100, unit: 'vh' } }
  } = params;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const movingInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  let wordInfos: WordInfoDataType[] = [];
  let canvasClientHeight = 0;
  let canvasClientWidth = 0;
  let canvasContext: CanvasRenderingContext2D;

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    const { height: clientHeight, width: clientWidth } = canvas.getBoundingClientRect();

    canvasClientHeight = clientHeight;
    canvasClientWidth = clientWidth;

    if (canvasClientHeight && canvasClientWidth) {
      removeInterval();

      movingInterval.current = setInterval(() => moveWords(), refreshInterval);

      initWords();
    }

    return () => removeInterval();
  }, []);

  useEffect(() => initWords(), [words]);

  const removeInterval = () => {
    if (movingInterval.current !== undefined) clearInterval(movingInterval.current);
  };

  const getCanvas = () => {
    const devicePixelRatio = DeviceHelper.getDevicePixelRatio();

    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.style.height = `${canvasClientHeight}px`;
    canvas.style.width = `${canvasClientWidth}px`;
    canvas.height = canvasClientHeight * devicePixelRatio;
    canvas.width = canvasClientWidth * devicePixelRatio;

    return canvas;
  };

  const getCanvasContext = () => {
    if (canvasContext) return canvasContext;

    const canvas = getCanvas();
    const devicePixelRatio = DeviceHelper.getDevicePixelRatio();

    canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvasContext.scale(devicePixelRatio, devicePixelRatio);

    clearCanvas(canvasContext);

    const { sizeInPx: sizeInPixel, family } = font;

    canvasContext.font = `${sizeInPixel}px ${family}`;

    return canvasContext;
  };

  const clearCanvas = (context?: CanvasRenderingContext2D) => {
    const canvasContext = context || getCanvasContext();

    canvasContext.fillStyle = background.color;
    canvasContext.fillRect(0, 0, canvasClientWidth, canvasClientHeight);
  };

  const newWord = (startFromOutside = true): WordInfoDataType => {
    const word = words[MathHelper.getRandomNumber(words.length, true)];
    const scaleLevel = MathHelper.getRandomNumber(maxScaleLevel);
    const fontSizeInPx = font.sizeInPx * scaleLevel;
    const x = startFromOutside
      ? movingDirection === 'right-left'
        ? canvasClientWidth + MathHelper.getRandomNumber(canvasClientWidth)
        : -1 * fontSizeInPx * word.length - MathHelper.getRandomNumber(canvasClientWidth)
      : MathHelper.getRandomNumber(canvasClientWidth);

    return {
      text: word,
      speed:
        Math.floor(speeds[movingSpeed] * (1 / scaleLevel) * 100) / 100 +
        MathHelper.getRandomNumber(maxSpeedOffset, true),
      fontSizeInPx,
      color: textColors.length === 1 ? textColors[0] : textColors[MathHelper.getRandomNumber(textColors.length, true)],
      position: {
        x,
        y: MathHelper.getRandomNumber(canvasClientHeight, true)
      }
    } as WordInfoDataType;
  };

  const initWords = () => {
    wordInfos = new Array(density).fill(null);

    wordInfos.forEach((_, index) => (wordInfos[index] = newWord(false)));
  };

  const moveWords = () => {
    clearCanvas();

    const canvasContext = getCanvasContext();

    wordInfos.forEach((wordInfo, index) => {
      const { position, fontSizeInPx, text, speed } = wordInfo;

      if (
        (movingDirection === 'right-left' && position.x + fontSizeInPx * text.length <= 0) ||
        (movingDirection === 'left-right' && position.x >= canvasClientWidth)
      ) {
        wordInfos[index] = newWord();

        return;
      }

      const { x, y } = position;
      const nextX =
        x + (movingDirection === 'right-left' ? -1 : 1) * (speed * Math.max(1, Math.floor(font.sizeInPx / 2)));

      canvasContext.font = `${fontSizeInPx}px ${font.family}`;
      canvasContext.fillStyle = wordInfo.color;
      canvasContext.fillText(text, nextX, y);

      wordInfos[index].position.x = nextX;
    });
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size.width.value}${size.width.unit}`,
        height: `${size.height.value}${size.height.unit}`
      }}
    />
  );
};

export default TextParallax;

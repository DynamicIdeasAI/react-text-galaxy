'use client';

import React, { useEffect, useRef } from 'react';
import DeviceHelper from '../helper/device.helper';
import MathHelper from '../helper/math.helper';
import { MinimalTextLength } from '../constant/common.constant';
import type { TextLineInfoDataType, TextMatrixPropertyDataType } from '../type/text-matrix.type';
import type { SpeedType } from '../type/common.type';

const colors = ['rgba(166, 213, 119, 1)', 'rgba(67, 128, 50, 1)', 'rgba(1, 68, 33, 0.8)', 'rgba(1, 50, 32, 0.5)'];
const speeds: { [key in SpeedType]: number } = { slow: 0.6, normal: 1.2, fast: 2 };
const refreshInterval = 80;
const startOffsetY = 0.618;

let chars: string[] = [];

const TextMatrix: React.FC<TextMatrixPropertyDataType> = (params: TextMatrixPropertyDataType) => {
  const {
    text,
    fallingSpeed = 'normal',
    font = { sizeInPx: 16, family: 'Arial Black' },
    textColors = colors,
    background = { color: '#071104' },
    size = { width: { value: 100, unit: 'vw' }, height: { value: 100, unit: 'vh' } }
  } = params;

  chars = text.split('');

  while (chars.length < MinimalTextLength) chars = chars.concat(chars);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallingInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const density = 4;

  let lineInfos: TextLineInfoDataType[] = [];
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

      fallingInterval.current = setInterval(() => fallText(), refreshInterval);

      initTextLines();
    }

    return () => removeInterval();
  }, []);

  useEffect(() => initTextLines(), [text]);

  const removeInterval = () => {
    if (fallingInterval.current !== undefined) clearInterval(fallingInterval.current);
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

  const newTextLine = (): TextLineInfoDataType => {
    const randomLineLength = MathHelper.getRandomNumber(30);
    const randomCharIndex = MathHelper.getRandomNumber(chars.length, true);
    const line = chars.slice(randomCharIndex, randomCharIndex + randomLineLength).join('');
    const speedOffset = Math.random() * 0.5 * (MathHelper.getRandomNumber(10) % 2 ? 1 : -1);
    const speed = speeds[fallingSpeed] + speedOffset;

    return {
      text: line,
      currentFirstCharIndex: 0,
      currentLastCharIndex: 0,
      fallingTimes: 0,
      speed,
      startPosition: {
        x: MathHelper.getRandomNumber(canvasClientWidth),
        y: MathHelper.getRandomNumber(canvasClientHeight) * startOffsetY
      }
    } as TextLineInfoDataType;
  };

  const initTextLines = () => {
    const { sizeInPx: fontSizeInPixel } = font;
    const lineCounts = Math.floor(canvasClientWidth / fontSizeInPixel) * density;

    lineInfos = new Array(lineCounts).fill(null);

    lineInfos.forEach((_, index) => (lineInfos[index] = newTextLine()));
  };

  const fallText = () => {
    clearCanvas();

    const canvasContext = getCanvasContext();

    lineInfos.forEach((lineInfo, index) => {
      const maxCharIndex = lineInfo.text.length - 1;

      lineInfo.fallingTimes++;

      if (lineInfo.fallingTimes > maxCharIndex * 2) {
        lineInfos[index] = newTextLine();

        return;
      }

      lineInfo.currentLastCharIndex = Math.min(maxCharIndex, lineInfo.currentLastCharIndex + 1);
      lineInfo.currentFirstCharIndex = lineInfo.fallingTimes > maxCharIndex ? lineInfo.fallingTimes - maxCharIndex : 0;

      const { sizeInPx: fontSizeInPixel } = font;
      const { x, y } = lineInfo.startPosition;

      let nextY = 0;

      const step = Math.floor(
        Math.max(colors.length - 1, lineInfo.text.length) /
          Math.min(Math.max(colors.length - 1, 0), lineInfo.text.length)
      );

      for (let charIndex = lineInfo.currentFirstCharIndex; charIndex <= lineInfo.currentLastCharIndex; charIndex++) {
        const char = lineInfo.text[charIndex];
        const colorIndex = charIndex === 0 ? 0 : Math.floor(charIndex / step) + 1;

        nextY = y + (lineInfo.fallingTimes - charIndex) * fontSizeInPixel * lineInfo.speed;

        canvasContext.fillStyle = textColors[Math.min(colorIndex, textColors.length - 1)];
        canvasContext.fillText(char, x, nextY);
      }
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

export default TextMatrix;

'use client';

import React, { useEffect, useRef } from 'react';
import type { CharacterInfoDataType, TextGalaxyPropertyDataType } from '../type/text-galaxy.type';
import DeviceHelper from '../helper/device.helper';
import { MinimalTextLength } from '../constant/common.constant';

const spiralAngle = { slow: -0.002, normal: -0.01, fast: -0.05 };
const colors = ['rgba(166, 213, 119, 1)', 'rgba(67, 128, 50, 1)', 'rgba(1, 68, 33, 0.8)', 'rgba(1, 50, 32, 0.5)'];

const TextGalaxy: React.FC<TextGalaxyPropertyDataType> = (params: TextGalaxyPropertyDataType) => {
  const {
    text,
    spiralSpeed = 'normal',
    font = { sizeInPx: 14, family: 'Arial Black' },
    textColors = colors,
    background = { color: '#081330' },
    size = { width: { value: 100, unit: '%' }, height: { value: 100, unit: '%' } }
  } = params;

  const refreshInterval = 50;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spiralInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  let characterInfos: CharacterInfoDataType[] = [];
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

      spiralInterval.current = setInterval(() => spiralText(), refreshInterval);

      initText();
    }

    return () => {
      removeInterval();
    };
  }, []);

  useEffect(() => initText(), [text]);

  const removeInterval = () => {
    if (spiralInterval.current !== undefined) clearInterval(spiralInterval.current);
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

  const getTextColor = (): string =>
    textColors.length === 1 ? textColors[0] : textColors[Math.floor(Math.random() * 100) % textColors.length];

  const getCanvasContext = () => {
    if (canvasContext) return canvasContext;

    const devicePixelRatio = DeviceHelper.getDevicePixelRatio();
    const canvas = getCanvas();

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

  const getCircleCenterPosition = () => ({
    circleCenterX: canvasClientWidth / 2,
    circleCenterY: canvasClientHeight / 2
  });

  const initText = () => {
    let chars = text.split('');

    while (chars.length < MinimalTextLength) chars = [...chars, ...chars];

    const { circleCenterX } = getCircleCenterPosition();
    const { sizeInPx: fontSizeInPixel } = font;
    const textAreaWidth = Math.min(canvasClientWidth * 0.618, text.length * fontSizeInPixel);
    const lineLength = Math.floor(textAreaWidth / fontSizeInPixel);

    let breakCharacterIndex = 0;
    let lineIndex = 0;
    let indexOffset = 0;
    let maxLineLength = textAreaWidth / fontSizeInPixel;

    const infos: CharacterInfoDataType[] = chars.map((char, index) => {
      if (index - breakCharacterIndex > lineLength) {
        maxLineLength = Math.max(maxLineLength, index - breakCharacterIndex);
        breakCharacterIndex = index;
        lineIndex++;
        indexOffset = char === ' ' ? -1 : 0;
      }

      return {
        value: char,
        position: { x: (index - breakCharacterIndex + indexOffset) * fontSizeInPixel, y: fontSizeInPixel * lineIndex }
      };
    });

    characterInfos = infos.map((info) => ({
      ...info,
      position: {
        ...info.position,
        x: info.position.x + circleCenterX - (maxLineLength * fontSizeInPixel) / 2,
        y: info.position.y + (canvasClientHeight - lineIndex * fontSizeInPixel) / 2
      }
    }));

    const canvasContext = getCanvasContext();

    characterInfos.forEach((text) => {
      canvasContext.fillStyle = getTextColor();
      canvasContext.fillText(text.value, text.position.x, text.position.y);
    });
  };

  const spiralText = () => {
    clearCanvas();

    const canvasContext = getCanvasContext();

    characterInfos.forEach((info) => {
      const { x, y } = getNewPosition(info.position.x, info.position.y);

      canvasContext.fillStyle = getTextColor();
      canvasContext.fillText(info.value, x, y);

      info.position = { x, y };
    });
  };

  const getNewPosition = (x: number, y: number) => {
    const { circleCenterX, circleCenterY } = getCircleCenterPosition();

    let angle = spiralAngle[spiralSpeed];
    let distanceToCenter = 0;

    if (x === circleCenterX && y !== circleCenterY) distanceToCenter = Math.abs(circleCenterY - y);
    else if (y === circleCenterY && x !== circleCenterX) distanceToCenter = Math.abs(circleCenterX - x);
    else
      distanceToCenter = Math.sqrt(Math.pow(Math.abs(circleCenterX - x), 2) + Math.pow(Math.abs(circleCenterY - y), 2));

    angle /= distanceToCenter / 800;

    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const radiusX = x - circleCenterX;
    const radiusY = y - circleCenterY;

    return {
      x: radiusX * cosAngle - radiusY * sinAngle + circleCenterX,
      y: radiusX * sinAngle + radiusY * cosAngle + circleCenterY
    };
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

export default TextGalaxy;

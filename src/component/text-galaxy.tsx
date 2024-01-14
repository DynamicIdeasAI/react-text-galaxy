'use client'

import React, { useEffect, useRef } from 'react'
import { ITextGalaxyProps, ICharacterInfo } from '../type/type'

const spiralAngle = { slow: -0.002, normal: -0.01, fast: -0.05 }

const TextGalaxy: React.FC<ITextGalaxyProps> = (params: ITextGalaxyProps) => {
  const {
    text,
    spiralSpeed = 'normal',
    font = { sizeInPx: 14, color: '#4F6A9B', family: 'Arial Black' },
    background = { color: '#081330' },
    size = { width: { value: 100, unit: '%' }, height: { value: 100, unit: '%' } },
  } = params

  const refreshInterval = 50
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spiralInterval = useRef<NodeJS.Timeout | undefined>(undefined)

  let devicePixelRatio = 1
  let characterInfos: ICharacterInfo[] = []
  let canvasClientHeight = 0
  let canvasClientWidth = 0
  let canvasContext: CanvasRenderingContext2D

  useEffect(() => {
    devicePixelRatio = window.devicePixelRatio

    const canvas = canvasRef.current as HTMLCanvasElement

    const { height: clientHeight, width: clientWidth } = canvas.getBoundingClientRect()

    canvasClientHeight = clientHeight
    canvasClientWidth = clientWidth

    if (canvasClientHeight && canvasClientWidth) {
      removeInterval()

      spiralInterval.current = setInterval(() => spiralText(), refreshInterval)

      initiateText()
    }

    return () => {
      removeInterval()
    }
  }, [])

  useEffect(() => initiateText(), [text])

  const removeInterval = () => {
    if (spiralInterval.current !== undefined) clearInterval(spiralInterval.current)
  }

  const getCanvas = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    canvas.style.height = `${canvasClientHeight}px`
    canvas.style.width = `${canvasClientWidth}px`
    canvas.height = canvasClientHeight * devicePixelRatio
    canvas.width = canvasClientWidth * devicePixelRatio

    return canvas
  }

  const getCanvasContext = () => {
    if (canvasContext) return canvasContext

    const canvas = getCanvas()

    canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D
    canvasContext.scale(devicePixelRatio, devicePixelRatio)

    clearCanvas(canvasContext)

    const { color, sizeInPx: sizeInPixel, family } = font

    canvasContext.fillStyle = color
    canvasContext.font = `${sizeInPixel}px ${family}`

    return canvasContext
  }

  const clearCanvas = (context?: CanvasRenderingContext2D) => {
    const canvasContext = context || getCanvasContext()

    canvasContext.fillStyle = background.color
    canvasContext.fillRect(0, 0, canvasClientWidth, canvasClientHeight)
  }

  const getCircleCenterPosition = () => ({
    circleCenterX: canvasClientWidth / 2,
    circleCenterY: canvasClientHeight / 2,
  })

  const initiateText = () => {
    const chars = text.split('')
    const { circleCenterX } = getCircleCenterPosition()
    const { sizeInPx: fontSizeInPixel } = font
    const textAreaWidth = Math.min(canvasClientWidth * 0.618, text.length * fontSizeInPixel)
    const lineLength = Math.floor(textAreaWidth / fontSizeInPixel)

    let breakCharacterIndex = 0
    let lineIndex = 0
    let indexOffset = 0
    let maxLineLength = textAreaWidth / fontSizeInPixel

    const infos: ICharacterInfo[] = chars.map((char, index) => {
      if (index - breakCharacterIndex > lineLength) {
        maxLineLength = Math.max(maxLineLength, index - breakCharacterIndex)
        breakCharacterIndex = index
        lineIndex++
        indexOffset = char === ' ' ? -1 : 0
      }

      return {
        value: char,
        position: { x: (index - breakCharacterIndex + indexOffset) * fontSizeInPixel, y: fontSizeInPixel * lineIndex },
      }
    })

    characterInfos = infos.map((info) => ({
      ...info,
      position: {
        ...info.position,
        x: info.position.x + circleCenterX - (maxLineLength * fontSizeInPixel) / 2,
        y: info.position.y + (canvasClientHeight - lineIndex * fontSizeInPixel) / 2,
      },
    }))

    const canvasContext = getCanvasContext()

    characterInfos.forEach((text) => {
      canvasContext.fillText(text.value, text.position.x, text.position.y)
    })
  }

  const spiralText = () => {
    clearCanvas()

    const canvasContext = getCanvasContext()
    const { color: fontColor } = font

    characterInfos.forEach((info, index) => {
      const { x, y } = getNewPosition(info.position.x, info.position.y)

      canvasContext.fillStyle = fontColor
      canvasContext.fillText(info.value, x, y)

      const newCharacters = [...characterInfos]

      newCharacters[index] = {
        ...info,
        position: { x, y },
      }

      characterInfos = newCharacters
    })
  }

  const getNewPosition = (x: number, y: number) => {
    const { circleCenterX, circleCenterY } = getCircleCenterPosition()

    let angle = spiralAngle[spiralSpeed]
    let distanceToCenter = 0

    if (x === circleCenterX && y !== circleCenterY) distanceToCenter = Math.abs(circleCenterY - y)
    else if (y === circleCenterY && x !== circleCenterX) distanceToCenter = Math.abs(circleCenterX - x)
    else
      distanceToCenter = Math.sqrt(Math.pow(Math.abs(circleCenterX - x), 2) + Math.pow(Math.abs(circleCenterY - y), 2))

    angle /= distanceToCenter / 800

    const cosAngle = Math.cos(angle)
    const sinAngle = Math.sin(angle)
    const radiusX = x - circleCenterX
    const radiusY = y - circleCenterY

    return {
      x: radiusX * cosAngle - radiusY * sinAngle + circleCenterX,
      y: radiusX * sinAngle + radiusY * cosAngle + circleCenterY,
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size.width.value}${size.width.unit}`,
        height: `${size.height.value}${size.height.unit}`,
      }}
    />
  )
}

export default TextGalaxy

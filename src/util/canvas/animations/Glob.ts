﻿import { type IPolygonOptions, type IAnimation } from '../types';
import { Shapes } from '../util/Shapes';
import { AudioData } from '../util/AudioData';

/**
 * @source
 */
export interface IGlobOptions extends IPolygonOptions {
  count?: number;
  diameter?: number;
  frequencyBand?: 'base' | 'lows' | 'mids' | 'highs';
  mirroredX?: boolean;
}

/**
 * These are the options for the Glob animation [[IGlobOptions]]
 */
export class Glob implements IAnimation {
  private _options: IGlobOptions;

  constructor(options?: IGlobOptions) {
    this._options = options ?? {};
  }

  public draw(audioBufferData: Uint8Array, canvas: CanvasRenderingContext2D): void {
    const { height, width } = canvas.canvas;
    const shapes = new Shapes(canvas);
    const audioData = new AudioData(audioBufferData);
    const centerX = width / 2;
    const centerY = height / 2;
    this._options = {
      count: 100,
      diameter: height / 3,
      frequencyBand: 'mids',
      rounded: true,
      ...this._options,
    };

    if (this._options.frequencyBand) audioData.setFrequencyBand(this._options.frequencyBand);
    audioData.scaleData(Math.min(width, height));

    if (this._options?.mirroredX) {
      let n = 1;
      for (let i = Math.ceil(audioData.data.length / 2); i < audioData.data.length; i++) {
        audioData.data[i] = audioData.data[Math.ceil(audioData.data.length / 2) - n];
        n++;
      }
    }

    const points = [];
    const { count = 100, diameter = height / 3 } = this._options;
    for (let i = 0; i < count; i++) {
      const dataIndex = Math.floor(audioData.data.length / count) * i;
      const dataValue = audioData.data[dataIndex];
      const degrees = 360 / count;
      const newDiameter = diameter + dataValue;

      const x = centerX + (newDiameter / 2) * Math.cos(shapes.toRadians(degrees * i));
      const y = centerY + (newDiameter / 2) * Math.sin(shapes.toRadians(degrees * i));
      points.push({ x, y });
    }

    points.push(points[0]);
    shapes.polygon(points, this._options);
  }
}

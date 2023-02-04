import type { PercentCrop } from 'react-image-crop'

type AspectOption = {
  label: string
  value: number
  crop: PercentCrop
}

export const ASPECT_OPTIONS: AspectOption[] = [
  {
    label: '1:1',
    value: 1 / 1,
    crop: {
      height: 70,
      width: 70,
      x: 15,
      y: 15,
      unit: '%',
    },
  },

  {
    label: '4:5',
    value: 4 / 5,
    crop: {
      height: 100,
      width: 80,
      x: 10,
      y: 0,
      unit: '%',
    },
  },
  {
    label: '16:9',
    value: 16 / 9,
    crop: {
      height: 56.25,
      width: 100,
      x: 0,
      y: 21.875,
      unit: '%',
    },
  },
]

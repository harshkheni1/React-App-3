import { ConfettiProps } from './types';

const COLORS = ['#2ecc71', '#3498db', '#e67e22', '#e67e22', '#e74c3c'];
export const TOP_OFFSET = typeof window === 'undefined' ? 1000 : window?.innerHeight;
export const LEFT_OFFSET = 250;

export const generateWholeNumber = (min: number, max: number) => min + Math.floor(Math.random() * (max - min));
export const generateRandomColor = () => COLORS[generateWholeNumber(0, COLORS.length)];

export const ConfettiDefault: ConfettiProps = {
  isActive: false,
  interval: 5,
  duration: 30,
};

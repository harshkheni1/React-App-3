import { ArrayToType } from '../../../utils';

export const TextareaSizesArray = ['sm', 'md', 'lg'] as const;
export type TextareaSizesType = ArrayToType<typeof TextareaSizesArray>;

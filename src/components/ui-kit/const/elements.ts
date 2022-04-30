// Element size
import { ArrayToType } from '../utils';

export const ElementSizesArray = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export type ElementSizesType = ArrayToType<typeof ElementSizesArray>;

// Element tag
export const ElementTagArray = ['p', 'div', 'span', 'b', 'strong', 'em', 'i'] as const;
export type ElementTagType = ArrayToType<typeof ElementTagArray>;

// Element position
export const ElementPositionArray = ['left', 'center', 'right'] as const;
export type ElementPositionType = ArrayToType<typeof ElementPositionArray>;

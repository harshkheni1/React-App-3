export interface ImageThumbnails {
  lg?: string;
  md?: string;
  sm?: string;
}

export interface Tag {
  id?: string;
  weight?: number;
  name: string;
  type?: string;
  imagesCount?: number;
}

export interface ImageEntity {
  id?: string;
  url: string;
  title: string;
  link: string;
  thumbnails: ImageThumbnails;
  tags?: Tag[];
  status?: string;
}

export type Size = keyof ImageThumbnails;

export interface ImageProps {
  src: string | ImageEntity;
  size?: Size;
  alt?: string;
  className?: string;
  width?: string;
}

export const isImageEntity = (img: any): img is ImageEntity => {
  return !!(img && img.url);
};

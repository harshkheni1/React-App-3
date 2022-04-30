export interface FontFaceTheme {
  fontFamily: string;
  fontFaces: FontFaceItem[];
}

export interface FontFaceItem {
  local: string;
  primarySrc: string;
  secondarySrc: string;
  fontWeight: number;
  fontStyle: string;
}

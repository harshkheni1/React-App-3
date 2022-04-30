import React, { FC, Fragment, useContext } from 'react';
import { WithStyle } from '../../utils';
import { ImgProps } from './types';
import { ImgBlockStyled, ImgWrapStyled, ImgStyled } from './img.styled';
import { ImgContext } from './img-context';

export const ImgWrap: FC<ImgProps> & WithStyle = (props) => {
  const { src, height, placeholder = 'No Image', ...rest } = props;
  const contextProps = useContext(ImgContext);
  return (
    <ImgWrapStyled {...{ height, src }}>
      {src ? <ImgStyled {...rest} src={src} heightContext={contextProps.height} /> : placeholder}
    </ImgWrapStyled>
  );
};

export const ImgBlock: FC<{ children: any }> & WithStyle = ({ children }) => (
  <ImgBlockStyled>{children}</ImgBlockStyled>
);

export const Img: FC<ImgProps> & WithStyle = (props) => {
  const { placeholder, children, ...rest } = props;
  return (
    <ImgContext.Provider value={props}>
      {children ? (
        <ImgBlock>
          {placeholder ? (
            <Fragment>
              <ImgWrap {...rest} />
              {children}
            </Fragment>
          ) : (
            <Fragment>
              <ImgStyled {...rest} />
              {children}
            </Fragment>
          )}
        </ImgBlock>
      ) : placeholder ? (
        <ImgWrap {...rest} />
      ) : (
        <ImgStyled {...rest} />
      )}
    </ImgContext.Provider>
  );
};

Img.defaultProps = {
  bg: 'transparent',
};

Img.displayName = 'Img';
Img.Style = ImgStyled;

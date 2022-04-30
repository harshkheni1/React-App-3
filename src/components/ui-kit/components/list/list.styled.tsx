import { styled, css } from '../../utils';
import { colorHelperStyle, displayHelperStyle, spacingStyle, TextSize } from '../../const';
import { ListItemProps, ListStyledAttrProps } from './types';

export const ListItemStyled = styled('li')<ListItemProps>`
  ${(props) => spacingStyle(props)};
  ${({ display }) => displayHelperStyle(display)}
`;

const listStyleCheck = css`
  position: relative;
  padding-left: 28px;
  &:before {
    width: 19px;
    height: 13px;
    display: block;
    position: absolute;
    content: '';
    left: 0;
    top: 50%;
    margin: -6.5px 0 0;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjkgMjAiIHdpZHRoPSIyOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtOTUuOTYgMzU3LjAxOTg0NS04LjYwODQwNTMtOC41MTM4MDhjLS4xOTYzMzgtLjE5NDE4LS41MTI5MTU2LS4xOTI0MzEtLjcwNzA5Ni4wMDM5MDdzLS4xOTI0MzEzLjUxMjkxNS4wMDM5MDY2LjcwNzA5Nmw4Ljk2IDguODYxNTM4Yy4xOTQ4MDU3LjE5MjY2NS41MDgzODM3LjE5MjY2NS43MDMxODk0IDBsMTcuOTIwMDAwMy0xNy43MjMwNzdjLjE5NjMzOC0uMTk0MTguMTk4MDg3LS41MTA3NTguMDAzOTA2LS43MDcwOTYtLjE5NDE4LS4xOTYzMzgtLjUxMDc1OC0uMTk4MDg3LS43MDcwOTYtLjAwMzkwNnoiIGZpbGw9IiMyMDdjN2IiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04NiAtMzM5KSIvPjwvc3ZnPg==);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const ListStyleStyled = (listStyle) => {
  switch (listStyle) {
    case 'check':
      return listStyleCheck;
    case 'none':
      return css`
        list-style: none;
      `;
    case 'disc':
      return css`
        list-style: disc;
        ${ListItemStyled} {
          display: list-item;
        }
      `;
  }
};

export const ListStyled = styled('ul')<ListStyledAttrProps>`
  ${({ color }) => color && colorHelperStyle(color)}
  ${(props) => spacingStyle(props)}
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  font-size: ${({ measure }) => TextSize[measure]};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? `${letterSpacing}px` : 'normal')};
  ${ListItemStyled} {
    padding: ${({ group }) => (group ? '15px 15px' : '0')};
    ${({ inline }) => inline && 'display: inline-block'};
    ${({ color }) => color && colorHelperStyle(color)};
    ${({ listStyle }) => listStyle && ListStyleStyled(listStyle)}
  }
`;

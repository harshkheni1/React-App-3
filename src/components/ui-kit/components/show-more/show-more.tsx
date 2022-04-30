import React, { FC, useState } from 'react';
import { WithStyle } from '../../utils/types';
import { ShowMoreProps } from './types';
import { ButtonTriggerStyled, ShowMoreStyled } from './show-more.styled';
import { Text } from '../../';

export const ShowMore: FC<ShowMoreProps> & WithStyle = ({ moreTitle, lessTitle, children, truncateSize, ...rest }) => {
  const [isHidden, setIsHidden] = useState(true);

  const isTruncatable = children.toString().length > truncateSize;
  const truncatedString = isTruncatable
    ? `${children.toString().substring(0, truncateSize).trim()}...`
    : children.toString();

  const content = isHidden ? truncatedString : children.toString();

  const buttonTitle = isHidden ? moreTitle : lessTitle;

  return (
    <ShowMoreStyled>
      <Text {...rest}>{content}</Text>
      {isTruncatable && (
        <ButtonTriggerStyled
          variant="link"
          color="primaryDark"
          uppercase={false}
          onClick={() => setIsHidden(!isHidden)}
        >
          {buttonTitle}
        </ButtonTriggerStyled>
      )}
    </ShowMoreStyled>
  );
};

ShowMore.defaultProps = {
  truncateSize: 200,
  moreTitle: 'show more',
  lessTitle: 'show less',
};

ShowMore.displayName = 'ShowMore';
ShowMore.Style = ShowMoreStyled;

import React, { FC } from 'react';
import { WithStyle } from '../../utils';
import { PaginationProps } from './types';
import { PaginationItem } from './item';
import { PaginationLink } from './link';
import { PaginationStyled } from './pagination.styled';
import { Icon } from '../icon';

export const Pagination: FC<PaginationProps> & WithStyle = (props) => {
  const pagePrev = () => props.onChange(props.page - 1);
  const pageNext = () => props.onChange(props.page + 1);

  const pages = () => {
    const [total, current] = [props.totalPages, props.page];
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let index = 1; index <= total; index++) {
      if ((index === 1 || index === total || index >= current - 2) && index < current + 3) {
        range.push(index);
      } else if (index === total && index >= current + 3) {
        range.push(index);
      }
    }

    for (const index of range) {
      if (l) {
        if (index - l === 2 || index - l !== 1) {
          rangeWithDots.push(
            <PaginationItem disabled key={index - 1}>
              ...
            </PaginationItem>,
          );
        }
      }
      rangeWithDots.push(
        <PaginationItem key={index}>
          <PaginationLink onClick={() => props.onChange(index)} active={index === current}>
            {index}
          </PaginationLink>
        </PaginationItem>,
      );
      l = index;
    }

    return rangeWithDots.map((item) => item);
  };
  return (
    <PaginationStyled>
      <PaginationItem>
        <PaginationLink onClick={pagePrev} bordered={true} disabled={props.page === 1}>
          <Icon name="angle-thin-left" measure={16} />
        </PaginationLink>
      </PaginationItem>
      {pages()}
      <PaginationItem>
        <PaginationLink onClick={pageNext} bordered disabled={props.page === props.totalPages}>
          <Icon name="angle-thin-right" measure={16} />
        </PaginationLink>
      </PaginationItem>
    </PaginationStyled>
  );
};

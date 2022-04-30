import { HtmlProps } from '../../utils';

export interface PaginationProps extends Omit<HtmlProps<HTMLUListElement>, 'onChange'> {
  page: number;
  perPage?: number;
  total: number;
  totalPages: number;
  hasMore?: boolean;
  onChange?: (page: number) => void;
}

export interface PaginationItemProps extends HtmlProps<HTMLLIElement> {
  key?: number;
}

export interface PaginationLinkProps extends Omit<HtmlProps<HTMLButtonElement>, 'type'> {
  active?: boolean;
  bordered?: boolean;
}

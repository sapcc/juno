import React from 'react';
import { Pagination } from './index.js';

export default {
  title: 'WiP/Pagination',
  component: Pagination,
  argTypes: {
    variant: {
      options: ['"" (default)', 'number', 'select', 'input'],
      control: { type: 'select' },
    },
  },
};

const Template = ({ currentPage, pages, ...args }) => {
  const [page, setPage] = React.useState(currentPage);
  const prev = React.useCallback(() => setPage(page > 1 ? page - 1 : 1), [page]);
  const next = React.useCallback(() => setPage(!pages || page < pages ? page + 1 : pages), [page]);

  return (
    <Pagination
      {...args}
      pages={pages}
      currentPage={page}
      onPressPrevious={prev}
      onPressNext={next}
      onPressNext={next}
    />
  );
};

export const Default = {
  render: Template,
  args: {},
};

export const PaginationWithNumber = {
  render: Template,

  args: {
    variant: 'number',
    currentPage: 3,
  },
};

export const PaginationWithSelect = {
  render: Template,

  args: {
    variant: 'select',
    currentPage: 2,
    pages: 6,
  },
};

export const PaginationWithInput = {
  render: Template,

  args: {
    variant: 'input',
    currentPage: 3,
    pages: 6,
  },
};

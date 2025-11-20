type PaginationProps = {
  page: number;
  perPage: number;
  total: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, perPage, total, onChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <button className="btn btn--ghost" disabled={!canPrev} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        <button className="btn btn--ghost" disabled={!canNext} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
      <div className="pagination__info">
        Page {page} of {totalPages} • {total} total items
      </div>
    </div>
  );
}

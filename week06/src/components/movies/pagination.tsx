const pageButton = "grid size-[30px] place-items-center rounded-[5px] text-xs text-[#777f89] transition hover:bg-[#e9edf4] focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const pages = Array.from({ length: Math.min(5, totalPages - startPage + 1) }, (_, index) => startPage + index);

  return (
    <nav className="flex items-center justify-center gap-1 py-7 pb-[42px]" aria-label="페이지 선택">
      <button className={pageButton} aria-label="이전 페이지" disabled={page <= 1} type="button" onClick={() => onPageChange(page - 1)}><img className="size-4" src="/icons/movie-icons/chevron-left.svg" alt="" /></button>
      {pages.map((pageNumber) => (
        <button className={pageButton + (pageNumber === page ? " bg-[#316fe8] font-semibold text-white hover:bg-blue-700" : "")} key={pageNumber} aria-current={pageNumber === page ? "page" : undefined} type="button" onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
      ))}
      <button className={pageButton} aria-label="다음 페이지" disabled={page >= totalPages} type="button" onClick={() => onPageChange(page + 1)}><img className="size-4" src="/icons/movie-icons/chevron-right.svg" alt="" /></button>
    </nav>
  );
}

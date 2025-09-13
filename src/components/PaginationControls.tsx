"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  hasNextPage: boolean;
}

export function PaginationControls({ page, hasNextPage }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination className="text-white">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) {
                handlePageChange(page - 1);
              }
            }}
            className={page <= 1 ? "pointer-events-none text-gray-500" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (hasNextPage) {
                handlePageChange(page + 1);
              }
            }}
            className={!hasNextPage ? "pointer-events-none text-gray-500" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

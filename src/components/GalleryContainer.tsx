"use client";

import { PaginationControls } from "./PaginationControls";

export default function GalleryContainer() {
  return (
    <div>
      <PaginationControls
        page={1}
        setPage={(page) => console.log("Set page to:", page)}
        hasNextPage={true}
      />
    </div>
  );
}

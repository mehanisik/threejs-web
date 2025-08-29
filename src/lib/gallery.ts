export function getGalleryGridClass(imagesCount: number): string {
  if (imagesCount === 1) return "grid-cols-1 max-w-5xl mx-auto";
  if (imagesCount === 2) return "grid-cols-1 sm:grid-cols-2";
  if (imagesCount === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (imagesCount === 4) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
  if (imagesCount <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
}

export function getGalleryItemLayout(
  index: number,
  total: number,
): { spanClass: string; aspectRatio: string } {
  const spanClass = (() => {
    if (total === 4 && index === 0) return "sm:col-span-2 xl:col-span-2";
    if (total === 5 && index === 0) return "sm:col-span-2 lg:col-span-2";
    if (total === 6 && (index === 0 || index === 1))
      return "sm:col-span-1 lg:col-span-1";
    if (total >= 7 && index === 0)
      return "sm:col-span-2 md:col-span-2 lg:col-span-2";
    if (total >= 9 && index === 1) return "md:col-span-1 lg:col-span-2";
    return "";
  })();

  const aspectRatio = (() => {
    if (total === 1) return "16/10";
    if (total === 2) return "4/3";
    if (total >= 7 && index === 0) return "16/10";
    if (total >= 9 && index === 1) return "16/10";
    return "4/3";
  })();

  return { spanClass, aspectRatio };
}

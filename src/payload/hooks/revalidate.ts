import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

export const revalidateCollection = (path: string): CollectionAfterChangeHook => {
  return async ({ doc }) => {
    try {
      revalidatePath(path);
      if (doc?.slug) {
        revalidatePath(`${path}/${doc.slug}`);
      }
    } catch {
      // Revalidation may safely fail when running outside Next.js request context (e.g. CLI seed script)
    }
    return doc;
  };
};

export const revalidateCollectionDelete = (path: string): CollectionAfterDeleteHook => {
  return async ({ doc }) => {
    try {
      revalidatePath(path);
      if (doc?.slug) {
        revalidatePath(`${path}/${doc.slug}`);
      }
    } catch {
      // Safe fallback
    }
    return doc;
  };
};

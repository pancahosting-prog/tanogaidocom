export async function triggerRevalidation(
  paths: string[],
  options?: { layout?: boolean }
): Promise<void> {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache');
    for (const p of paths) {
      revalidatePath(p);
    }
    if (options?.layout) {
      revalidatePath('/', 'layout');
    }
    revalidateTag('tanogaido-cms');
  } catch {
    // No-op when executed outside Next.js request/runtime context (e.g. CLI seed)
  }
}

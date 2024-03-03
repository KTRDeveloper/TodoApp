export const getNormalizedPaginationOptions = (options: any) => {
  return {
    options: {
      virtuals: true,
      ...(options?.options ?? {}),
    },
    lean: { virtuals: true },
    leanWithId: false,
    ...options,
  };
};

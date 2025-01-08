function groupBy<T>(array: T[], key: string) {
  return array.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] ?? []), item],
    }),
    {},
  );
}

export { groupBy };

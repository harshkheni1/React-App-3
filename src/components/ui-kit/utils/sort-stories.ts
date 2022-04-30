const position = (item: string, array: string[] = []) => {
  const index = array.indexOf(item);
  // Show unsorted items at the bottom.
  return index === -1 ? 10000 : index;
};

const splitStoryName = (name: string) => {
  return name.split('/');
};

export const sortStories = (sortOrder: { [index: string]: any }) => {
  const groups = Object.keys(sortOrder);

  return (a: { [index: number]: any }, b: { [index: number]: any }) => {
    const aKind = a[1].kind;
    const bKind = b[1].kind;
    const [aGroup, aComponent] = splitStoryName(aKind);
    const [bGroup, bComponent] = splitStoryName(bKind);

    // Preserve story sort order.
    if (aKind === bKind) {
      return 0;
    }

    // Sort stories in a group.
    if (aGroup === bGroup) {
      const group = sortOrder[aGroup];

      return position(aComponent, group) - position(bComponent, group);
    }

    // Sort groups.
    return position(aGroup, groups) - position(bGroup, groups);
  };
};

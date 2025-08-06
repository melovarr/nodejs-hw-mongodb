const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
};

const parseFavourite = (isFavourite) => {
  if (isFavourite ==='true')return true;
  if(isFavourite ==='false')return false;
  return undefined;
  // const isString = typeof isFavourite === 'string';
  // if (!isString) return;
  // const favourite = (isFavourite) => ['true', 'false'].includes(isFavourite);

  // if (favourite(isFavourite)) return Boolean(isFavourite);
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
   contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};

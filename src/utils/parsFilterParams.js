const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
};

const parseFavorite = (isFavorite) => {
  const isString = typeof isFavorite === 'string';
  if (!isString) return;
  const favorite = (isFavorite) => ['true', 'false'].includes(isFavorite);

  if (favorite(isFavorite)) return isFavorite;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavorite } = query;

  const parsedType = parseType(contactType);
  const parsedFavorite = parseFavorite(isFavorite);

  return {
    contactType: parsedType,
    isFavorite: parsedFavorite,
  };
};

import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filterConfig = { userId };
  if (filter.contactType) {
    filterConfig.contactType = filter.contactType;
  }
  if (typeof filter.isFavourite === 'boolean') {
    filterConfig.isFavourite = filter.isFavourite;
  }

  const contactsQuery = ContactsCollection.find(filterConfig);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(filterConfig),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, userId, options = {}) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, ...options }
  );
  if (!contact) return null;
  return {
    contact,
    isNew: false,
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

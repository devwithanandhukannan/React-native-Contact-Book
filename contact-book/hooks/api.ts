import Config from '../constants/Config';

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  _id?: string; // MongoDB ID
}

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await fetch(`${Config.API_URL}/contacts`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('API Error (fetchContacts):', error);
    throw error;
  }
};

export const createContactApi = async (contact: Contact) => {
  try {
    const response = await fetch(`${Config.API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error (createContact):', error);
    throw error;
  }
};

export const updateContactApi = async (id: string, contact: Contact) => {
  try {
    const response = await fetch(`${Config.API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error (updateContact):', error);
    throw error;
  }
};

export const deleteContactApi = async (id: string) => {
  try {
    const response = await fetch(`${Config.API_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('API Error (deleteContact):', error);
    throw error;
  }
};

import { openDB } from 'idb';

// intitialize IndexDB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created in IndexedDB');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ content: content });
  const result = await request;
  console.log('Data saved. Save IndexedDB ID:', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Loading last save from IndexedDB:', result[result.length - 1]);
  return result;
}

initdb();

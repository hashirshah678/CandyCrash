import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'user_storage',
  encryptionKey: 'my_encryption_key',
});

export const mmkvStorage = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    let value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

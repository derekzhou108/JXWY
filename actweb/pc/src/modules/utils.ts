export function setStorage(key: string, val: object) {
  window.sessionStorage.setItem(key, JSON.stringify(val));
}

export function getStorage(key: string) {
  if (!window.sessionStorage.getItem(key)) {
    return null;
  } else {
    return JSON.parse(window.sessionStorage.getItem(key) as string);
  }
}

export function removeStorage(key: string) {
  window.sessionStorage.removeItem(key);
}

export function clearStorage() {
  window.sessionStorage.clear();
}

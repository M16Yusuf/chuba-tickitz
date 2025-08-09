import { useEffect, useState } from "react";

/**
 * custom hook untuk local storage
 * @param {string} key 
 * @param {any (() => {any})} initialValue 
 * @returns {[value, setValue]}
 */
function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem(key);
    if (valueFromLocalStorage !== null) {
      return JSON.parse(valueFromLocalStorage);
    }
    if (typeof initialValue === "function") { // jika initialValue 
      return initialValue(); // maka jalankan fungsi
    }
    return initialValue;
  });
  // simpan tiap perubahan "value" ke localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  // kembalikan value
  return [value, setValue];
}

export default useLocalStorage;
import { db } from "@/lib/firebase";
import { ref, child, get } from "firebase/database";

export const getPsychologists = async () => {
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, "/"));

    if (snapshot.exists()) {
      const data = snapshot.val();
      
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return Object.entries(data).map(([key, value]) => ({
          ...(value as object),
          id: key, 
        }));
      }

      if (Array.isArray(data)) {
        return data
          .map((item, index) => (item ? { ...item, id: item.id || String(index) } : null))
          .filter(Boolean);
      }

      return [];
    } else {
      console.log("Дані в базі порожні");
      return [];
    }
  } catch (error) {
    console.error("Помилка при отриманні даних з Firebase:", error);
    return [];
  }
};
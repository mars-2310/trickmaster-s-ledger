import { useState, useEffect } from "react";

export function useAutosave<T>(
  data: T,
  onSave: (data: T) => Promise<void>,
  delay = 1500
) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!data) return;
    setIsSaved(false);
    const timer = setTimeout(async () => {
      setIsSaving(true);
      try {
        await onSave(data);
        setIsSaved(true);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [JSON.stringify(data)]);

  return { isSaving, isSaved };
}
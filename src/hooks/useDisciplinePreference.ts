"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_DISCIPLINE, isDiscipline, type Discipline } from "@/data/disciplines";

const STORAGE_KEY = "turnlab_discipline";
const DISCIPLINE_EVENT = "turnlab:discipline-change";

function loadDisciplinePreference(): Discipline {
  if (typeof window === "undefined") {
    return DEFAULT_DISCIPLINE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isDiscipline(raw) ? raw : DEFAULT_DISCIPLINE;
  } catch {
    return DEFAULT_DISCIPLINE;
  }
}

function saveDisciplinePreference(discipline: Discipline) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, discipline);
    window.dispatchEvent(new Event(DISCIPLINE_EVENT));
  } catch {}
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleDisciplineChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(DISCIPLINE_EVENT, handleDisciplineChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(DISCIPLINE_EVENT, handleDisciplineChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useDisciplinePreference() {
  const discipline = useSyncExternalStore(
    subscribe,
    loadDisciplinePreference,
    () => DEFAULT_DISCIPLINE,
  );

  const setDiscipline = useCallback((nextDiscipline: Discipline) => {
    saveDisciplinePreference(nextDiscipline);
  }, []);

  return { discipline, setDiscipline };
}

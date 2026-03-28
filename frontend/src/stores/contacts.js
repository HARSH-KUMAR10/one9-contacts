import { writable } from "svelte/store";

export const contacts = writable([]);
export const currentContact = writable(null);
export const loading = writable(false);
export const error = writable(null);
export const success = writable(null);

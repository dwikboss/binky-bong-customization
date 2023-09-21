import { defineStore } from 'pinia'

export const useEditModeStore = defineStore('editMode', {
    state: () => ({
        editMode: false as boolean,
    }),

    actions: {
        toggleMode() {
            this.editMode = !this.editMode;
        },
        isEditMode() {
            return this.editMode;
        }
    }
});
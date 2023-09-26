import { defineStore } from 'pinia'

export const useEditModeStore = defineStore('editMode', {
    state: () => ({
        editMode: false as boolean,
        leftEyeEdit: false as boolean,
        rightEyeEdit: false as boolean,
    }),
    getters: {
        isEditMode(): boolean {
            return this.editMode;
        },
        isLeftEye(): boolean {
            return this.leftEyeEdit;
        },
        isRightEye(): boolean {
            return this.rightEyeEdit;
        },
    },
    actions: {
        toggleMode() {
            this.editMode = !this.editMode;
        },
        toggleLeftEye() {
            this.leftEyeEdit = !this.leftEyeEdit;
        },
        toggleRightEye() {
            this.rightEyeEdit = !this.rightEyeEdit;
        },
    }
});
import { defineStore } from 'pinia'

export const useEditModeStore = defineStore('editMode', {
    state: () => ({
        editMode: false as boolean,
        leftEyeEdit: false as boolean,
        rightEyeEdit: false as boolean,
        eyeModelL: './src/assets/models/eyes/default-eye.glb' as string,
        eyeModelR: './src/assets/models/eyes/default-eye.glb' as string,
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
        selectedEyeModelL(): string {
            return this.eyeModelL;
        },
        selectedEyeModelR(): string {
            return this.eyeModelR;
        },
    },
    actions: {
        changeLeftEye(model: string) {
            this.eyeModelL = model;
        },
        changeRightEye(model: string) {
            this.eyeModelR = model;
        },
        toggleMode() {
            this.editMode = !this.editMode;
        },
        toggleEye(eye: string) {
            if (eye === "left") {
                this.leftEyeEdit = !this.leftEyeEdit;  
            } else if (eye === "right") {
                this.rightEyeEdit = !this.rightEyeEdit;
            } else {
                this.leftEyeEdit = false;
                this.rightEyeEdit = false;
            }
        }
    }
});
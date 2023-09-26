<template>
    <div class="eye-toggle">
      <div class="toggle-btn left" @click="toggleEye('left')" :class="{ active: eyeState === 'left' }">LEFT</div>
      <div class="toggle-btn right" @click="toggleEye('right')" :class="{ active: eyeState === 'right' }">RIGHT</div>
    </div>
    <div class="badge-container">
        <div class="default-holder badge" @click="selectEyeModel('./src/assets/models/eyes/default-eye.glb')">DEF</div>
        <div class="min-holder badge" @click="selectEyeModel('./src/assets/models/eyes/min-eye.glb')">MIN</div>
        <div class="star-holder badge" @click="selectEyeModel('./src/assets/models/eyes/star-eye.glb')">STR</div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useEditModeStore } from '../store/editMode';
  
export default defineComponent({
    name: 'EyeControl',
    setup() {
        const editModeStore = useEditModeStore();
  
        const toggleEye = (eye: 'left' | 'right') => {
            if (editModeStore.isEditMode) {
                editModeStore.toggleEye(eye);
            }
        };
  
        const selectEyeModel = (model: string) => {
            if (editModeStore.isEditMode) {
                const activeEye = editModeStore.activeEye;
                if (activeEye === 'left' || activeEye === 'right') {
                    editModeStore.changeEyeModel(activeEye, model);
                }
            }
        };
  
        return {
            toggleEye,
            selectEyeModel,
        };
    },
});
</script>
  
  <style lang="scss">
  /* Add your styling here */
  </style>
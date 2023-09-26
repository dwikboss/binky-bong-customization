<template>
    <div class="eye-toggle">
        <div class="toggle-btn left" @click="toggleEye" :class="{ active: eyeActive }">{{ eye.eye }}</div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useEditModeStore } from '../store/editMode';
  
export default defineComponent({
    name: 'EyeControl',
    setup (eye) {
        const eyeActive = ref(false);

        const toggleEye = () => {
            const editModeStore = useEditModeStore();
            if (editModeStore.isEditMode) {
                editModeStore.toggleEye(eye.eye!);
            }
            eyeActive.value = !eyeActive.value;
        }

        return {
            toggleEye,
            eye,
            eyeActive
        }
    },
    props: {
        eye: String
    },
});
</script>
  
<style lang="scss">
.eye-toggle {
    display: flex;
    gap: 10px;

    .toggle-btn {
        text-transform: uppercase;
        width: 75px;
        background-color: #ffffff;
        border: 1px solid #7E93BA;
        height: 100%;
        border-radius: 999px;
        color: #7E93BA;
        font-weight: 700;
    }

    .toggle-btn.active {
        background-color: #7E93BA;
        color: white;
    }
}
</style>
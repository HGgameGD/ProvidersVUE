<template>
  <div class="field">
    <label :for="id" class="field-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="update($event.target.value)"
      class="field-input"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

function update(value) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.field {
  margin-bottom: 14px;
}

.field-label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  color: #2c3e50;
}

.field-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #aacbea;
  border-radius: 6px;
  font-size: 15px;
}
</style>
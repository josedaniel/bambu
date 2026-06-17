<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "danger" | "glass";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: any; // Lucide icon component
  iconPosition?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  iconPosition: "left",
});

const buttonClass = computed(() => {
  const baseClasses =
    "group inline-flex items-center justify-center font-sans font-semibold rounded-md transition-all duration-300 ease-in-out relative overflow-hidden no-underline whitespace-nowrap select-none";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-[10px]",
    lg: "px-8 py-4 text-lg gap-3",
  }[props.size];

  const variantClasses = {
    primary:
      "bg-gradient-to-br from-primary to-secondary text-[#0b0c10] shadow-[0_0_15px_rgba(102,252,241,0.2)] hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_0_25px_rgba(102,252,241,0.4)] hover:enabled:from-primary-hover hover:enabled:to-secondary-hover active:enabled:translate-y-0",
    secondary:
      "bg-bg-secondary text-text-primary border border-border-color hover:enabled:border-primary hover:enabled:shadow-[0_0_10px_rgba(102,252,241,0.1)] hover:enabled:-translate-y-0.5 active:enabled:translate-y-0",
    glass:
      "bg-glass-bg border border-glass-border backdrop-blur-md text-text-primary shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:enabled:bg-[rgba(31,40,51,0.6)] hover:enabled:border-primary hover:enabled:-translate-y-0.5 active:enabled:translate-y-0",
    danger:
      "bg-gradient-to-br from-[#c3073f] to-[#950740] text-text-primary hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_0_15px_rgba(195,7,63,0.4)] active:enabled:translate-y-0",
  }[props.variant];

  const stateClasses =
    props.disabled || props.loading
      ? "opacity-60 cursor-not-allowed pointer-events-none !transform-none !shadow-none"
      : "";

  return [baseClasses, sizeClasses, variantClasses, stateClasses];
});
</script>

<template>
  <button :class="buttonClass" :disabled="disabled || loading">
    <!-- Loading spinner -->
    <span
      v-if="loading"
      class="w-[1.25em] h-[1.25em] border-2 border-current border-b-transparent rounded-full inline-block box-border animate-spin"
    ></span>

    <!-- Left Icon -->
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left' && !loading"
      class="w-[1.25em] h-[1.25em] stroke-[2px] transition-all duration-200 ease-in-out group-hover:enabled:-translate-x-[2px]"
    />

    <!-- Slot Content -->
    <span class="btn-text">
      <slot></slot>
    </span>

    <!-- Right Icon -->
    <component
      :is="icon"
      v-if="icon && iconPosition === 'right' && !loading"
      class="w-[1.25em] h-[1.25em] stroke-[2px] transition-all duration-200 ease-in-out group-hover:enabled:translate-x-[2px]"
    />
  </button>
</template>

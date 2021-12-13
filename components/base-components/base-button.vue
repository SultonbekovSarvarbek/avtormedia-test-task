<template>
  <button class="base-btn" :disabled="disabled" :type="type" @click="callback($event)">
    {{ name }}
    <slot v-if="!!$slots.icon" name="icon" />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    callback(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss">
.base-btn{
    padding: 14px 48px;
    font-size: 1.13rem;
    color:#fff;
    background: #FF008A;
    border-radius: 5px;
    font-weight: 300;
}
</style>

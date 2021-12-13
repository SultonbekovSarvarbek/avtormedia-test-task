<template>
  <div class="base-input">
    <label v-if="!noLabel" :for="id" class="base-input__label">{{ label }}</label>
    <div class="base-input__wrapper">
      <input :id="id" :type="type" :class="!!$slots.icon ? 'has_icon' : false" :placeholder="placeholder" autocomplete="on" :name="name" :value="value" :disabled="disabled" class="base-input__input" @input="$emit('input', $event.target.value)">
      <slot v-if="!!$slots.icon" name="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    noLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    name() {
      return this.label.toLowerCase() ? this.label : ''
    }
  }
}
</script>
<style lang="scss">
.base-input{
    position: relative;
    &__label{
        margin-bottom: 3px;
        font-size: 12px;
        color:#B8B8B8;
    }
    &__input{
        background: rgba(60, 60, 67, 0.1);
        border-radius: 10px;
        padding: 14px 8px;
        -webkit-padding-start:14px 8px;
        -webkit-appearance: textfield;
        font-size: 17px;
        display: block;
        width: 100%;
    }
    &-error{
        margin-top: 12px;
        color:#E64646;
        font-size: 12px;
    }
    .has_icon{
        padding-left: 36px;
    }
}
.field-icon-block{
        padding: 14px 8px;
        display:block;
        position: absolute;
        left: 1px;
        top: 1px;
}
.base-input__wrapper{
    position: relative;
}
</style>

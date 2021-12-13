<template>
  <footer class="footer">
      <div class="container">
      <p class="footer__copyright">{{currentYear}} copyright all rights reserved</p>
      </div>
  </footer>
</template>

<script>
export default {
    name:'AppFooter',
    data(){
        return {
            currentYear: new Date().getFullYear()
        }
    }
}
</script>
<style lang="scss">
.footer{
    padding: 30px 0;
    border-top: 1px solid #E8E8E8;
    &__copyright{
        font-size: 16px;
    }
}
</style>
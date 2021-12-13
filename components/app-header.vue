<template>
  <header class="header">
      <div class="container header-items">
          <div class="header-item">
            <nuxt-link class="header-item__logo" to="/">Logo</nuxt-link>
            <nuxt-link class="header-item__logo mobile-posts" to="/">Посты</nuxt-link>
        </div>
        <div class="header-action-items"> 
      <div class="header-item header-search-item">
                <base-input v-bind="$attrs" id="search-post" :value="post_name" :no-label="true" placeholder="Поиск" @input="debounceInput">
                  <template #icon>
                    <span class="field-icon-block search-icon">
                        <img src="/icons/search-icon.svg" alt="input-icon">    
                    </span>
                  </template>
                </base-input>
              </div>
      <div class="header-item header-posts-link">
          <nuxt-link class="header-all-posts" to="/">
            <img class="header-all-posts__icon" src="/icons/posts-icon.svg" alt="all-posts-icon">
          <span class="header-all-posts__text">
              Посты
          </span>
          </nuxt-link>
      </div>
      </div>
      </div>
  </header>
</template>

<script>
import {mapActions} from 'vuex'
import { debounce } from "debounce";
import BaseInput from './base-components/base-input.vue'
export default {
    name:'AppHeader',
    components:{
        BaseInput
    },
    data(){
        return{
            post_name:""
        }
    },
    methods:{ 
        ...mapActions('posts',['getAllPosts']),
        debounceInput: debounce(function (text) {
                this.getAllPosts({q:text})
            }, 800),
    }
}
</script>

<style lang="scss">
.header{
    &-items{
        display: flex;
        align-items: center;
        padding-top: 24px;
        padding-bottom: 24px;
        @media (max-width: 600px) {
            display: grid;
            padding-bottom: 8px;
        }
    }
    &-action-items{
        display: flex;
        align-items: center;
        gap: 92px;
        margin-left: auto;
        @media (max-width: 600px) {
            display: grid;
            gap: 0;
            margin: 0;
        }
    }
    &-item{ 
        .base-input__input{
            width: 309px;
             @media (max-width: 600px) {
                width: 100%;
                padding-top: 7px;
                padding-bottom: 7px;
                }
        }
        .field-icon-block{
             @media (max-width: 600px) {
                padding-top: 7px;
                padding-bottom: 7px;
                }
        }
        &__logo{
            font-weight: 700;
              @media (max-width: 600px) {
                display: none;
                }
        }
    }
    &-all-posts{
        display: flex;
        align-items: center;
        gap: 9px;
        &__text{
            color:$text-primary;
            font-weight: 500;
        }
    }
    .header-posts-link{
        display: block;
         @media (max-width: 600px) {
            display: none;
        }
    }
    .mobile-posts{
        display: none;
        font-weight: 700;
            font-size: 32px;
            margin-bottom: 18px;
         @media (max-width: 600px) {
            display: block;
        }
    }
}
</style>
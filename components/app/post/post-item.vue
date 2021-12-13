<template>
  <div class="post-item">
      <div class="post-item__image">
       <picture class="post-item__picture">
        <source media="(max-width: 375px)" srcset="mobile-post-image.jpg">
        <img src="/post-image.jpg" alt="post-image">
        </picture>
      </div>
        <div class="post-item__body">
      <div class="post-item__info">
          <h2 class="post-item__title">{{ post.title |truncate(20, '...') }}</h2>
        <p class="post-item__body-text">{{ post.body |truncate(50, '...') }}</p>
      </div>
    
      <div class="post-item__bottom">
          <span class="post-item__bottom-comment all-comments" >
              <nuxt-link class="all-comments__link" :to="`/post/${post.id}`" > 
                <img class="all-comments__icon" src="/icons/comment.svg" alt="comment-icon">
                <span class="all-comments__count">12</span>
              </nuxt-link>
          </span>
          <nuxt-link class="post-item__bottom-edit" :to="`/post/${post.id}`">
            <img src="/icons/pencil-create-black.svg" alt="edit-icon">
          </nuxt-link>
          </div>
    </div>
  </div>

</template>

<script>
export default {
    name:"PostItem",
    filters: {
        truncate (text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    },
    props:{
        post:{
            type:Object,
            default:()=>{}
        }
    }
}
</script>

<style lang="scss">
.post-item{
    display:flex;
    flex-direction: column;
    border: 1px solid #E2E2E2;
    border-radius: 20px;
    overflow: auto;
    @media (max-width: 600px) {
            border:0;
            border-bottom:1px solid #E2E2E2;
            border-radius: 0;
        }
        @media (max-width: 425px) {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            grid-auto-flow: dense;
            
        }
        @media (max-width: 375px) {
         padding: 16px 0; 
        }
    &__body{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 16px 16px 8px 16px;
        @media (max-width: 425px) {
         padding: 0;
         order:-1;   
        }
    }
    &__title{
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 1.8rem;
    }
    &__info{
        padding-bottom: 16px;
    }
    &__body-text{
        font-size: 17px;
        color:$text-secondary;
        font-weight: 400;
        line-height: 1.4rem;
    }
    &__bottom{
        display: flex;
        align-items: center;
        margin-top: auto;
        gap: 30px;
    }
    &__bottom-comment{
        display: flex;
    }
    &__bottom-comment a{
        display: flex;
        align-items: center;
    }
     &__bottom .all-comments__link{
         display: flex;
         gap: 12px;
         color:$text-secondary;
    }
    &__picture{
        display: block;
    }
    &__image{
         @media (max-width: 375px) {
            display: flex;
            align-self: flex-end;
        }
    }
}
</style>
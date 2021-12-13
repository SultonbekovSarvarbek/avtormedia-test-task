<template>
    <div class="post-comment">
        <div class="post-comment__img">
        <img src="/icons/avatar.svg" alt="avatar">
        </div>
        <div class="post-comment__content">
             <h4 class="post-comment__author">{{comment.name}}</h4>
             <p class="post-comment__message">{{comment.body}}</p>        
        </div>
    </div>                
</template>

<script>
export default {
    name:"PostComments",
    props:{
        comment:{
            type:Object,
            default:()=>{}
        }
    }
}
</script>

<style lang="scss">
.post-comment{
    display: flex;
    align-items: flex-start;
    gap:12px;
    &__content{
        display: grid;
        gap: 10px;
    }
    &__img{
        min-width: 36px;
    }
    &__author{
        font-weight: 600;
        font-size: 18px;
    }
    &__message{
        font-size: 18px;
        color:$text-secondary;
    }
}
</style>
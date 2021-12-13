<template>
  <div class="single-post">
      <div class="container">
          <div class="mobile-single-post"> 
              <div class="mobile-single-post__back">
                  <!-- router.go(-1) go back by one record == '/' almost -->
              <button class="mobile-single-post__go-back" @click="$router.go(-1)">Назад</button>
              </div>
            <h5 class="mobile-single-post__name">Пост</h5>
          </div>
          <div class="single-post__wrapper">
          <div class="single-post__preview-img">
                <picture>
                <source media="(max-width: 375px)" srcset="/mobile-post-preview.jpg">
                <img src="/post-main-image.jpg" alt="post-main-image">
                </picture>
          </div>
          <div class="single-post__body">
              <h2 class="single-post__title">{{post.title}}</h2>
              <hr class="single-post__hr">
              
              <form @submit.prevent="updatePostBodyHandler">
              <textarea id="post-comment" ref="textarea" :value="post.body" :disabled="allowEditComment" class="single-post__text-post" name="post-comment" @input="updateComment"/>
              <span v-if="allowEditComment" class="post-edit" @click="editPostTextHandle"> <img class="post-edit__icon" src="/icons/pencil-create.svg" alt="edit-pencil"><span> Редактировать текст</span></span>
              <div v-if="!allowEditComment">
                  <base-button v-bind="$attrs" type="submit" class="base-btn" name="Сохранить изменения" />
                  <base-button v-bind="$attrs" name="Отменить" class="base-btn single-post__cancel-btn" @click="allowEditComment = true" />
              </div>
              </form>
              <div class="single-post__comments">
                  <h2 class="single-post__comment-heading">Комментарии</h2>
                  <div class="single-post__comments-items">
                  <post-comments v-for="post_comment in post_comments" :key="post_comment.id" :comment="post_comment" />
                  </div>
              </div>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import {mapActions,mapState,mapMutations} from 'vuex';
import PostComments from '../../components/app/post/iu/post-comments.vue';
import BaseButton from '../../components/base-components/base-button.vue'
export default {
    name:"SinglePost",
    components:{
        BaseButton,
        PostComments  
    },
    async asyncData({store,params}){
        // params - router params id 
        await store.dispatch('posts/getPost',params.id)
        await store.dispatch('posts/getPostComments',params.id)
    },
    data(){
        return{
            currentPostId:this.$route.params.id,
            allowEditComment:true
        }
    },
     computed:{
        ...mapState('posts',['post','post_comments'])
    },
    methods:{
        ...mapActions('posts',['updatePostBody']),
        ...mapMutations('posts',['SET_NEW_POST_COMMENT']),
        editPostTextHandle(){
            this.allowEditComment = !this.allowEditComment
            // set focus to textarea
            this.$nextTick(()=>{
                this.$refs.textarea.focus()
            })
        },
        updateComment(e){
            this.SET_NEW_POST_COMMENT(e.target.value)
        },
        async updatePostBodyHandler(){
            await this.updatePostBody(this.post)
            this.allowEditComment = true
        },
    },
    
}   
</script>

<style lang="scss">
.single-post{
    &__comments{
        margin: 30px 0;
        display: grid;
        gap: 38px;
    }
    &__text-post{
        min-height: 100px;
        &:disabled{
            background: #fff;
        }
    }
    &__cancel-btn{
        background: #fff;
        border:1px solid $text-primary;
        color:$text-primary;
    }
    &__comments-items{
        display: grid;
        gap: 20px;
    }
    .post-edit{
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        color:$text-primary;
    }
    .post-edit__icon{
        margin-right: 20px;
    }
    &__wrapper{
        display: grid;
        gap: 25px;
          @media (max-width: 425px) {
            gap: 16px;
        }
    }
    &__hr{
        margin: 30px 0;
        border: 0;
        border-top: 1px solid #D1D1D6;
        width: 100%;
    }
    &__title{
        font-weight: 700;
        font-size: 2.14rem;
    @media (max-width: 425px) {
            font-size: 2rem;
        }
        
    }
    &__text-post{
        font-size: 18px;
        font-weight: 400;
        color:$text-secondary;
        line-height: 1.9rem;
    }
    &__comment-heading{
        font-weight: 500;
        font-size: 1.5rem;
          @media (max-width: 375px) {
            font-size: 1.3rem;
        }
    }
    &__preview-img{
          @media (max-width: 375px) {
            margin: 0 -16px;
        }
    }
    .mobile-single-post{
        display: none;
        align-items: center;
        padding: 10px 0;
        &__name,&__back{
            flex:1;
        }
        &__name,&__go-back{
            font-size: 1.4rem;
            font-weight: 600;
        }
        &__go-back{
            color:$text-primary;
        }
          @media (max-width: 425px) {
            display: flex;
        }
    }
    
}
</style>
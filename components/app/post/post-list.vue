<template>
  <div class="posts">
      <div class="container">
      <p v-if="$fetchState.pending">Загрузка</p>
       <p v-else-if="$fetchState.error">Ошибка</p>
       <p v-else-if="all_posts && all_posts.length === 0">Пусто</p>
      <div v-else >
          <div class="post-list">
          <post-item v-for="post in all_posts" :key="post.id" :post="post" />    
          </div>
          <div class="posts-pagintion">
              <base-pagination :pager="pager" :dots="true" />
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import BasePagination from './iu/base-pagination.vue';
import postItem from './post-item.vue'
export default {
    name:'PostList',
    components: { postItem, BasePagination },
    data(){
        return{
            posts:[],
            pager:{
            counts: 30,
            per: 3,
            now: 1
            }
        }
    },  
    async fetch(){
        await this.getAllPosts()
    },
    computed:{
        ...mapState('posts',['all_posts'])
    },
    watch:{
        'pager.now'(pageNum){
            this.getAllPosts({_page:pageNum})
        }
    },
    methods:{
        ...mapActions('posts',['getAllPosts'])
    }
}
</script>
<style lang="scss">
.post-list{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    row-gap: 40px;
    column-gap: 23px;
    margin: 45px 0;
    @media (max-width: 768px) {
            grid-template-columns: repeat(2,1fr);
            margin: 0;
        }
        @media (max-width: 425px) {
            grid-template-columns: repeat(1,1fr);
        }
}
.posts-pagintion{
    margin-bottom: 136px;
    display: flex;
    justify-content: flex-end;
      @media (max-width: 425px) {
            margin-bottom: 36px;
        }
}
</style>
export const state = () => ({
        all_posts:[],
        post:{},
        post_comments:[]
  })
  
  export const mutations = {
    SET_ALL_POSTS(state,payload){
        state.all_posts = payload
    },
    SET_POST(state,payload){
        state.post = payload
    },
    SET_POST_COMMENT(state,payload){
        state.post_comments = payload
    },
    SET_NEW_POST_COMMENT(state,payload){
        state.post.body = payload
    },
  }
  export const actions = {
    async getAllPosts({commit},payload){
        // payload - page number | search text
        try {
            await this.$axios.get('/posts?_limit=9',{
                params:payload
            }).then((res)=>{
                commit('SET_ALL_POSTS',res.data)
            })
        } catch (error) {
            return error
        }
    },
    async getPost({commit},currentPostId){
        try {
            await this.$axios.get(`/posts/${currentPostId}`).then((res)=>{
                commit('SET_POST',res.data)
            })
        } catch (error) {
            return error
        }
    },
    async getPostComments({commit},currentPostId){
        try {
            await this.$axios.get(`/posts/${currentPostId}/comments`).then((res)=>{
                commit('SET_POST_COMMENT',res.data)
            })
        } catch (error) {
            return error
        }
    },
    async updatePostBody({commit},postBodyText){
        const {id } = postBodyText
        try {
            await this.$axios.patch(`/posts/${id}`,postBodyText)
        } catch (error) {
            return error
        }
    }
  }
  
  export const getters = {}
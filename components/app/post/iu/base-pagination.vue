<template>
   <div v-if="pager" class="pager__wrapper">
    <transition-group class="pager" name="fade">
        <a key="prev" :disabled="!prev" @click.prevent="changPage(prev)">
            <img class="arrow-left" src="/icons/arrow.svg" alt="arrow-right">
        </a>
        <a v-for="(page, key) in (dots ? abridge(pages) : pages)" :key="page + key" :class="{ now: (dots ? key : page) == now, dots: dotsaction ? false : isNaN(page) }" @click.prevent="changPage(page, key)" v-text="page"></a>
        <a key="next" :disabled="!next" @click.prevent="changPage(next)">
            <img class="arrow-right" src="/icons/arrow.svg" alt="arrow-right">
        </a>
    </transition-group>
  </div>
</template>

<script>
export default {
    name:'BasePagination',
    props:{
        pager:{
            type:Object,
            default:()=>{}
        },
        dots:{
            type:Boolean,
            default:false
        },
        dotsaction:{
            type:Boolean,
            default:false
        }
    },
     computed: {
      pages() {
        if (this.pager.per) {
          return Math.ceil(this.pager.counts / this.pager.per);
        } else {
          return 1;
        }
      },
      now() {
        return this.pager.now;
      },
      prev() {
        return this.now && this.now > 1 ? this.now - 1 : false
      },
      next() {
          return this.now && this.now < this.pages ? this.now + 1 : false
      }
    },
    methods: {
      changPage(page, key) {
        if (page === this.now || !page || (isNaN(page) && !this.dotsaction)) {
          return;
        }
        if (this.dotsaction && key) {
          // eslint-disable-next-line vue/no-mutating-props
          this.pager.now = Number(key);
          return this.pager.now
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.pager.now = page
        return  this.pager.now;
      },
      abridge(pages) {
        let _distance, _edgeStart, _pages, i, idx, ref;
         // eslint-disable-next-line prefer-const
         _pages = {};
        // eslint-disable-next-line prefer-const
        _edgeStart = 2;
        for (idx = i = 1, ref = pages; (ref >= 1 ? i <= ref : i >= ref); idx = ref >= 1 ? ++i : --i) {
           
          _distance = Math.abs(parseInt(idx) - this.now);       
          if (idx === 1 || idx === pages || _distance < _edgeStart) {
            _pages[idx] = idx;
          }
          
         if (idx === 1 || idx === pages || _distance >= this.pages - _edgeStart) {
            _pages[idx] = idx;
          }
            else if (_distance === _edgeStart) {
              _pages[idx] = "...";
            }
        }
        return _pages;
      }
    }
}
</script>

<style lang="scss">
.pager {
  font-size: 0;
  padding: 6px 0;
  font-weight: 700;
}
.pager__wrapper {
  text-align: center;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  padding: 15px 0;
}
.pager a {
  display: inline-block;
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  transition-duration: 0.3s;
}
.pager a:not(.dots):not([disabled]) {
  cursor: pointer;
  border: 1px solid #E2E2E2;
}
.pager a:not(.dots):not([disabled]).now, .pager a:not(.dots):not([disabled]):hover {
  background: #fff;
  border: 1px solid #FF008A;
  color: $text-primary;
}
.pager a[disabled] {
  opacity: 0.5;
  cursor: no-allowed;
  border: 1px solid #E2E2E2;
}
.pager a + a {
  margin-left: 10px;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-active {
  position: absolute;
}
.dots{
    padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #E2E2E2;
}
.arrow-left{
    transform: rotate(180deg);
}
</style>
<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="Myicon">
        <svg :t="item.svgt" class="icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" :p-id="item.svgpid" width="128" height="128">
          <path :d="item.imgd" :p-id="item.imgpid" :fill="item.imgfill">
          </path>
        </svg>
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      console.log(this.listData);
    }
  }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .Myicon .icon {
    width: 26px;
    height: 18px;
  }

  .item .Myicon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>

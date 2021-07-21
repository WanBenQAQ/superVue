<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :is-checked="product.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-quantity">
          <div @click="switchBtn" v-if="$store.state.cartList[this.index].isShow" class="item-count right">
            <span class="item-total">&times;{{product.count}}</span>
          </div>
          <div v-else class="item-countbutton right">
            <count-button class="item-countbtn">
              <button @click="reduce" class="item-countbtn-left cbutton" slot="left" :disabled="product.count <= 1">&minus;</button>
              <span @click="switchCount" class="item-countbtn-center cbutton" slot="center">{{product.count}}</span>
              <button @click="add" class="item-countbtn-right cbutton" slot="right">&plus;</button>
            </count-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import CountButton from "./CountButton";
  export default {
    name: "CartListItem",
    components: {
      CheckButton,
      CountButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      },
      index: {
        type: Number,
        default() {
          return 0;
        }
      }
    },
    data() {
      return {
        count: 0
      }
    },
    created() {
      this.count = this.product.count
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      },
      reduce() {
        this.$emit('reduce')
      },
      add() {
        this.$emit('add')
      },
      switchCount() {
        //this.isShow = true
        this.$emit('switchCount')
      },
      switchBtn() {
        //this.isShow = false
        this.$emit('switchBtn')
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .item-count {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(100, 100, 100, 0.3);
    border-radius: 25%;
    position: relative;
  }
  .item-count .item-total {
    position: absolute;
    top: 3.5px;
    left: 3px;
  }
  .item-countbutton {
    height: 28px;
    width: 95px;

    position: relative;
    border-radius: 5px;
  }
  .item-countbutton .item-countbtn {
    top: 3.5px;
    left: 3px;
  }
  .countbutton .cbutton {
    margin-top: 3.5px;
    text-align: center;
  }
  .countbutton .item-countbtn-left {
    font-size: 12px;
    flex-grow: 0.25;
    height: 28px;
    line-height: 28px;
    border: 1px solid rgba(100, 100, 100, 0.3);
    border-radius: 6px 0 0 6px;
    background-color: #fff;
  }
  .countbutton .item-countbtn-center {
    flex-grow: 0.5;
    height: 28px;
    line-height: 28px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
    border-top: 1px solid rgba(100, 100, 100, 0.3);
  }
  .countbutton .item-countbtn-right {
    font-size: 12px;
    flex-grow: 0.25;
    height: 28px;
    line-height: 28px;
    border: 1px solid rgba(100, 100, 100, 0.3);
    border-radius: 0 6px 6px 0;
    background-color: #fff;
  }
</style>

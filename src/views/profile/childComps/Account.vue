<template>
  <div>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div @click="CollectionListItem" class="account-item">
        <div class="number">
          <span class="balance">{{CollectionListLength}}</span>个
        </div>
        <div class="account-info">我的收藏</div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "Account",
    computed: {
      ...mapGetters([
        'CollectionListLength'
      ]),
    },
    methods: {
      CollectionListItem() {
        this.$router.push('/collection')
      }
    }
  }
</script>

<style scoped>
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }
</style>

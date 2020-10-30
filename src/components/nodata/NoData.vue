<template>
    <div class="no-data">
        <div class="no-data_img">
            <img :src="icon"/>
        </div>
        <div class="no-data_text">{{text}}</div>
    </div>
</template>

<script>
    export default {
      name: 'noData',
      props: {
        icon: {
          require: true
        },
        text: {
          require: true
        }
      }
    }
</script>

<style lang="scss" scoped>
.no-data {
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 240px;
    width: 70%;
    .no-data_text {
        color: #999;
        font-size: 14px;
    }
    .no-data_img{
        width: 390px;
        height: 280px;
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

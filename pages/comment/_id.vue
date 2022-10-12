<template>
  <div class="comment-wrapper" v-if="oneComment">
    <h2 class="comment-main-title">Comment full info</h2>
    <div class="comment-body">
      <h5 class="comment-title">Comment Id</h5>
      <p class="comment-subtitle">{{ oneComment.id }}</p>
      <h5 class="comment-title">Comment Name</h5>
      <p class="comment-subtitle">{{ oneComment.name }}</p>
      <h5 class="comment-title">Comment Email</h5>
      <p class="comment-subtitle">{{ oneComment.email }}</p>
      <h5 class="comment-title">Comment Body</h5>
      <p class="comment-subtitle">{{ oneComment.body }}</p>
    </div>
    <nuxt-link to="/" class="comment-btn">Back</nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions({
      getComment: "comments/getSingleComment",
    }),
  },
  computed: {
    ...mapGetters({
      oneComment: "comments/getComment",
    }),
  },
  mounted() {
    this.getComment(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.comment-wrapper {
  display: flex;
  flex-direction: column;

  .comment {
    &-main-title {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 30px;
      color: rgb(61, 57, 57);
      font-weight: 700;
      margin: 0;
      margin-bottom: 20px;
      text-align: center;
    }
    &-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    &-title {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-size: 25px;
      font-weight: 600;
      margin: 0;
      color: #000;
    }
    &-subtitle {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      color: rgb(42, 39, 39);
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      font-weight: 500;
      font-size: 14px;
      margin-top: 30px;
      background: #466ffb;
      color: #fff;
      border: 1px solid #466ffb;
      border-radius: 8px;
      height: 43px;
      outline: none;
      text-align: center;
      align-self: center;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>

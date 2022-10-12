<template>
  <div class="pagination-wrapper">
    <button
      @click.prevent="previousPage"
      :disabled="isInFirstPage"
      class="arrow"
    >
      <img src="@/assets/images/left-arrow.svg" alt="" />
    </button>
    <p
      v-for="(page, idx) in pages"
      :key="idx"
      :class="{ active: isPageActive(page.name) }"
    >
      {{ page.name }}
    </p>
    <button
      @click.prevent="nextPage"
      :disabled="isInLastPage"
      class="arrow right"
    >
      <img src="@/assets/images/left-arrow.svg" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClickFirstPage: function () {
      this.$emit("pagechanged", 1);
    },
    previousPage: function () {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage: function (page) {
      this.$emit("pagechanged", page);
    },
    nextPage: function () {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    isPageActive: function (page) {
      return this.currentPage === page;
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 20px;
    border: 1px solid #4670fbb6;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;

    &.right {
      transform: rotate(180deg);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  p {
    width: 50px;
    height: 20px;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #466ffb;
    text-align: center;
    border: 1px solid #4670fbb6;
    border-radius: 4px;

    &.active {
      color: #fff;
      background: #5667d7;
    }
  }
}
</style>

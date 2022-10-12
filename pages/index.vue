<template>
  <div class="page-wrapper">
    <navbar />
    <data-table
      :tHead="tableHead"
      :tBody="computedComments"
      :current-page="currentPage"
      :limit="limit"
      @table:sort="sortComments "
    />
    <pagination
      :current-page="currentPage"
      :total-pages="Math.ceil(comments.length/limit)"
      :total="comments.length"
      @pagechanged="onPageChange"
    />
  </div>
</template>


<script>
import DataTable from "../components/DataTable.vue";
import Navbar from "../components/Navbar.vue";
import Pagination from "../components/Pagination.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { DataTable, Navbar, Pagination },
  name: "IndexPage",
  data() {
    return {
      tableHead: [
        {
          value: "index",
          text: "№",
          sort: false
        },
        {
          value: "id",
          text: "Id",
          sort: true
        },
        {
          value: "name",
          text: "Name",
          sort: true
        },
        {
          value: "email",
          text: "Email",
          sort: true
        },
      ],
      tableBody: [
        {
          id: 1,
          name: "Egor",
          email: "elsadulaev.com",
        },
        {
          id: 1,
          name: "Egor",
          email: "elsadulaev.com",
        },
        {
          id: 1,
          name: "Egor",
          email: "elsadulaev.com",
        },
      ],
      comments: [],
      currentPage: 1,
      limit: 10,
    };
  },
  computed: {
    ...mapGetters({
      commentList: "comments/getCommentsFromServer"
    }),
    computedComments() {
      const currentIndex = (this.currentPage - 1) * this.limit;
      return this.comments.slice(currentIndex, currentIndex + this.limit);
    },
  },
  watch: {
    commentList(newValue) {
      this.comments = JSON.parse(JSON.stringify(newValue));
    }
  },
  methods: {
    ...mapActions({
      getComments: "comments/getComments",
    }),
    sortComments(func) {
      this.comments.sort(func)
    },
    onPageChange: function (page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.getComments();
  },
};
</script>

<style lang="scss" scoped></style>

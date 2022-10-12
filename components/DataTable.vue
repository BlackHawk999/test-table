<template>
  <div class="brands-table-wrapper">
    <table class="brands-table" cellspacing="0" cellpadding="0">
      <thead class="brands-table-head">
        <tr>
          <th v-for="(item, idx) in tHead" :key="idx" class="num">
            <div class="th-content">
              <span>{{ item.text }}</span>
              <img
                v-if="item.sort"
                @click="sortList(item.value)"
                src="@/assets/images/arrow-up-down.svg"
                alt=""
              />
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody class="brands-table-body" v-if="tBody.length">
        <tr
          @click="openComment(info.id)"
          v-for="(info, idx) in tBody"
          :key="info.id"
        >
          <td class="tbody-edit">
            <span>{{ getCurrentIndex(idx) }}</span>
          </td>
          <td class="tbody-edit">
            <span>{{ info.id }}</span>
          </td>
          <td class="tbody-edit">
            <span>{{ info.name }}</span>
          </td>
          <td class="tbody-edit">
            <span>{{ info.email }}</span>
          </td>
          <td class="show">
            <nuxt-link :to="`/comment/${info.id}`">
              <img src="@/assets/images/eye.svg" alt="" />
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    tHead: {
      type: Array,
      require: true,
    },
    tBody: {
      type: Array,
      require: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sortedbyASC: false,
    };
  },
  methods: {
    sortList(sortBy) {
      let func;

      if (this.sortedbyASC) {
        switch (sortBy) {
          case "name":
          case "email":
            func = (x, y) => x[sortBy].localeCompare(y[sortBy]);
            break;
          default:
            func = (x, y) => x[sortBy] - y[sortBy];
            break;
        }
        this.sortedbyASC = false;
      } else {
        switch (sortBy) {
          case "name":
          case "email":
            func = (x, y) => y[sortBy].localeCompare(x[sortBy]);
            break;
          default:
            func = (x, y) => y[sortBy] - x[sortBy];
            break;
        }
        this.sortedbyASC = true;
      }

      this.$emit("table:sort", func);
    },
    openComment(id) {
      this.$emit("openInfo", id);
    },
    getCurrentIndex(index) {
      return index + 1 + this.limit * this.currentPage - this.limit;
    },
  },
};
</script>

<style lang="scss" scoped>
.brands {
  &-table-wrapper {
    width: 100%;
    height: auto;
    padding-top: 75px;
    background: #fff;
  }

  &-table {
    width: 100%;
    height: fit-content;
    table-layout: auto;
    overflow-y: auto;
  }

  &-table-head {
    width: 100%;
    height: 44px;
    position: sticky;
    top: 0;
    background: #c2dbff;
    z-index: 7;
    border-radius: 8px;
    vertical-align: middle;
    overflow: auto;
    tr {
      th {
        &:first-child {
          border-radius: 8px 0 0 8px;
          width: 15px;
        }

        &:last-child {
          border-radius: 0 8px 8px 0;
        }
      }
      .num {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
          sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;
        color: #000;
        text-align: left;
        vertical-align: middle;
        position: relative;
        padding: 5px 15px;

        span {
          white-space: nowrap;
        }

        .th-content {
          width: 20%;
          height: 15px;
          display: flex;
          justify-content: space-between;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: pointer;
          }
        }

        &:hover {
          .icon-sort {
            display: block;
            cursor: pointer;
          }
        }
      }
    }
  }
  &-table-body {
    tr {
      align-items: center;
      vertical-align: middle;
      border-bottom: 2px solid rgba(222, 222, 222, 0.7);
      border-style: dotted;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background-color: rgba(215, 218, 228, 0.2);
      }
      
      td {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
          sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #000;
        padding: 10px;
        vertical-align: middle;
        white-space: nowrap;
        border-bottom: 2px dotted rgba(222, 222, 222, 0.7);

        &:first-child {
          max-width: 10px;
        }
      }
      .show {
        width: 3%;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    th {
      vertical-align: middle;
      text-align: left;
      position: relative;
      padding-left: 10px !important;
    }
    .tbody {
      &-title {
        width: 11%;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
          sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #8b919d;
        vertical-align: middle;

        &:nth-child(3) {
          width: 20%;
        }
      }

      &-edit {
        // text-align: center;
        max-width: 50px;
      }
    }
  }
}
</style>

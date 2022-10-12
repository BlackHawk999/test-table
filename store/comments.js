export const state = () => ({
  comments: [],
  comment: [],
});

export const getters = {
  getCommentsFromServer(state) {
    return state.comments;
  },
  getComment(state) {
    return state.comment;
  }
};

export const mutations = {
  COMMENTS_TO_STATE: (state, comments) => {
    state.comments = comments;
  },
  SINGLE_COMMENT_TO_STATE: (state, comment) => {
    state.comment = comment;
  },
};

export const actions = {
  async getComments({ commit }) {
    return this.$axios("/api/comments", {
      method: "GET",
    })
      .then((comments) => {
        commit("COMMENTS_TO_STATE", comments.data);
        console.log(comments, 'comments');
        return comments;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  async getSingleComment({ commit }, id) {
    commit("SINGLE_COMMENT_TO_STATE", null);
    return this.$axios(`/api/comments/${id}`, {
      method: "GET"
    })
    .then((comment) => {
      commit("SINGLE_COMMENT_TO_STATE", comment.data);
      return comment
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
  }
};

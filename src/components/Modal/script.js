import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ModalBook",
  props: {
    bookDetail: {
      type: Object,
      default: null,
    },
    bookId: {
      type: Number,
      default: -1,
    },
  },
  data: () => ({
    dialog: false,
    book: {},
    rules: {
      required: (value) => !!value || "This field is required",
      minLengthTitle: (value) => value.length >= 5 || "Min length title is 5",
      acceptType: (value) => value.size >= 3000 || "Just accept png, jpeg, jpg",
    },
    defaultbook: {
      id: 0,
      title: "",
      isbn: "",
      total: 0,
      productionYear: "",
      categoryId: 0,
      cover: "",
      author: "",
      description: "",
      createdAt: "",
      updatedAt: "",
    },
  }),

  computed: {
    ...mapGetters("modal", ["isBookModalOpen", "getBookModal"]),
    ...mapGetters("book", ["allBooks"]),

    formTitle() {
      return this.getBookModal.id ? "Edit book" : "Add Book";
    },
  },

  methods: {
    ...mapMutations("modal", ["toggleBookModal"]),
    ...mapActions("book", ["createBookAction", "updateBookAction"]),

    // actionRules() {
    //   this.rules.required
    //   this.rules.minLengthTitle =
    //   this.rules.acceptType = (v) =>
    //     v.size >= 3000 || "Just accept png, jpeg, jpg";
    // },
    close() {
      this.toggleBookModal({ isOpen: false, book: {} });
    },

    handleOpenModal() {
      this.toggleBookModal({ isOpen: true, book: {} });
    },
    save() {
      console.log("save");
      if (this.getBookModal.id) {
        const {
          title,
          author,
          categoryId,
          productionYear,
          description,
          cover,
          total,
        } = this.getBookModal;
        const data = {
          title,
          author,
          categoryId,
          productionYear,
          description,
          cover,
          total,
        };
        const id = this.getBookModal.id;
        console.log("hi");
        this.updateBookAction({ id, data }).then((res) => console.log(res));
      } else {
        //=============================
        const {
          title,
          author,
          categoryId,
          productionYear,
          description,
          cover,
          total,
          isbn,
        } = this.getBookModal;
        const data = {
          title,
          author,
          categoryId,
          productionYear,
          description,
          cover,
          total,
          isbn,
        };
        //===========================
        this.createBookAction(data);
        console.log("CreateNew");
      }
      this.toggleBookModal({ isOpen: false, book: {} });
    },
  },
  watch: {},

  updated() {},
};

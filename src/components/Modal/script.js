import { mapGetters, mapMutations, mapActions } from "vuex";
import FilterCategory from "@/components/Dropdown";
export default {
  name: "ModalBook",
  components: {
    FilterCategory,
  },

  data: () => ({
    dialog: false,
    book: {},
    rules: [(value) => value.length >= 5 || "Min Length is 5 character"],
    CoverRule: [(value) => value.size <= 3000 || "Just accept png, jpg"],
    required: [(value) => !!value || "This file is required"],
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
    ...mapActions("book", [
      "createBookAction",
      "updateBookAction",
      "fetchBookAction",
    ]),

    close() {
      this.toggleBookModal({ isOpen: false, book: {} });
    },
    handleChange(id) {
      this.categoryId = id;
    },
    handleOpenModal() {
      this.toggleBookModal({ isOpen: true, book: {} });
    },
    save() {
      console.log("save");
      if (this.$refs.form.validate()) {
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
          this.updateBookAction(id).then(() => this.fetchBookAction());
        } else {
          //=============================
          const {
            title,
            author,
            productionYear,
            description,
            cover,
            total,
            isbn,
          } = this.getBookModal;
          const data = {
            title,
            author,
            categoryId: this.categoryId,
            productionYear,
            description,
            cover,
            total,
            isbn,
          };
          //===========================

          data.cover = "image.jpg";
          this.createBookAction(data).then(() => this.fetchBookAction());
          console.log("CreateNew");
        }
        this.toggleBookModal({ isOpen: false, book: {} });
      }
    },
  },
};

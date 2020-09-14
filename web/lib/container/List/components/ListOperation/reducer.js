export default function reducer(state, {
  type,
  payload
}) {
  const map = {
    openConfirm() {
      return {
        confirm: true,
        title: payload.title,
        type: payload.type
      };
    },

    closeConfirm() {
      return {
        confirm: false,
        title: '',
        type: null
      };
    },

    openModal() {
      return {
        modalTitle: payload.modalTitle,
        modalWidth: payload.modalWidth,
        modalConfig: payload.modalConfig,
        onSubmit: payload.onSubmit,
        data: payload.data,
        index: payload.index,
        pagination: payload.pagination,
        modal: true
      };
    },

    closeModal() {
      return {
        modalTitle: '',
        modalWidth: undefined,
        modalConfig: {},
        onSubmit: undefined,
        data: undefined,
        pagination: undefined,
        modal: false
      };
    },

    defaults() {
      console.warn(`未定义的方法: ${type}`);
      return state;
    }

  };
  return (map[type] || map['defaults'])();
}
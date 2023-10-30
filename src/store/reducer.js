export const initialState = {
  images: [],
  isOpen: false,
  isLoading: false,
  selectedImage: null,
  page: 1,
  queryValue: '',
  totalHits: null,
  error: '',
};

export const imageReduce = (state, action) => {
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case 'loader':
      return { ...state, isLoading: payload };

    case 'fetchImage':
      return { ...state, images: [...state.images, ...payload] };

    case 'totalHits':
      return { ...state, totalHits: payload };

    case 'error':
      return { ...state, error: payload };

    case 'loadMorePage':
      return { ...state, page: state.page + 1 };

    case 'newQuery':
      return { ...state, queryValue: payload, page: 1, images: [] };

    case 'toggleModal':
      return { ...state, isOpen: !state.isOpen, selectedImage: payload };

    default:
      return state;
  }
};

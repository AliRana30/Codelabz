import * as actions from "../../actions/actionTypes";

const initialState = {
  uploading: false,
  uploading_error: null,
  progress: {},
  deleting: false,
  deleting_error: null
};

const TutorialsImageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_TUTORIAL_IMAGES_STATE:
      return initialState;

    case actions.TUTORIAL_IMAGE_UPLOAD_START:
      return {
        ...state,
        uploading: true,
        uploading_error: null,
        progress: {}
      };

    case actions.TUTORIAL_IMAGE_UPLOAD_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          [payload.fileName]: payload.progress
        }
      };

    case actions.TUTORIAL_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploading_error: false
      };

    case actions.TUTORIAL_IMAGE_UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploading_error: payload
      };

    case actions.TUTORIAL_IMAGE_DELETE_START:
      return {
        ...state,
        deleting: true,
        deleting_error: null
      };

    case actions.TUTORIAL_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleting_error: false
      };

    case actions.TUTORIAL_IMAGE_DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        deleting_error: payload
      };

    default:
      return state;
  }
};

export default TutorialsImageReducer;

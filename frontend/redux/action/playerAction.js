import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { server } from '../../server';

// Add new player
export const addNewPlayer = () => async (dispatch) => {
  try {
    dispatch({
      type: 'addNewPlayerRequest',
    });

    const { data } = await axios.post(
      `${server}/player/newPlayer`,
      {
        name: 'Jitendra',
        minimumPlayers: 5,
        winningPrice: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: 'addNewPlayerSuccess',
      payload: data.message,
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: data.message,
    });
  } catch (e) {
    if (!e.response.data) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.toString(),
      });
    }
    dispatch({
      type: 'addNewPlayerFail',
      payload: e.response.data.message,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: e.response.data.message,
    });
  }
};

// Get admin product

export const getAdminProducts = () => async (dispatch) => {
  // try {
  // 	dispatch({
  // 		type: "getAdminProductsRequest",
  // 	});
  // 	const { data } = await axios.get(`${server}/product/adminAllProducts`, {
  // 		withCredentials: true,
  // 	});
  // 	dispatch({
  // 		type: "getAdminProductsSuccess",
  // 		payload: data.products,
  //     });
  //     console.log("data", data);
  // } catch (e) {
  // 	dispatch({
  // 		type: "getAdminProductsFail",
  // 		payload: e.response.data.message,
  // 	});
  // 	Toast.show({
  // 		type: "error",
  // 		text1: "Error",
  // 		text2: e.response.data.message,
  //     });
  // }
};

// Get product details

export const getProductDetails = (id) => async (dispatch) => {
  // try {
  // 	dispatch({
  // 		type: "getProductDetailsRequest",
  // 	});
  // 	const { data } = await axios.get(`${server}/product/${id}`, {
  // 		withCredentials: true,
  // 	});
  // 	dispatch({
  // 		type: "getProductDetailsSuccess",
  // 		payload: data.products,
  // 	});
  // } catch (e) {
  // 	dispatch({
  // 		type: "getProductDetailsFail",
  // 		payload: e.response.data.message,
  // 	});
  // 	Toast.show({
  // 		type: "error",
  // 		text1: "Error",
  // 		text2: e.response.data.message,
  // 	});
  // }
};

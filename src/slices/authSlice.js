// // src/features/auth/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const storedUser = JSON.parse(localStorage.getItem("user"));

// const initialState = {
//   user: storedUser || null, // Load saved user if available
//   isAuthenticated: !!storedUser,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout } =
//   authSlice.actions;

// export default authSlice.reducer;

// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const initialState = {
  user: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => { state.loading = true; },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;

// 🔥 THUNKS
export const registerUser = (email, password, role) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role in Firestore
    await setDoc(doc(db, "users", user.uid), { email, role });

    dispatch(setUser({ user, role }));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔍 Check Firestore for user record
    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (!docSnap.exists()) {
      // User authenticated but not registered in Firestore
      dispatch(setError("User not registered in database"));
      await signOut(auth); // logout immediately to prevent access
      return;
    }

    const role = docSnap.data().role;
    dispatch(setUser({ user, role }));
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      dispatch(setError("User not registered"));
    } else if (err.code === "auth/wrong-password") {
      dispatch(setError("Incorrect password"));
    } else {
      dispatch(setError(err.message));
    }
  }
};


export const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(clearUser());
};

// Monitor login state (runs in App)
export const listenToAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      const role = docSnap.exists() ? docSnap.data().role : null;
      dispatch(setUser({ user, role }));
    } else {
      dispatch(clearUser());
    }
  });
};

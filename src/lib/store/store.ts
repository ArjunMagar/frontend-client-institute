import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice"
import instituteSlice  from "./institute/instituteSlice";
import categorySlice from "./category/categorySlice"
import courseSlice from "./course/courseSlice"
import teacherSlice from "./teacher/teacherSlice"
import cartSlice from "./cart/cartSlice"
import orderSlice from "./order/orderSlice"
import chapterSlice from "./chapter/chapterSlice"
import lessonSlice from "./lesson/lessonSlice"
export const makeStore = () => {
    return configureStore({
      reducer: {
        auth: authSlice,
        institute:instituteSlice,
        category: categorySlice,
        course:courseSlice,
        teacher:teacherSlice,
        cart:cartSlice,
        order:orderSlice,
        chapter:chapterSlice,
        lesson:lessonSlice
  
      },
    })
  }



  // Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
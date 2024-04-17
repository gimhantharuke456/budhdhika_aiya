import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  activeIndex: 0,
  teacherActiveIndex: 0,
  studentActiveIndex: 0,
});

export default state;

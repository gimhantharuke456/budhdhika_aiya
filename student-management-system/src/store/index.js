import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  activeIndex: 0,
  courses: [],
  students: [],
  staff: [],
});

export default state;

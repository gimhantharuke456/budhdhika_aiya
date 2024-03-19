import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  activeIndex: -1,
  courses: [],
  students: [],
  staff: [],
});

export default state;

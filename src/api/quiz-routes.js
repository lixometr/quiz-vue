import { AppAxios } from "./app-axios";
import Vue from "vue";
import qs from "query-string";
import { createFormData } from "@/utils/helpers/createFormData";
export const getInitialData = async () => {
  const roistat = Vue.$cookies.get("roistat_visit");
  const ym_id = Vue.$cookies.get("_ym_uid");
  const params = qs.parse(location.search);
  const toSend = {
    roistat,
    ym_id,
    ...params,
  };
  const formData = createFormData(toSend);
  const { data } = await AppAxios.post("init-data", formData);
  // const { data } = await AppAxios.post("init-data");
  return data;
};

// export const completeQuiz = async (toSend) => {
//   console.log(toSend);
//   return {
//     h1: "По Вашим параметрам  подходят квартиры в 28 жилых комплексах:",
//     imageBack: "image.jpeg",
//     buildings: [
//       {
//         image: "https://image.jpg",
//         title: "ЖК Квадрат",
//         href: "https",
//         text: "11 квартир",
//       },
//       {
//         image: "https://image.jpg",
//         title: "ЖК Квадрат",
//         href: "https",
//         text: "11 квартир",
//       },
//     ],
//   };
// };
export const completeQuiz = async ({ sessionId, phone }) => {
  const toSend = {
    sessionId,
    phone,
  };
  const formData = createFormData(toSend);

  const { data } = await AppAxios.post("complete", formData);
  return data;
};
export const saveAnswers = async () => {
  return {
    h1: "Подобрано 135 вариантов по вашим параметрам",
    h2: "Есть варианты со скидками и спецпредложениями", // optional
    hint: "Для получения доступа к базе укажите свой номер телефона", // optional
    icon: "", // optional
    button: "Посмотреть подборку",
    imageBack: "image.jpeg",
    imageBottom: "image.jpeg",
  };
};

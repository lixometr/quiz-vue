import { AppAxios } from "./app-axios";
export const getInitialData = async () => {
  const { data } = await AppAxios.post("init-data");
  return data;
};

export const completeQuiz = async (toSend) => {
  console.log(toSend);
  return {
    h1: "По Вашим параметрам  подходят квартиры в 28 жилых комплексах:",
    imageBack: "image.jpeg",
    buildings: [
      {
        image: "https://image.jpg",
        title: "ЖК Квадрат",
        href: "https",
        text: "11 квартир",
      },
      {
        image: "https://image.jpg",
        title: "ЖК Квадрат",
        href: "https",
        text: "11 квартир",
      },
    ],
  };
};
// export const completeQuiz = async ({ sessionId, phone }) => {
//   const { data } = await AppAxios.post("complete", {
//     sessionId,
//     phone,
//   });
//   return data;

// };
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

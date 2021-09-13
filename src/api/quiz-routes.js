import { AppAxios } from "./app-axios";
import Vue from "vue";
import qs from "query-string";
import { createFormData } from "@/utils/helpers/createFormData";
export const getInitialData = async () => {
  const params = qs.parse(location.search);
  const toSend = {
    ...params,
  };
  const formData = createFormData(toSend);
  const { data } = await AppAxios.post("init-data", formData);
  return data;
};

export const completeQuiz = async ({ sessionId, phone, name }) => {
  const roistat = Vue.$cookies.get("roistat_visit");
  const ym_id = Vue.$cookies.get("_ym_uid");
  const toSend = {
    sessionId,
    phone,
    name,
    roistat,
    ym_id,
  };
  const formData = createFormData(toSend);

  const { data } = await AppAxios.post("complete", formData);
  return data;
};
export const saveAnswer = async ({ sessionId, questionId, answers }) => {
  const jsonAnswers = JSON.stringify(answers);
  const formData = createFormData({
    sessionId,
    questionId,
    answer: jsonAnswers,
  });

  const { data } = await AppAxios.post("post-answer", formData);
  return data;
};
export const sendFilters = async ({ sessionId, filters }) => {
  const jsonFilters = JSON.stringify(filters);
  const formData = createFormData({
    sessionId,
    filters: jsonFilters,
  });

  const { data } = await AppAxios.post("filter", formData);
  return data;
};

export const getFormData = async ({ sessionId }) => {
  const formData = createFormData({ sessionId });
  const { data } = await AppAxios.post("get-form", formData);
  return data;
};

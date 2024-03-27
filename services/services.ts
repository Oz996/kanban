import { Inputs } from "@/components/BoardModal/BoardForm";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { ColumnInput } from "@/types";
import axios from "axios";

// board services
export const getBoards = async () => {
  const res = await axios.get(getBaseUrl() + "/api/boards");
  const data = res.data;
  return data;
};

export const getBoard = async (id: string) => {
  const res = await axios.get(getBaseUrl() + `/api/board/${id}`);
  const data = res.data;
  return data;
};

export const postBoard = async (data: Inputs) => {
  const res = await axios.post(getBaseUrl() + `/api/boards`, data);
  return res;
};

export const updateBoard = async (id: string, data: Inputs) => {
  const res = await axios.put(getBaseUrl() + `/api/board/${id}`, data);
  return res;
};

export const deleteBoard = async (id: string) => {
  const res = await axios.delete(getBaseUrl() + `/api/board/${id}`);
  return res;
};

// column services
export const postColumn = async (id: string, data: ColumnInput) => {
  const res = await axios.post(getBaseUrl() + `/api/column/${id}`, data);
  return res;
};

export const updateColumn = async (id: string, data: ColumnInput) => {
  const res = await axios.put(getBaseUrl() + `/api/column/${id}`, data);
  return res;
};

export const deleteColumn = async (id: string) => {
  const res = await axios.delete(getBaseUrl() + `/api/column/${id}`);
  return res;
};

// task services

export const postTask = async (data: any) => {
  const res = await axios.post(getBaseUrl() + `/api/task/`, data);
  return res;
};

export const updateTask = async (id: string, data: any) => {
  const res = await axios.put(getBaseUrl() + `/api/task/${id}`, data);
  return res;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(getBaseUrl() + `/api/task/${id}`);
  return res;
};

//subtask services

export const updateSubtask = async (id: string, data: any) => {
  const res = await axios.put(getBaseUrl() + `/api/subtask/${id}`, data);
  return res;
};

export const postSubtask = async (id: string, data: any) => {
  const res = await axios.post(getBaseUrl() + `/api/subtask/${id}`, data);
  return res;
};

export const deleteSubTask = async (id: string) => {
  const res = await axios.delete(getBaseUrl() + `/api/subtask/${id}`);
  return res;
};

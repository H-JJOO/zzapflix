import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  function (config) {
    // 요청이 전송되기 전에 작업을 수행합니다
    // console.log("request start", config);
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업을 수행합니다  (디버깅 수월)
    // console.log("request error", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  function (response) {
    // (받을 response 데이터를 확인 가능)
    // 2xx 범위 내에 있는 모든 상태 코드로 인해 이 함수가 트리거됩니다.
    // 응답 데이터로 작업을 수행합니다.
    // console.log("get response", response);
    return response;
  },
  function (error) {
    // (알아서 에러를 프린트)
    // 범위를 벗어나는 모든 상태 코드  2xx 중 이 함수가 트리거되도록 합니다
    // 응답 오류가 있는 작업을 수행 합니다 .
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;

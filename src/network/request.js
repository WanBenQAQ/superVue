import axios from "axios";

export function request(config) {
  //1. 创建axios的实例
  const instance = axios.create({
    //老接口，没新接口好用
    //baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:7878/api/m5/',
    timeout: 5000
  })
  //2. axios的拦截器
  //2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  //3. 发送真正的网络请求
  return instance(config)
}

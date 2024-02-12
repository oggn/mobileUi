import axios from 'axios';
import { HTTPS_API } from '../_https/index';

//
/// baseUrl
export const API = axios.create({
  baseURL: HTTPS_API,
});

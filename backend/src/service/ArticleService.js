import Axios from 'axios';


const getArticle = async () => {
  return Axios.get('http://manager.zaeke.com:9999/main/article', {
    params: {
      id: 16184
    }
  });
}

export default {
  getArticle,
}
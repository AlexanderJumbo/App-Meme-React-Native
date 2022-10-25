import axios from 'axios';

export const getMemes = async () => {
  const resp = await axios.get('https://api.imgflip.com/get_memes');
  //console.log(JSON.stringify(resp.data, null, 2));
  console.log('sssssss', resp.data);
  return resp.data; //[0];
};

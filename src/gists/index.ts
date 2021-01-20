import { Octokit } from '@octokit/core';
import { parse } from '@/utils/querystring';
import ajax from '@/utils/ajax';
const { code } = parse(window.location.search);
const client_id = process.env.REACT_APP_CLIENT_ID || '';
const client_secret = process.env.REACT_APP_CLIENT_SECRET || '';
const gist_id = process.env.REACT_APP_GIST_ID || '';
const callback_url = process.env.REACT_APP_CALLBACK_URL || '';
const save_file = 'rss.json';

let octokit: Octokit | null = null;

export interface RSS_DATA {
  title: string;
  url: string;
  updateDate: string;
};

export const goAuth = function () {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_url}&scope=gist`;
};

if (!code) {
  goAuth();
}

async function getToken() {
  const token = sessionStorage.getItem('token');
  if (token) {
    octokit = new Octokit({auth: token});
    return token;
  }
  const { access_token } = await ajax('/login/oauth/access_token', 'get', {
    query: {
      client_id,
      code,
      client_secret,
      scope: 'gist'
    }
  }).send();
  if (access_token) {
    sessionStorage.setItem('token', access_token);
    octokit = new Octokit({ auth: token });
  }
  return access_token;
};

// 获取收藏的RSS
export const getRssSaved = async () => {
  await getToken();
  if (!octokit) {
    return;
  }
  try {
    const { data } = await octokit.request(`GET /gists/${gist_id}`);
    const rssList = data.files[save_file];
    if (rssList) {
      return JSON.parse(rssList.content);
    }
    return [];
  } catch (e) {
    goAuth();
  }
};

// 更新RSS收藏
export const updateRssSaved = async (rssList: RSS_DATA[]) => {
  await getToken();
  if (!octokit) {
    return;
  }
  try {
    const { data } = await octokit.request(`PATCH /gists/${gist_id}`, {
      files: {
        [save_file]: {
          content: JSON.stringify(rssList)
        }
      }
    });
    return data;
  } catch (e) {
  }
};

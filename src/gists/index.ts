import { Octokit } from '@octokit/core';
import { parse } from '@/utils/querystring';
import ajax from '@/utils/ajax';
import RssParser from 'rss-parser';
const proxy = process.env.REACT_APP_CORS_PROXY || '';
const { code } = parse(window.location.search);
const client_id = process.env.REACT_APP_CLIENT_ID || '';
const client_secret = process.env.REACT_APP_CLIENT_SECRET || '';
const gist_id = process.env.REACT_APP_GIST_ID || '';
const callback_url = process.env.REACT_APP_CALLBACK_URL || '';
const save_file = 'rss.json';
const parser = new RssParser();

let octokit: Octokit | null = null;

export interface RSS_DATA {
  title?: string;
  url: string;
  updateDate?: string;
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
  } else {
    goAuth();
  }
  return access_token;
};

// 获取收藏的RSS
export const getRssSaved = async (): Promise<RSS_DATA[]> => {
  await getToken();
  if (!octokit) {
    return [];
  }
  try {
    const { data } = await octokit.request(`GET /gists/${gist_id}`);
    const { content } = data.files[save_file];
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
};


// 新增RSS
export const addRssSaved = async (rss: RSS_DATA) => {
  await getToken();
  if (!octokit) {
    return;
  }
  const list = await getRssSaved();
  list.push(rss);
  const isHave = !!list.find((item) => rss.url === item.url || rss.title === item.url);
  if (isHave) {
    return new Error('存在相同订阅源链接或者标题');
  }
  try {
    await octokit.request(`PATCH /gists/${gist_id}`, {
      files: {
        [save_file]: {
          content: JSON.stringify(list)
        }
      }
    });
    return true;
  } catch (e) {
    return e;
  }
};

// 获取RSS详情
export const getRssDetail = async (url: string) => {
  const {
    items,
    title,
    description
  } = await parser.parseURL(proxy + url);
  const list = items.map(({ title, pubDate, contentSnippet, link}) => ({
    title,
    date: pubDate,
    snippet: contentSnippet,
    link
  }));
  return {
    list,
    title,
    description
  };
};

getRssDetail('https://www.zhangxinxu.com/wordpress/feed/');

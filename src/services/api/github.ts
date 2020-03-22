import axios from 'axios';
import parse from 'parse-link-header';

const GITHUB_PI_URL = 'https://api.github.com';

//@TODO add api rate limit checks to prevent error
//@see https://developer.github.com/v3/#rate-limiting
//@see https://developer.github.com/v3/rate_limit/

const getUsers = async ({query, page}): Promise<{} | undefined> => {
  console.log('page', page);
  const response = await axios.get(`${GITHUB_PI_URL}/search/users`, {
    params: {q: query, page},
  });
  const {
    data: {items, total_count},
    headers: {link},
  } = response;
  const pardeLinks = parse(link);

  return {
    users: items,
    totalCount: total_count,
    next: pardeLinks ? pardeLinks.next : null,
  };
};

const getUserProfile = async ({username}): Promise<{} | undefined> => {
  const response = await axios.get(`${GITHUB_PI_URL}/users/${username}`);
  const {data} = response;
  return {userProfile: data};
};

const getUserRepos = async ({
  username,
  sort,
  direction,
}): Promise<{} | undefined> => {
  const response = await axios.get(`${GITHUB_PI_URL}/users/${username}/repos`, {
    params: {
      sort,
      direction,
    },
  });
  const {data} = response;
  return {userRepos: data};
};

export default {
  getUsers,
  getUserProfile,
  getUserRepos,
};

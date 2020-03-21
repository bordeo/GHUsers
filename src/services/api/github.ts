import axios from 'axios';
import parse from 'parse-link-header';

const getUsers = async (
  query: string,
  page: number = 1,
): Promise<{} | undefined> => {
  const pageParam = page ? `&page=${page}` : '';
  const users = await axios.get(
    `https://api.github.com/search/users?q=${query}${pageParam}`,
  );
  const {
    data: {items, total_count},
    headers: {link},
  } = users;
  const pardeLinks = parse(link);

  return {users: items, total_count, next: pardeLinks ? pardeLinks.next : null};
};

export default {
  getUsers,
};

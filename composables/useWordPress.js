export const useWordPress = () => {
  const isClient = typeof window !== 'undefined';

  const saveToLocalStorage = (key, data) => {
    if (!isClient) return;
    const dataWithTimestamp = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(dataWithTimestamp));
  };

  const getFromLocalStorage = (key, expiryTime = 3600000) => {
    if (!isClient) return null;
    const localData = localStorage.getItem(key);
    if (!localData) return null;

    try {
      const { data, timestamp } = JSON.parse(localData);
      if (Date.now() - timestamp > expiryTime) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  };

  const isDataExpired = (key, expiryTime = 3600000) => {
    if (typeof window === 'undefined') return true;

    const item = localStorage.getItem(key);
    if (!item) return true;

    try {
      const { timestamp } = JSON.parse(item);
      return Date.now() - timestamp > expiryTime;
    } catch (e) {
      return true;
    }
  };

  const fetchAllPosts = async () => {
    let allPosts = [];
    let currentPage = 1;
    let hasMorePosts = true;

    try {
      while (hasMorePosts) {
        const response = await fetch(
          `https://6pt4tfynw4.execute-api.us-east-1.amazonaws.com/prod/posts?per_page=100&page=${currentPage}`,
          { method: 'GET', mode: 'cors' }
        );

        if (!response.ok) break;

        const data = await response.json();
        if (!Array.isArray(data)) break;

        allPosts = [...allPosts, ...data];
        hasMorePosts = data.length === 100;
        currentPage++;
      }

      return allPosts;
    } catch (err) {
      console.error('Unexpected error in fetchAllPosts:', err);
      return [];
    }
  };

  const fetchPostsOnlyTVM = async () => {
    const storageKey = `wordpressPosts-tag-tvm`;

    if (!isDataExpired(storageKey)) {
      const cached = getFromLocalStorage(storageKey);
      if (cached) return cached;
    }

    const allPosts = await fetchAllPosts();
    const tvmPosts = allPosts.filter(
      (post) => Array.isArray(post.class_list) && post.class_list.includes('tag-vbs')
    );

    saveToLocalStorage(storageKey, tvmPosts);
    return tvmPosts;
  };

  const fetchCategories = async () => {
    const storageKey = 'wordpressCategories';

    if (!isDataExpired(storageKey)) {
      const cached = getFromLocalStorage(storageKey);
      if (cached) return cached;
    }

    try {
      const response = await fetch(
        'https://6pt4tfynw4.execute-api.us-east-1.amazonaws.com/prod/categories',
        { method: 'GET', mode: 'cors' }
      );

      if (!response.ok) return [];

      const data = await response.json();
      if (!Array.isArray(data)) return [];

      saveToLocalStorage(storageKey, data);
      return data;
    } catch (err) {
      console.error('Unexpected error in fetchCategories:', err);
      return [];
    }
  };

  const fetchAllowedCategories = async (allowedSlugs = []) => {
    const categories = await fetchCategories();
    return categories.filter((cat) => allowedSlugs.includes(cat.slug));
  };

  const fetchPostBySlug = async (slug) => {
    try {
      const response = await fetch(
        `https://6pt4tfynw4.execute-api.us-east-1.amazonaws.com/prod/posts?slug=${slug}`,
        { method: 'GET', mode: 'cors' }
      );

      if (!response.ok) return null;

      const data = await response.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error('Unexpected error fetching post by slug:', err);
      return null;
    }
  };

  const getPostBySlugFromLocalStorage = (slug) => {
    const allPosts = getFromLocalStorage('wordpressPosts-tag-tvm');
    if (!allPosts) return null;
    return allPosts.find((post) => post.slug === slug) || null;
  };

  const fetchPostsByCategoryFromTVM = async (categoryId) => {
    const tvmPosts = await fetchPostsOnlyTVM();
    return tvmPosts.filter(
      (post) => Array.isArray(post.categories) && post.categories.includes(categoryId)
    );
  };

  return {
    fetchCategories,
    fetchAllowedCategories,
    fetchPostsOnlyTVM,
    fetchPostsByCategoryFromTVM,
    fetchPostBySlug,
    getPostBySlugFromLocalStorage,
  };
};

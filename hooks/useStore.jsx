import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => {
      return {
        blogposts: [],
        activePost: null,
        categories: [],
        addBlogpost: newPost => {
          const id = nanoid();
          set(state => {
            return {
              blogposts: [
                ...state.blogposts,
                { id, ...newPost, created: new Date() },
              ],
            };
          });
          return id;
        },
        setActivePost: id => {
          set(state => {
            return {
              activePost: state.blogposts.find(blogpost => blogpost.id === id),
            };
          });
          return get().activePost;
        },
        addCategory: newCategory => {
          set(state => {
            return {
              categories: [...state.categories, { ...newCategory }],
            };
          });
        },
      };
    },
    { name: 'blog' }
  )
);

export default useStore;

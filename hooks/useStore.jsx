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
        alerts: [],
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
        addAlert: (message, severity) => {
          set(state => {
            return {
              alerts: [...state.alerts, { id: nanoid(), severity, message }],
            };
          });
        },
        removeAlert: id => {
          set(state => {
            return {
              alerts: state.alerts.filter(alert => alert.id !== id),
            };
          });
        },
      };
    },
    {
      name: 'blog',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== 'alerts')
        ),
    }
  )
);

export default useStore;

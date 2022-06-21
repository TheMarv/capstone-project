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
        removeBlogpost: id => {
          set(state => {
            return {
              blogposts: state.blogposts.filter(post => post.id !== id),
            };
          });
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
        editCategory: (newCategory, oldSlug) => {
          set(state => {
            return {
              categories: state.categories.map(category =>
                category.slug === oldSlug ? newCategory : category
              ),
            };
          });
        },
        removeCategory: categorySlug => {
          set(state => {
            return {
              categories: state.categories.filter(
                category => category.slug !== categorySlug
              ),
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

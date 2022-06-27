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
        customs: [],
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
        editBlogpost: newBlogpost => {
          set(state => {
            return {
              blogposts: state.blogposts.map(post =>
                post.id === newBlogpost.id ? newBlogpost : post
              ),
            };
          });
        },
        findCategory: slug => {
          return get().categories.find(category => category.slug === slug);
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
        addCustom: newCustom => {
          if (get().findCustom(newCustom.name)) {
            return false;
          }
          set(state => {
            return {
              customs: [
                ...state.customs,
                { id: nanoid(), ...newCustom, entries: [] },
              ],
            };
          });
          return true;
        },
        findCustom: name => {
          return get().customs.find(custom => custom.name === name);
        },
        addCustomEntry: (customName, entry) => {
          set(state => {
            return {
              customs: state.customs.map(custom =>
                custom.name === customName
                  ? {
                      ...custom,
                      entries: [...custom.entries, { ...entry, id: nanoid() }],
                    }
                  : custom
              ),
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

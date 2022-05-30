import { nanoid } from 'nanoid';
import create from 'zustand';

const useStore = create((set, get) => {
  return {
    blogposts: [
      {
        id: '1',
        title: 'Test Blog Post',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor, felis vel ornare dapibus, turpis sem faucibus mi, nec posuere mi magna non libero. Sed sed risus ut leo facilisis congue in eu magna. Integer euismod massa vel ligula consequat, id sollicitudin orci ultrices. Sed imperdiet porta tempus. Phasellus in metus ullamcorper odio tincidunt scelerisque. Pellentesque eleifend euismod mi. Maecenas efficitur neque eget auctor ornare. Cras facilisis ex non nunc efficitur consectetur id eu lacus. In blandit felis eu neque consequat, ut tempus nunc pulvinar. Praesent interdum nibh dui, nec congue orci eleifend in.',
        created: new Date(),
      },
      {
        id: '2',
        title: 'Another Blog Post',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor, felis vel ornare dapibus, turpis sem faucibus mi, nec posuere mi magna non libero. Sed sed risus ut leo facilisis congue in eu magna. Integer euismod massa vel ligula consequat, id sollicitudin orci ultrices. Sed imperdiet porta tempus. Phasellus in metus ullamcorper odio tincidunt scelerisque. Pellentesque eleifend euismod mi. Maecenas efficitur neque eget auctor ornare. Cras facilisis ex non nunc efficitur consectetur id eu lacus. In blandit felis eu neque consequat, ut tempus nunc pulvinar. Praesent interdum nibh dui, nec congue orci eleifend in.',
        created: new Date(),
      },
    ],
    activePost: null,
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
  };
});

export default useStore;

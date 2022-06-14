import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor</p>,
});

const editorHeight = 300;

export default function Richtext({ value, onChange }) {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
        ['clean'],
      ],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
  ];

  return (
    <StyledEditor>
      <ReactQuill
        formats={formats}
        modules={modules}
        value={value}
        onChange={onChange}
        style={{
          height: editorHeight - 44 /* 44 is the height of the toolbox */,
        }}
      />
    </StyledEditor>
  );
}

const StyledEditor = styled.div`
  height: ${editorHeight}px;
  .quill > .ql-toolbar:nth-child(2) {
    display: none !important; /* required because sometimes quill will double the toolbox */
  }
`;

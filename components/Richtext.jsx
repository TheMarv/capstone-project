import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const editorHeight = 300;

export default function Richtext({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height: editorHeight,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | formatselect | achor | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'table | code | visualblocks | insertdatetime | ' +
            'removeformat | help',
          content_style:
            'html, body { background-color: #212121; color: white; } body { font-size:14px }',
          skin: 'oxide-dark',
        }}
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        onEditorChange={input => onChange(input)}
        id="rte"
      />
    </>
  );
}

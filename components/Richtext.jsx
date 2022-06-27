import { Editor } from '@tinymce/tinymce-react';
// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide-dark/skin.min.css';

import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

import 'tinymce/models/dom/model';

/* eslint import/no-webpack-loader-syntax: off */
import contentCss from 'tinymce/skins/content/default/content.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';

const editorHeight = 300;
export default function Richtext({ value, onChange }) {
  return (
    <Editor
      value={value}
      onEditorChange={input => onChange(input)}
      init={{
        content_css: false,
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
          'bold italic backcolor | alignleft aligncenter | ' +
          'undo redo | formatselect | achor | ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'table | code | visualblocks | insertdatetime | ' +
          'removeformat | help',
        skin: false,
        content_style: [
          'html, body { background-color: #212121; color: white; } body { font-size:14px }',
          contentCss,
          contentUiCss,
        ].join('\n'),
      }}
    />
  );
}

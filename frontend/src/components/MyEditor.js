// File: MyCMS/frontend/src/components/MyEditor.js

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyEditor = ({ onChange, data }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onReady={editor => {
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
          'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
          'mediaEmbed', 'undo', 'redo'
        ],
        ckfinder: {
          uploadUrl: '/upload' // Update with your upload URL if needed
        }
      }}
    />
  );
};

export default MyEditor;

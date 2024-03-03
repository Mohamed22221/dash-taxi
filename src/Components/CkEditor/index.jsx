import React from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CkEditor = ({ value, name, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      name={name}
      onChange={(_, editor) =>
        onChange({
          target: {
            name,
            value: editor.getData(),
          },
        })
      }
    />
  );
};

export default CkEditor;

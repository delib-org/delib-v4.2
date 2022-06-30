import { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";

let saveState: Object = {};

function AEditor() {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const content = localStorage.getItem("content");
    if(content) console.log(JSON.parse(content))
  
    if (false) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse('')));
    } else {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    axios
      .get(`/cosultations/get-text?textId=62bdac01305a762b8bc661ea`)
      .then(({ data }) => {
        console.log(data);
        try {
          if (!data) throw new Error("No data in axios");

          const { text } = data;

          if (!text) throw new Error("No text in data");

          const { saveState } = text;
          if (!saveState) throw new Error("no saveState in text");
          console.log(saveState);
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(saveState))));
        } catch (error) {
          console.error(error);
          setEditorState(EditorState.createEmpty());
        }
      })
      .catch((err) => console.error(err));
  }, []);

  function _onBoldClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }

  function onChange(editorState: EditorState) {
    console.log("change");
    const contentState = editorState.getCurrentContent();
    saveState = convertToRaw(contentState);

    localStorage.setItem("content", JSON.stringify(saveState));
    setEditorState(editorState);
  }

  async function handleSave() {
    console.log(saveState);
    const saveStateString = JSON.stringify(saveState);
    const { data } = await axios.post("/cosultations/add-text", { saveState:saveStateString });
    console.log(data);
    try {
    } catch (error) {
      console.error(error);
    }
  }

  function handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  return (
    <div>
      <button onClick={_onBoldClick}>B</button>
      <div style={{ background: "wheat" }}>
        <Editor
          readOnly={false}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AEditor;

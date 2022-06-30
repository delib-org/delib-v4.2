import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../control/hooks";
import { createEditor,BaseEditor, Descendant} from 'slate';
import { Slate, Editable, withReact,ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue:Array<any> = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]


const Intro = () => {
  const { consultationId } = useParams();
  const [editor] = useState(() => withReact(createEditor()))

  const consultation = useAppSelector((state) =>
    state.consultations.consultations.find(
      (cnsl) => cnsl._id === consultationId
    )
  );



  if (consultation)
    return (
      <main>
        <div className="wrapper">
        <Slate editor={editor} value={initialValue}>
        <Editable />
        </Slate>
          <div className="intro">{consultation.description}</div>
        </div>
      </main>
    );
  else return null;
};

export default Intro;

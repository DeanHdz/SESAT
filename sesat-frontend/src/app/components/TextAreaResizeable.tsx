import { useRef, useState } from "react";

import { useAutosizeTextArea } from "../../hooks/useAutosizeTextArea.hook";

const TextAreaReziseable = () => 
{
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <div className="w-full flex flex-col">
      <label htmlFor="review-text my-">Review:</label>
      <textarea
        id="review-text"
        onChange={handleChange}
        placeholder="What did you like or dislike?"
        ref={textAreaRef}
        rows={1}
        value={value}
      />
    </div>
  );
}

export default TextAreaReziseable
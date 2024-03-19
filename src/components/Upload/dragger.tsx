import React, { FC, useState, DragEvent, ReactNode } from 'react';
import classNames from 'classnames';

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: ReactNode;
};
export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [ dragOver, setDragOver ] = useState(false);
  const betterClass = classNames('better-uploader-dragger', {
    'is-dragover': dragOver,
  });
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div 
      className={ betterClass }
      onDragOver={ e => { handleDrag(e, true) }}
      onDragLeave={ e => { handleDrag(e, false) }}
      onDrop={ handleDrop }
    >
      { children }
    </div>
  )
};

export default Dragger;
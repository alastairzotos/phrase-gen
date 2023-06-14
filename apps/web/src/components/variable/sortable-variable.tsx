import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { VariableValue } from '@bitmetro/phrase-gen';
import { DragOutlined } from '@ant-design/icons';

import { Variable } from './variable';

interface Props {
  variable: VariableValue;
}

export const SortableVariable: React.FC<Props> = ({ variable }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: variable.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 200
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Variable
        variable={variable}
        dragHandle={
          <a {...listeners} {...attributes}>
            <DragOutlined />
          </a>
        }
      />
    </div>
  );
}
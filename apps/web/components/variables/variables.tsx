import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable';

import { usePhraseGenState } from '../../state/phrase-gen';
import { Column } from '../column';
import { SortableVariable } from '../variable/sortable-variable';

import styles from './variables.module.css';

export const Variables: React.FC = () => {
  const [variables, addVariable, setVariables] = usePhraseGenState(s => [s.variables, s.addVariable, s.setVariables]);

  const [, setItems] = useState(variables.map(v => v.name));

  useEffect(() => {
    setItems(variables.map(v => v.name));
  }, [variables.map(v => v.name).join('-')]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddVariable = () => {
    addVariable(`variable-${variables.length + 1}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over!.id.toString());

        const newList = arrayMove(items, oldIndex, newIndex);
        const newVariables = newList.map(id => variables.find(v => v.name === id)!);

        setVariables(newVariables);

        return newList;
      })
      
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Column
        title="Variables"
        extra={
          <Button size="small" type="primary" onClick={handleAddVariable}>
            <PlusOutlined /> Variable
          </Button>
        }
      >
        <div className={styles.wrapper}>
          <SortableContext
            items={variables.map(v => v.name)}
            strategy={rectSortingStrategy}
          >
            {variables.map(variable => (
              <SortableVariable key={variable.name} variable={variable} />
            ))}
          </SortableContext>
        </div>
      </Column>
    </DndContext>
  )
};

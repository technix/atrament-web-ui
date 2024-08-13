import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';

const MenuListItem = ({
  children,
  key,
  onSelect,
  isDisabled = false,
  isDeletable = false,
  onDelete = ()=>{},
  deletePrompt = '',
  attributes={}
}) => {
  const [ isDeleteDialog, displayDeleteDialog ] = useState(false);
  
  const showDeleteDialog = () => displayDeleteDialog(true);
  const hideDeleteDialog = () => displayDeleteDialog(false);
  const handleDelete = (ev) => {
    onDelete(ev);
    hideDeleteDialog();
  }
  
  if (isDeleteDialog) {
    return (
      <div class={style.container}>
        <div class={style.prompt}>{deletePrompt}</div>
        <button onClick={handleDelete} class={`${style.menu_item} ${style.delete_item}`} {...attributes}>
          <Text id='yes' />
        </button>
        <button key={key} onClick={hideDeleteDialog} class={style.menu_item} {...attributes}>
          <Text id='no' />
        </button>
      </div>
    );
  }

  return (
    <div class={style.container}>
      <button
        key={key}
        onClick={onSelect}
        disabled={isDisabled}
        class={`${style.menu_item} ${isDeletable && style.is_deletable}`}
        {...attributes}
      >
        {children}
      </button>
      {(isDeletable && !isDisabled) && 
        <button
          key={key}
          onClick={showDeleteDialog}
          class={`${style.menu_item} ${style.delete_button}`}
          {...attributes}
        >
          &#x2715;
        </button>}
    </div>
  );
};

export default MenuListItem;
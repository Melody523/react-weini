import React, { useState } from 'react';
import './SortGroupItem.less';

function SortGroupItem(props) {
  const [isShow, setIsShow] = useState(false);
  // const [chooseItem, setChooseItem] = useState([]);
  function sortItemClick(id) {
    let newChooseItem = JSON.parse(JSON.stringify(props.chooseItem))
    if (typeof(id) !== 'number' && id.indexOf('-') !== -1) {
      newChooseItem = [id]
    } else if (!props.isCheckbox) {
      newChooseItem = [id]
    } else {
      if (newChooseItem.indexOf(id) !== -1) {
        newChooseItem.splice(newChooseItem.indexOf(id), 1)
      } else {
        newChooseItem.push(id)
      }
    }
    // setChooseItem(newChooseItem)
    props.chooseList(newChooseItem)
  }
  return (
    <div className={isShow ? 'sort-group-item autoHeight': 'sort-group-item'}>
      <div className="sort-group-title">
        {props.sortGroupTitle}
        {props.sortGroupList.length > 6 && <div className={isShow ? 'icon show-icon' : 'icon'} onClick={() => setIsShow(!isShow)}> </div>}
      </div>
      <ul className="sort-list" >
        {
          props.sortGroupList.map((item) => (
            <li className={props.chooseItem.indexOf(item.id) !== -1 ? 'sort-item text-overflow1 sort-item-active' : 'sort-item text-overflow1'} 
              key={item.id} 
              onClick={() => sortItemClick(item.id)} >{item.name}</li>
          ))
        }
      </ul>
      {
        props.sortRange
      }
    </div>
  );
}

export default SortGroupItem;

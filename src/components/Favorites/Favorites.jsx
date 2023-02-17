import React, {  useEffect, useState } from 'react'
import { BsXCircleFill } from "react-icons/bs";

function Favorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items'));
    if (savedItems) {
      setItems(savedItems);
    }
    console.log(items)
  }, []);

 function click(id){
  if (isSelected(id)) {
    // Si el elemento ya está seleccionado, eliminarlo del array
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setItems(updatedItems);
  }
 }

 
  function isSelected(id){
    return items.some((selectedItem) => selectedItem.id === id);
  }

  return (
    <>
    <div id='header-favorites'>Sus foto favoritas</div> 
    <div id='container-favorite'>
      {items.map((fotos) => {
        return (
          <>
          <div key={fotos.id} id='fotos' style={{ backgroundImage: `url('${fotos.src.medium}')`, width: 300, height: 300, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '5px' }}>
         <BsXCircleFill id='icon-favorites' onClick={() => { click(fotos.id) }} ></BsXCircleFill> 
          </div>
          </>
        )
      })}
    </div>
      </>
  )
}

export default Favorites
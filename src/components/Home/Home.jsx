import React, { useContext, useState, useEffect } from 'react'
import { BsFillHeartFill } from "react-icons/bs";
import { DataContext } from '../context/data-provider';

function Home() {

 
  const { datas, item, setItem, searchText, updateSearchText } = useContext(DataContext);

  /*El problema que tenia al pesistir datos en el localStorage. Simplesmente tenemos que iniciar el estado 
    que estamos guardando nuevo datos que es el item, com el valor anterior del local Storage
  */
  const [initialItem] = useState(() => {
    const storedItem = localStorage.getItem('items');
    return storedItem ? JSON.parse(storedItem) : [];
  });

  // Setea el item por el setItem com el valor actual del local Storage
  useEffect(() => {
    setItem(initialItem);
  }, [initialItem, setItem]);


  function click(id) {

    // Compra el elemento cliqueado si el id es igual entonces guarde en el SelectedItem
    const selectedItem = datas.photos.find((photo) => photo.id === id);
    // Agrega el valor actual al array sin sobreEscribirlo
    setItem(prevItems => [...prevItems, selectedItem]);
    // Setea los elemento al LocalStorage sin SobreEscribirlo
    localStorage.setItem('items', JSON.stringify([...item, selectedItem]))


    if (isSelected(id)) {
      // Si el elemento ya está seleccionado, eliminarlo del array
      setItem(prevItems => prevItems.filter(item => item.id !== id));
      localStorage.setItem('items', JSON.stringify(item.filter(item => item.id !== id)));
    } else {
      // Si el elemento no está seleccionado, agregarlo al array
      setItem(prevItems => [...prevItems, selectedItem]);
      localStorage.setItem('items', JSON.stringify([...item, selectedItem]));
    }

  }

  // Función que identifica el elemento con el mismo id
  function isSelected(id) {
    return item.some((selectedItem) => selectedItem.id === id);
  }


  function handleInputChange(event){
    updateSearchText(event.target.value)
  }

  function handleFormSubmit(event){
    event.preventDefault();
    updateSearchText(searchText);
  }

  if (datas.length === 0) {
    return (
      <div>
        Cargando...
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label id='label-favorites'>
          Busque estilos de fotos:
          <input id='input-favorites' type="text" name="name" value={searchText} onChange={handleInputChange}/>
        </label>
      </form>
      <div id='container'>

        {datas.photos.map((fotos) => {
          return (
            <div key={fotos.id}>
              <div id='fotos' style={{ backgroundImage: `url('${fotos.src.medium}')`, width: 300, height: 300, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '5px' }}>
                <BsFillHeartFill id='icon' onClick={() => { click(fotos.id) }} style={{ color: isSelected(fotos.id) ? 'red' : 'white' }} />
                <span id='titulo'>{fotos.photographer}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}


export default Home
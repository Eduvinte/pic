import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Favorites from './components/Favorites/Favorites'

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/favorites' element={ <Favorites /> } />
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;
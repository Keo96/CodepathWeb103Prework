import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import Info from './pages/Info'
import { Link } from 'react-router-dom'
import { supabase } from './client'
import './App.css'

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    
    const fetchCards = async () => {
      const {data} = await supabase
      .from('creators')
      .select()
      .order('created_at', { ascending: true })

      setCards(data)

    }

    fetchCards()

  }, []);

  let element = useRoutes([
    {
      path:"/",
      element:<ShowCreators />
    },
    {
      path: "/create",
      element:<AddCreator />
    },
    {
      path:"/edit/:id",
      element: <EditCreator data={cards} />
    },
    {
      path:"info/:id",
      element: <Info data = {cards}/>
    }
  ]);

  return (
    <>
      <div>
        {element}
      </div>
    </>
  )
}

export default App

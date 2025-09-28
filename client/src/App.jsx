import { RouterProvider } from "react-router"
import router from "./routes/MainRoutes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCurrentUser } from "./features/auth/authSlice"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch])
  return (
    <RouterProvider router={router} />
  )
}

export default App
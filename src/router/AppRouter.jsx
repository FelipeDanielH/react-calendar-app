import { Routes } from "react-router-dom"

export const AppRouter = () => {

  const authStatus = 'not-aunthenticated';

  return (
    <Routes>
    {/*   {
        (authStatus === 'not-aunthenticated')
      } */}
      <Route path="/auth/*"/>
    </Routes>
  )
}
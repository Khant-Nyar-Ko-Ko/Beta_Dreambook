import { useRoutes } from "react-router-dom"
import UserRouter from "./routers/UserRouter"
import AuthRouter from "./routers/AuthRouter";
import { Toaster } from 'react-hot-toast';

const App = () => {

  const routes = [...UserRouter, ...AuthRouter];
  const routing = useRoutes(routes);
 
  return (
    <div>
       <Toaster position="bottom-center" />
      {routing}
    </div>
  )
}

export default App
import { useRoutes } from "react-router-dom"
import UserRouter from "./routers/UserRouter"
import AuthRouter from "./routers/AuthRouter";

const App = () => {

  const routes = [...UserRouter, ...AuthRouter];
  const routing = useRoutes(routes);
 
  return (
    <div>
      {routing}
    </div>
  )
}

export default App
import { HashRouter as Router } from "react-router-dom";

import "./App.css";

// custom-query Provider
import CustomQueryProvider from "./contexts/custom-query/customQueryContext";

import Navbar from "./layouts/navbar/navbar";
import Pages from "./pages/pages";

function App() {
   return (
      <div className="p-4 flex flex-col items-center gap-5 bg-gray-100 min-h-screen h-full">
         <div className="w-full container-width">
            <Router>
               <Navbar />
               <CustomQueryProvider>
                  <Pages />
               </CustomQueryProvider>
            </Router>
         </div>
      </div>
   );
}

export default App;

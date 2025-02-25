import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/core/routes";
import { Toaster } from "./components/ui/sonner";
import { GlobalLayout } from "./layouts";

//

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalLayout>
          <AppRoutes />
          <Toaster />
        </GlobalLayout>
      </BrowserRouter>
    </>
  );
}

export default App;

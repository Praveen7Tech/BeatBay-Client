import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";
import { artistRoutes } from "./artist.routes";
import NotFound from "../pages/page-notFound";
import Unauthorized from "../pages/unAutharized-page";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/core/components/Spinner";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {authRoutes}
          {userRoutes}
          {adminRoutes}
          {artistRoutes}

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster />
    </BrowserRouter>
  );
};

export default AppRouter;
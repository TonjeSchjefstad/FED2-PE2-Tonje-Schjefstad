import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import VenueDetail from "./pages/VenueDetail";
import Profile from "./pages/Profile";
import CreateVenue from "./pages/CreateVenue";
import EditVenue from "./pages/EditVenue";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-venue" element={<CreateVenue />} />
          <Route path="/edit-venue/:id" element={<EditVenue />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

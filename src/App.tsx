import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Books from "@/pages/Books";
import BookDetail from "@/pages/BookDetail";
import Cart from "@/pages/Cart";
import SearchPage from "@/pages/Search";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Authors from "@/pages/Authors";
import ComboSets from "@/pages/ComboSets";
import GiftCoupons from "@/pages/GiftCoupons";
import Discounts from "@/pages/Discounts";
import Membership from "@/pages/Membership";
import Events from "@/pages/Events";
import Distributors from "@/pages/Distributors";
import PublishEbook from "@/pages/PublishEbook";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Careers from "@/pages/Careers";
import Rights from "@/pages/Rights";
import Catalog from "@/pages/Catalog";
import { MembershipFloat } from "./components/sections/MembershipFloat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:slug" element={<BookDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/combo-sets" element={<ComboSets />} />
              <Route path="/gift-coupons" element={<GiftCoupons />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/events" element={<Events />} />
              <Route path="/distributors" element={<Distributors />} />
              <Route path="/publish" element={<PublishEbook />} />
              <Route path="/rights" element={<Rights />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <MembershipFloat />
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LostAndFound from "./pages/LostAndFound";
import RoommateFinder from "./pages/RoommateFinder";
import BookBank from "./pages/BookBank";
import Noticeboard from "./pages/Noticeboard";
import NotesSharing from "./pages/NotesSharing";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/lost-found" element={
              <ProtectedRoute>
                <Layout><LostAndFound /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/roommate" element={
              <ProtectedRoute>
                <Layout><RoommateFinder /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/books" element={
              <ProtectedRoute>
                <Layout><BookBank /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/noticeboard" element={
              <ProtectedRoute>
                <Layout><Noticeboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <Layout><NotesSharing /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

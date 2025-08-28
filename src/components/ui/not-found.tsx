import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          This page seems to have vanished into the digital void
        </p>
        <p className="text-lg text-gray-500 leading-relaxed">
          The page you're seeking might have been archived, relocated, or is
          currently being reimagined. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            to="/"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="mr-2 w-5 h-5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/projects"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Search className="mr-2 w-5 h-5" />
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { Highlights } from './components/Highlights';
import { RoomsShowcase } from './components/RoomsShowcase';
import { Facilities } from './components/Facilities';
import { Gallery } from './components/Gallery';
import { TestimonialSection } from './components/TestimonialSection';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { FloatingBookingBar } from './components/FloatingBookingBar';
import { BookingModal } from './components/BookingModal';
import { Room } from './types';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{
    checkIn?: string;
    checkOut?: string;
    roomType?: string;
    guests?: string;
  }>({});

  const handleOpenBooking = () => {
    setSelectedRoom(null);
    setIsBookingOpen(true);
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithDetails = (details: {
    checkIn: string;
    checkOut: string;
    roomType: string;
    guests: string;
  }) => {
    setBookingDetails(details);
    setSelectedRoom(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 flex flex-col selection:bg-gold selection:text-charcoal-900">
      {/* Primary Sticky Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Accommodation Experience Flow */}
      <main className="flex-grow">
        {/* 1. Cinematic Hero Section */}
        <Hero onOpenBookingWithDetails={handleOpenBookingWithDetails} />

        {/* 2. Brand Identity & Sanskrit Ethos */}
        <BrandIntro />

        {/* 3. Property Highlights */}
        <Highlights onOpenBooking={handleOpenBooking} />

        {/* 4. Rooms & Suites Showcase */}
        <RoomsShowcase onSelectRoom={handleSelectRoom} />

        {/* 5. Authentic Accommodation Facilities */}
        <Facilities />

        {/* 6. Curated Property Gallery */}
        <Gallery />

        {/* 7. Authentic Guest Testimony */}
        <TestimonialSection />

        {/* 8. Location & Front Desk Reception */}
        <LocationContact onOpenBooking={handleOpenBooking} />
      </main>

      {/* 9. Refined Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* 10. Persistent Floating Concierge / Booking Bar */}
      <FloatingBookingBar onOpenBooking={handleOpenBooking} />

      {/* 11. Direct Stay Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDetails={bookingDetails}
        initialRoom={selectedRoom}
      />
    </div>
  );
}

export default App;

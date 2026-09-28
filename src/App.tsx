/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastProvider, useToast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { HowItWorksView } from './views/HowItWorksView';
import { GalleryView } from './views/GalleryView';
import { SavedDesignsView } from './views/SavedDesignsView';
import { UploadView } from './views/UploadView';
import { PersonalizeView } from './views/PersonalizeView';
import { ProcessingView } from './views/ProcessingView';
import { ResultsView } from './views/ResultsView';
import { ReviveResult, RoomPreAnalysis, DesignStyle, RoomType } from './types';
import { reviveRoom, ReviveRequestPayload } from './services/api';
import { getSavedDesigns } from './services/storage';

function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [savedCount, setSavedCount] = useState<number>(0);

  // Redesign workflow state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [preAnalysis, setPreAnalysis] = useState<RoomPreAnalysis | null>(null);
  const [currentPayload, setCurrentPayload] = useState<ReviveRequestPayload | null>(null);
  const [currentResult, setCurrentResult] = useState<ReviveResult | null>(null);

  // Sync saved count
  useEffect(() => {
    setSavedCount(getSavedDesigns().length);
  }, [currentView]);

  const handleStartUpload = () => {
    setCurrentView('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageSelected = (imageDataUrl: string, analysis: RoomPreAnalysis | null) => {
    setUploadedImage(imageDataUrl);
    setPreAnalysis(analysis);
    setCurrentView('personalize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePersonalizeSubmit = async (payload: ReviveRequestPayload) => {
    setCurrentPayload(payload);
    setCurrentView('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await reviveRoom(payload);
      setCurrentResult(result);
      setCurrentView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to revive room:', err);
      // Even on failure, reviveRoom returns a resilient fallback result
    }
  };

  const handleTryAlternativeStyle = async (newStyle: DesignStyle) => {
    if (!currentPayload) return;
    const updatedPayload: ReviveRequestPayload = {
      ...currentPayload,
      style: newStyle,
    };
    handlePersonalizeSubmit(updatedPayload);
  };

  const handleOpenSavedDesign = (design: ReviveResult) => {
    setCurrentResult(design);
    setCurrentPayload(design.userInputs as ReviveRequestPayload);
    setUploadedImage(design.originalImageUrl);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInspiration = (sampleRoomType: string, sampleStyle: string) => {
    setCurrentView('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#222120] selection:bg-[#E2EBE4] selection:text-[#1E3A2F]">
      {/* Top Bar Contract Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onStartUpload={handleStartUpload}
            onExploreGallery={() => setCurrentView('gallery')}
            onHowItWorks={() => setCurrentView('how-it-works')}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView onStartUpload={handleStartUpload} />
        )}

        {currentView === 'gallery' && (
          <GalleryView onSelectInspiration={handleSelectInspiration} />
        )}

        {currentView === 'saved' && (
          <SavedDesignsView
            onOpenDesign={handleOpenSavedDesign}
            onStartNew={handleStartUpload}
          />
        )}

        {currentView === 'upload' && (
          <UploadView
            onImageSelected={handleImageSelected}
            onBack={() => setCurrentView('home')}
            initialImage={uploadedImage}
          />
        )}

        {currentView === 'personalize' && uploadedImage && (
          <PersonalizeView
            uploadedImage={uploadedImage}
            preAnalysis={preAnalysis}
            onBack={() => setCurrentView('upload')}
            onSubmit={handlePersonalizeSubmit}
          />
        )}

        {currentView === 'processing' && currentPayload && (
          <ProcessingView
            roomType={currentPayload.roomType}
            style={currentPayload.style}
            budget={currentPayload.budget}
          />
        )}

        {currentView === 'results' && currentResult && (
          <ResultsView
            result={currentResult}
            onRedesignAnother={handleStartUpload}
            onTryAlternativeStyle={handleTryAlternativeStyle}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

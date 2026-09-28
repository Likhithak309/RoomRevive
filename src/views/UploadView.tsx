import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, ArrowRight, RotateCcw, Trash2, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { RoomImages } from '../assets/images';
import { RoomPreAnalysis } from '../types';
import { analyzeRoomPhoto } from '../services/api';
import { useToast } from '../components/Toast';
import { optimizeImageForUpload } from '../utils/image';

interface UploadViewProps {
  onImageSelected: (imageDataUrl: string, preAnalysis: RoomPreAnalysis | null) => void;
  onBack: () => void;
  initialImage?: string | null;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onImageSelected,
  onBack,
  initialImage = null,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preAnalysis, setPreAnalysis] = useState<RoomPreAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleProcessFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (JPG, PNG, WEBP)', 'error');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showToast('File size exceeds limit. Please choose a photo under 15MB.', 'error');
      return;
    }

    setIsAnalyzing(true);
    try {
      // Optimize image resolution & filesize before sending to API
      const { dataUrl, mimeType } = await optimizeImageForUpload(file);
      setImagePreview(dataUrl);

      // Trigger pre-analysis with optimized image
      const analysis = await analyzeRoomPhoto(dataUrl, mimeType);
      setPreAnalysis(analysis);
      showToast('Room photo analyzed successfully!', 'success');
    } catch (err: any) {
      console.warn('Pre-analysis notice:', err?.message);
    } finally {
      setIsAnalyzing(false);
    }
  }, [showToast]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleSelectSample = async (sampleUrl: string, sampleName: string) => {
    setImagePreview(sampleUrl);
    setIsAnalyzing(true);
    showToast(`Loaded ${sampleName}`, 'info');
    try {
      const analysis = await analyzeRoomPhoto(sampleUrl, 'image/jpeg');
      setPreAnalysis(analysis);
    } catch {
      // Ignore
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    setPreAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (!imagePreview) {
      showToast('Please upload or select a room photo to continue', 'error');
      return;
    }
    onImageSelected(imagePreview, preAnalysis);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
          <span>Step 01 of 03</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#222120] tracking-tight">
          Upload Your Room
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
          Take a wide-angle photo of your space in daylight. Our AI analyzes your furniture, layout, and lighting.
        </p>
      </div>

      {/* Main Upload Card */}
      {!imagePreview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all bg-white ${
            isDragging
              ? 'border-[#355E4C] bg-[#EAEFEA]/30 scale-[1.01]'
              : 'border-stone-300 hover:border-stone-400'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />

          <div className="max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#EAEFEA] text-[#355E4C] flex items-center justify-center shadow-sm">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#222120]">
                Drop your room photo here
              </h3>
              <p className="text-xs text-stone-500">
                JPG, PNG or WEBP · Up to 10MB
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-sm"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Choose Photo</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-sm space-y-6">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 border border-black/[0.06]">
            <img
              src={imagePreview}
              alt="Room preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Analysis Overlay Tag */}
            <div className="absolute top-4 left-4">
              {isAnalyzing ? (
                <div className="inline-flex items-center gap-2 bg-[#222120]/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-stone-200">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#88B29C]" />
                  <span>Analyzing room layout & furniture...</span>
                </div>
              ) : preAnalysis ? (
                <div className="inline-flex items-center gap-2 bg-[#355E4C]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E2EBE4]" />
                  <span>Detected: {preAnalysis.detectedRoomType}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Real-time AI Room Pre-Analysis insights */}
          {preAnalysis && (
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Vision Observations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 font-medium">Detected Furniture:</span>
                  <div className="text-stone-800 font-medium mt-0.5">
                    {preAnalysis.detectedFurniture?.join(', ') || 'Bed, Desk, Seating'}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">Current Lighting:</span>
                  <div className="text-stone-800 font-medium mt-0.5">
                    {preAnalysis.currentLighting || 'Standard overhead'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replace Image</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-md active:scale-95"
            >
              <span>Continue to Personalize</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Instant Sample Rooms Carousel */}
      <div className="space-y-3 pt-4 border-t border-black/[0.06]">
        <div className="text-left">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Don't have a photo handy? Try a sample space:
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => handleSelectSample(RoomImages.heroBefore, 'Compact Bedroom Sample')}
            className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-[#355E4C] text-left transition-all hover:shadow-sm"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
              <img
                src={RoomImages.heroBefore}
                alt="Sample bedroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-800">Compact Bedroom</div>
              <div className="text-[11px] text-stone-500">Lived-in student space</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSample(RoomImages.galleryStudy, 'Study / Home Office Sample')}
            className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-[#355E4C] text-left transition-all hover:shadow-sm"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
              <img
                src={RoomImages.galleryStudy}
                alt="Sample study"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-800">Study / Work Nook</div>
              <div className="text-[11px] text-stone-500">Unoptimized work room</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectSample(RoomImages.galleryLiving, 'Living Room Sample')}
            className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-[#355E4C] text-left transition-all hover:shadow-sm"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
              <img
                src={RoomImages.galleryLiving}
                alt="Sample living room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-800">Small Living Room</div>
              <div className="text-[11px] text-stone-500">Apartment lounge area</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

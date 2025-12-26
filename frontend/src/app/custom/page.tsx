"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Crop, ShoppingCart, RotateCcw, Check, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";
import ReactCrop, { Crop as CropType, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// A3 aspect ratio (297mm x 420mm = 0.7071 or 1:√2)
const A3_ASPECT = 297 / 420;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): CropType {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function CustomPrintPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [step, setStep] = useState<"upload" | "crop" | "preview" | "done">("upload");
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setStep("crop");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setStep("crop");
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, A3_ASPECT));
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImageUrl(null);
    setStep("upload");
    setZoom(1);
  };

  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      toast.error("Please select a crop area first");
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // A3 at 300 DPI = 3508 x 4961 pixels, but we'll use a scaled version
    const outputWidth = 2480;  // A3 at 210 DPI
    const outputHeight = 3508;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      outputWidth,
      outputHeight
    );

    const croppedUrl = canvas.toDataURL("image/jpeg", 0.95);
    setCroppedImageUrl(croppedUrl);
    setStep("preview");
    toast.success("Image cropped to A3 size!");
  };

  const addToCart = () => {
    if (!croppedImageUrl) return;

    // Store in localStorage for cart
    const cartItems = JSON.parse(localStorage.getItem("versehaven_cart") || "[]");
    const newItem = {
      id: `custom-${Date.now()}`,
      type: "custom",
      title: "Custom A3 Poster",
      price: 399,
      quantity: 1,
      image: croppedImageUrl,
      createdAt: new Date().toISOString(),
    };
    cartItems.push(newItem);
    localStorage.setItem("versehaven_cart", JSON.stringify(cartItems));

    setStep("done");
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            Custom A3 Poster Print
          </h1>
          <p className="mt-3 text-[var(--text-muted)] max-w-xl mx-auto">
            Upload your image, crop it to A3 size, and add to cart. No login required!
          </p>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {["Upload", "Crop", "Preview", "Cart"].map((s, i) => {
              const stepIndex = ["upload", "crop", "preview", "done"].indexOf(step);
              const isActive = i <= stepIndex;
              return (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isActive ? "bg-[var(--accent)] text-white" : "bg-[var(--border)] text-[var(--text-muted)]"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:inline ${isActive ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}>
                    {s}
                  </span>
                  {i < 3 && <div className={`w-8 h-0.5 mx-2 ${isActive ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`} />}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 md:p-8"
        >
          {/* Upload Step */}
          {step === "upload" && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-[var(--border)] rounded-xl p-12 text-center hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto text-[var(--text-muted)] mb-4" />
                <p className="text-xl font-medium text-[var(--text)]">
                  Drop your image here
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  or click to browse (JPG, PNG, WEBP)
                </p>
                <p className="text-xs text-[var(--accent)] mt-4">
                  Recommended: High resolution image for best print quality
                </p>
              </label>
            </div>
          )}

          {/* Crop Step */}
          {step === "crop" && preview && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    <RotateCcw className="w-4 h-4" /> Start Over
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                    className="p-2 hover:bg-[var(--bg-light)] rounded-lg"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-[var(--text-muted)] w-12 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                    className="p-2 hover:bg-[var(--bg-light)] rounded-lg"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Crop Area */}
                <div className="flex-1 bg-[var(--bg)] rounded-xl p-4 overflow-auto max-h-[500px]">
                  <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", transition: "transform 0.2s" }}>
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={A3_ASPECT}
                      className="max-w-full"
                    >
                      <img
                        ref={imgRef}
                        src={preview}
                        alt="Upload"
                        onLoad={handleImageLoad}
                        className="max-w-full"
                      />
                    </ReactCrop>
                  </div>
                </div>

                {/* A3 Preview */}
                <div className="lg:w-64">
                  <div className="sticky top-4">
                    <h3 className="text-sm font-medium text-[var(--text)] mb-3 flex items-center gap-2">
                      <Crop className="w-4 h-4" /> A3 Preview
                    </h3>
                    <div className="bg-white rounded-lg shadow-lg p-2 aspect-[297/420] flex items-center justify-center border-2 border-[var(--border)]">
                      <p className="text-xs text-[var(--text-muted)] text-center px-4">
                        Drag the crop box<br />to adjust print area
                      </p>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
                      297mm × 420mm
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={generateCroppedImage}
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  <Crop className="w-5 h-5" />
                  Apply Crop & Preview
                </button>
              </div>
            </div>
          )}

          {/* Preview Step */}
          {step === "preview" && croppedImageUrl && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep("crop")}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <RotateCcw className="w-4 h-4" /> Adjust Crop
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Cropped Image */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-xl p-4 max-w-md mx-auto">
                    <img
                      src={croppedImageUrl}
                      alt="A3 Preview"
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>

                {/* Order Details */}
                <div className="md:w-80">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Size</span>
                        <span className="text-[var(--text)]">A3 (297×420mm)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Paper</span>
                        <span className="text-[var(--text)]">300gsm Matte</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Quantity</span>
                        <span className="text-[var(--text)]">1</span>
                      </div>
                      <hr className="border-[var(--border)]" />
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-[var(--text)]">Total</span>
                        <span className="text-[var(--accent)]">₹399</span>
                      </div>
                    </div>

                    <button
                      onClick={addToCart}
                      className="w-full btn btn-primary mt-6 text-lg py-4"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Done Step */}
          {step === "done" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[var(--success)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[var(--success)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                Added to Cart!
              </h2>
              <p className="text-[var(--text-muted)] mb-8">
                Your custom A3 poster has been added to your cart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="btn btn-secondary"
                >
                  Create Another
                </button>
                <a href="/cart" className="btn btn-primary">
                  <ShoppingCart className="w-5 h-5" />
                  View Cart
                </a>
              </div>
            </div>
          )}
        </motion.div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Premium A3 Quality",
              description: "Printed on 300gsm matte art paper",
            },
            {
              title: "A3 Size (297×420mm)",
              description: "Perfect for any room",
            },
            {
              title: "Fast Delivery",
              description: "Shipped within 3-5 business days",
            },
          ].map((item, index) => (
            <div key={index} className="card p-6 text-center">
              <h3 className="font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

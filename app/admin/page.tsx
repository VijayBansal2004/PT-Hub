"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, LogOut, Package, Image as ImageIcon, Film, LayoutGrid, Check, Pencil } from "lucide-react";
import Logo from "@/components/Logo";
import { Toaster, toast } from "sonner";
import { Product } from "@/app/data";
import { getProducts, saveProduct, deleteProduct } from "@/app/utils/products";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"Utilities" | "Jewellery" | "Dresses">("Utilities");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("5.0");
  const [reviewsCount, setReviewsCount] = useState("1");
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [colorsInput, setColorsInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const isUploading = isUploadingImage || isUploadingVideo;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("pt-hub-admin-logged-in");
    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
      loadCustomProducts();
    }
  }, []);

  const loadCustomProducts = () => {
    getProducts().then((allProducts) => {
      const customOnly = allProducts.filter((p) => p.id.startsWith("custom_"));
      setCustomProducts(customOnly);
    }).catch((e) => {
      console.error("Failed to load products from IndexedDB", e);
      setCustomProducts([]);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("pt-hub-admin-logged-in");
    router.push("/login");
  };

  const handleEditClick = (p: Product) => {
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price.toString());
    setDescription(p.description);
    setRating(p.rating.toString());
    setReviewsCount(p.reviewsCount.toString());
    setImage(p.image);
    setVideo(p.video || "");
    setColorsInput(p.colors ? p.colors.join(", ") : "");
    setFeaturesInput(p.features ? p.features.join(", ") : "");
    setEditingId(p.id);
    toast.info(`Editing: "${p.name}"`, {
      description: "Form fields populated. Click Update to save changes.",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setVideo("");
    setColorsInput("");
    setFeaturesInput("");
    setRating("5.0");
    setReviewsCount("1");
    toast("Edit cancelled");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "video" && file.size > 30 * 1024 * 1024) {
      toast.error("Video file is too large!", {
        description: "To prevent browser memory lag, custom video files must be under 30MB.",
        duration: 6000,
      });
      setVideo("");
      e.target.value = "";
      return;
    }

    if (type === "image") {
      setIsUploadingImage(true);
      setImageProgress(0);
    } else {
      setIsUploadingVideo(true);
      setVideoProgress(0);
    }

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        if (type === "image") {
          setImageProgress(percent);
        } else {
          setVideoProgress(percent);
        }
      }
    };

    reader.onload = () => {
      if (typeof reader.result === "string") {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 10;
          if (type === "image") {
            setImageProgress(Math.min(currentProgress, 100));
          } else {
            setVideoProgress(Math.min(currentProgress, 100));
          }

          if (currentProgress >= 100) {
            clearInterval(interval);
            if (type === "image") {
              const img = new Image();
              img.src = reader.result as string;
              img.onload = () => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                  if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, width, height);
                const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

                setImage(compressedDataUrl);
                setIsUploadingImage(false);
                toast.success("Image uploaded & compressed successfully!");
              };
            } else {
              setVideo(reader.result as string);
              setIsUploadingVideo(false);
              toast.success("Lookbook video uploaded & parsed successfully!");
            }
          }
        }, 80);
      }
    };
    reader.onerror = () => {
      toast.error("File upload reading failed");
      if (type === "image") {
        setIsUploadingImage(false);
      } else {
        setIsUploadingVideo(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Product name is required");
    if (!price || isNaN(Number(price))) return toast.error("Valid product price is required");
    if (!description.trim()) return toast.error("Product description is required");
    if (!image) return toast.error("Product catalog image is required");

    // Colors parsing
    const colors = colorsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.startsWith("#") && (c.length === 4 || c.length === 7));

    // Features parsing
    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const newProduct: Product = {
      id: editingId || ("custom_" + Date.now()),
      name: name.trim(),
      category,
      price: Number(price),
      rating: Number(rating) || 5.0,
      reviewsCount: Number(reviewsCount) || 1,
      image,
      images: [image],
      video: video || "/assets/videos/demoVideo.mp4",
      description: description.trim(),
      features: features.length > 0 ? features : ["Premium imported quality", "Ergonomic modern design"],
      colors: colors.length > 0 ? colors : ["#3b82f6", "#1e3a8a"],
      isNew: true,
    };

    try {
      await saveProduct(newProduct);
      toast.success(editingId ? "Product updated successfully!" : "Product uploaded and published!", {
        description: `${newProduct.name} is now live.`,
        icon: "🎉",
      });

      // Reset Form
      setEditingId(null);
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setVideo("");
      setColorsInput("");
      setFeaturesInput("");
      setRating("5.0");
      setReviewsCount("1");

      loadCustomProducts();
    } catch (error: any) {
      console.error("Failed to save product", error);
      if (error.name === "QuotaExceededError" || error.code === 22 || error.name === "NS_ERROR_DOM_QUOTA_REACHED") {
        toast.error("Storage Limit Exceeded!", {
          description: "The files you uploaded exceed browser capacity. Please upload a smaller image file.",
          duration: 7000,
        });
      } else {
        toast.error("Publishing Failed", {
          description: error.message || "An unexpected storage error occurred.",
        });
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        loadCustomProducts();
      } catch (error: any) {
        console.error("Failed to delete product", error);
        toast.error("Failed to delete product");
      }
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between font-sans">
      
      {/* Header navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-xs font-bold text-red-600 border border-red-200/30 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main body content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        
        {/* Title Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-200/20 mb-3">
            <Package className="h-3.5 w-3.5" /> Dashboard
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl tracking-tight">
            Store Administration
          </h1>
          <p className="mt-2 text-zinc-500 text-sm max-w-2xl">
            Upload new items directly into the store database. Any items added here will immediately appear on the Home page and Products page.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-1 bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4 mb-5 flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              <span>Upload Product</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Rechargeable Hand Warmer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm cursor-pointer"
                >
                  <option value="Utilities">Smart Gadgets / Utilities</option>
                  <option value="Jewellery">Luxury Jewellery</option>
                  <option value="Dresses">Designer Dresses / Fashion</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 49.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide product parameters, utility specs, and highlights..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm resize-none"
                />
              </div>

              {/* Rating & Reviews */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={reviewsCount}
                    onChange={(e) => setReviewsCount(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Color options input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Colors (Hex comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. #3b82f6, #1d4ed8, #000000"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              {/* Features list input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Key Features (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Multi-functional, Ultra-durable"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Product Image *
                </label>
                <div className="mt-1 flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-zinc-200 h-48 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer relative select-none">
                  <div className="space-y-2 text-center flex flex-col items-center justify-center">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                    <div className="flex flex-col text-xs text-zinc-500">
                      <label className="relative cursor-pointer rounded-full font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none py-1.5 px-4 border border-blue-200 bg-white shadow-sm hover:scale-105 active:scale-95 transition-all">
                        <span>Select Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "image")}
                          className="sr-only"
                        />
                      </label>
                      <span className="mt-2 text-[10px] text-zinc-400">JPEG, PNG, WebP up to 5MB</span>
                    </div>
                  </div>
                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center p-6 z-10 transition-all duration-300">
                      <div className="w-full max-w-[220px] bg-zinc-100 rounded-full h-2.5 mb-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-sky-400 h-full rounded-full transition-all duration-150"
                          style={{ width: `${imageProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-extrabold text-blue-600 animate-pulse">Uploading Image: {imageProgress}%</span>
                    </div>
                  )}
                  {image && !isUploadingImage && (
                    <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center p-3 border border-zinc-200 z-10 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image} alt="Preview" className="h-full max-w-full object-contain rounded-xl" />
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="absolute top-3 right-3 h-7 w-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-black shadow-md cursor-pointer hover:scale-115 active:scale-95 transition-all"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Lookbook Video (Optional)
                </label>
                <div className="mt-1 flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-zinc-200 h-48 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer relative select-none">
                  <div className="space-y-2 text-center flex flex-col items-center justify-center">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                      <Film className="h-8 w-8" />
                    </div>
                    <div className="flex flex-col text-xs text-zinc-500">
                      <label className="relative cursor-pointer rounded-full font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none py-1.5 px-4 border border-blue-200 bg-white shadow-sm hover:scale-105 active:scale-95 transition-all">
                        <span>Select Video File</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, "video")}
                          className="sr-only"
                        />
                      </label>
                      <span className="mt-2 text-[10px] text-zinc-400">MP4, WebM up to 50MB</span>
                    </div>
                  </div>
                  {isUploadingVideo && (
                    <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center p-6 z-10 transition-all duration-300">
                      <div className="w-full max-w-[220px] bg-zinc-100 rounded-full h-2.5 mb-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-sky-400 h-full rounded-full transition-all duration-150"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-extrabold text-blue-600 animate-pulse">Uploading Video: {videoProgress}%</span>
                    </div>
                  )}
                  {video && !isUploadingVideo && (
                    <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center p-3 border border-zinc-200 z-10 shadow-sm">
                      <video src={video} className="h-full max-w-full object-contain rounded-xl" muted playsInline autoPlay loop />
                      <button
                        type="button"
                        onClick={() => setVideo("")}
                        className="absolute top-3 right-3 h-7 w-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-black shadow-md cursor-pointer hover:scale-115 active:scale-95 transition-all"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit / Update Button */}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {editingId ? (
                    <>
                      <Check className="h-4.5 w-4.5" />
                      <span>Update Product</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4.5 w-4.5" />
                      <span>Publish Product</span>
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="py-3 px-5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-bold text-sm active:scale-95 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

            </form>
          </div>

          {/* List Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Listing panel */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex-grow">
              <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4 mb-5 flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-blue-600" />
                <span>Uploaded Items ({customProducts.length})</span>
              </h2>

              {customProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-400">
                  <Package className="h-12 w-12 text-zinc-300 mb-3" />
                  <p className="text-sm font-semibold">No custom products uploaded yet.</p>
                  <p className="text-xs text-zinc-400 max-w-xs mt-1">Use the upload form to add items. Once added, they will show up here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                        <th className="pb-3 w-16">Preview</th>
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {customProducts.map((p) => (
                        <tr key={p.id} className="align-middle">
                          <td className="py-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.name} className="h-10 w-10 object-cover rounded-lg border border-zinc-200" />
                          </td>
                          <td className="py-3 font-semibold text-zinc-900 pr-4 max-w-[200px] truncate">
                            {p.name}
                          </td>
                          <td className="py-3 text-zinc-500">
                            {p.category}
                          </td>
                          <td className="py-3 font-bold text-zinc-900">
                            ${p.price.toFixed(2)}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEditClick(p)}
                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors cursor-pointer"
                                title="Edit Product"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id, p.name)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-zinc-400 text-xs border-t border-zinc-200/50 bg-white">
        &copy; {new Date().getFullYear()} PT Hub. All rights reserved.
      </footer>

      {/* Shadcn Sonner Toaster */}
      <Toaster richColors position="bottom-right" theme="light" />
    </div>
  );
}

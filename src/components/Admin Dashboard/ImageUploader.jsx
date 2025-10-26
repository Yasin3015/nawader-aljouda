import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, Check, Loader } from "lucide-react";

const ProductImagesUploader = ({
  mainImage,
  gallery = [],
  onMainChange,
  onGalleryChange,
  error,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [mainState, setMainState] = useState(
    mainImage ? { ...mainImage, uploaded: true, progress: 100 } : null
  );
  const [galleryState, setGalleryState] = useState(gallery);

  // ---------- MAIN IMAGE ----------
  const handleMainSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    const newMain = { file, preview, progress: 0, uploaded: false };
    setMainState(newMain);
    simulateMainUpload(newMain);
  };

  const simulateMainUpload = async (image) => {
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise((r) => setTimeout(r, 200));
      setMainState((prev) => ({ ...prev, progress }));
    }
    setMainState((prev) => ({ ...prev, uploaded: true }));
    onMainChange({ file: image.file, preview: image.preview });
  };

  const handleRemoveMain = () => {
    setMainState(null);
    onMainChange(null);
  };

  // ---------- GALLERY ----------
  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files);
    if (galleryState.length + files.length > 5) {
      alert(t("product.maxImagesReached", { max: 5 }));
      return;
    }

    const newImages = files.map((file, i) => ({
      id: `temp-${Date.now()}-${i}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      progress: 0,
      uploaded: false,
    }));

    setGalleryState((prev) => [...prev, ...newImages]);
    newImages.forEach(simulateGalleryUpload);
  };

  const simulateGalleryUpload = async (image) => {
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise((r) => setTimeout(r, 150));
      setGalleryState((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, progress } : img
        )
      );
    }

    setGalleryState((prev) =>
      prev.map((img) =>
        img.id === image.id ? { ...img, uploaded: true } : img
      )
    );

    const uploadedImages = galleryState
      .map((img) =>
        img.id === image.id ? { ...img, uploaded: true } : img
      )
      .filter((img) => img.uploaded);

    onGalleryChange(uploadedImages);
  };

  const handleRemoveGallery = (id) => {
    const newList = galleryState.filter((img) => img.id !== id);
    setGalleryState(newList);
    onGalleryChange(newList.filter((img) => img.uploaded));
  };

  return (
    <div className="flex flex-col gap-5" dir={isRTL ? "rtl" : "ltr"}>
      {/* ---------- MAIN IMAGE ---------- */}
      <div>
        <p className="font-medium mb-2">{t("product.mainImage")}</p>
        <div
          onClick={() => !mainState && mainInputRef.current?.click()}
          className={`w-full aspect-square rounded-lg border-2 border-dashed relative flex items-center justify-center bg-gray-100 transition overflow-hidden ${
            error ? "border-red-500" : "border-gray-300"
          } ${!mainState ? "cursor-pointer hover:border-green-500" : ""}`}
        >
          {!mainState ? (
            <div className="flex flex-col items-center text-center text-gray-500">
              <Upload className="w-10 h-10 mb-2" />
              <p>{t("product.dropMainImage")}</p>
              <p className="text-xs text-gray-400">{t("product.imageFormats")}</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={mainState.preview}
                alt="Main"
                className={`w-full h-full object-cover ${
                  !mainState.uploaded ? "opacity-70" : ""
                }`}
              />

              {/* progress bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                <div
                  className="h-1 bg-green-500 transition-all duration-300"
                  style={{ width: `${mainState.progress}%` }}
                ></div>
              </div>

              {/* overlay with icons */}
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md">
                {mainState.uploaded ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Loader className="w-4 h-4 text-green-400 animate-spin" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMain();
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <input
            ref={mainInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleMainSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* ---------- GALLERY ---------- */}
      <div>
        <p className="font-medium mb-2">{t("product.galleryTitle")}</p>
        <div
          onClick={() => galleryInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:border-green-500 ${
            error ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-700">{t("product.dropImageHere")}</p>
          <p className="text-xs text-gray-500">{t("product.imageFormats")}</p>
          <input
            ref={galleryInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleGallerySelect}
            className="hidden"
          />
        </div>

        {galleryState.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {galleryState.map((image) => (
              <div
                key={image.id}
                className="flex items-center gap-3 bg-[var(--color-gray-1)] p-2 h-25 rounded-sm border border-gray-200"
              >
                <img
                  src={image.preview}
                  alt={image.name}
                  className={`h-full w-25 rounded-sm object-cover ${
                    !image.uploaded ? "opacity-60" : ""
                  }`}
                />
                <div className="flex-1 flex !flex-col">
                  <p
                    className={`text-sm ${
                      image.uploaded ? "text-gray-700" : "text-gray-500"
                    }`}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',      
                        overflowWrap: 'anywhere'      
                    }}
                  >
                    {image.name}
                  </p>
                  <div className="h-1 bg-gray-200 rounded mt-1">
                    <div
                      className="h-1 bg-green-500 transition-all duration-300 rounded"
                      style={{ width: `${image.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {image.uploaded ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Loader className="w-4 h-4 text-green-500 animate-spin" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(image.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {galleryState.length > 0 && (
          <p className="text-xs text-gray-500 text-center mt-2">
            {t("product.imagesCount", {
              current: galleryState.length,
              max: 5,
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductImagesUploader;

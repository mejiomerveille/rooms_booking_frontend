import { useState } from 'react';
import { X } from 'lucide-react';

const GALLERY_IMAGES = [
  { url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', category: 'Chambres' },
  { url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', category: 'Chambres' },
  { url: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg', category: 'Chambres' },
  { url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', category: 'Chambres' },
  { url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg', category: 'Restaurant' },
  { url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg', category: 'Restaurant' },
  { url: 'https://images.pexels.com/photos/3201694/pexels-photo-3201694.jpeg', category: 'Spa' },
  { url: 'https://images.pexels.com/photos/3865456/pexels-photo-3865456.jpeg', category: 'Extérieur' },
  { url: 'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg', category: 'Extérieur' },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(GALLERY_IMAGES.map((img) => img.category))];
  const filteredImages =
    filter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Galerie Photos</h1>
          <p className="text-xl">Découvrez notre établissement en images</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'Toutes' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image.url)}
              className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
            >
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

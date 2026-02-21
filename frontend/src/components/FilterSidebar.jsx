import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Dresses', 'Tops', 'Co-ords', 'Ethnic', 'Casual', 'Party'];
const availableSizes = ['S', 'M', 'L', 'XL'];

const FilterSidebar = ({ filters, onFilterChange, onClose, isOpen }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || '',
  });

  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange({
      min: filters.minPrice || '',
      max: filters.maxPrice || '',
    });
  }, [filters]);

  const handleCategoryChange = (category) => {
    setLocalFilters({
      ...localFilters,
      category: localFilters.category === category ? '' : category,
    });
  };

  const handleSizeChange = (size) => {
    let currentSizes = localFilters.size ? localFilters.size.split(',') : [];
    if (currentSizes.includes(size)) {
      currentSizes = currentSizes.filter((s) => s !== size);
    } else {
      currentSizes.push(size);
    }

    setLocalFilters({
      ...localFilters,
      size: currentSizes.length > 0 ? currentSizes.join(',') : '',
    });
  };

  const handlePriceChange = (type, value) => {
    if (value !== '' && Number(value) < 0) return;

    const newRange = {
      ...priceRange,
      [type]: value,
    };
    setPriceRange(newRange);
    setLocalFilters({
      ...localFilters,
      minPrice: newRange.min || undefined,
      maxPrice: newRange.max || undefined,
    });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    if (onClose) onClose();
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    const clearedFilters = {
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      size: '',
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 lg:w-full bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto lg:static lg:shadow-none lg:z-auto lg:transform-none"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <input
                        type="checkbox"
                        checked={localFilters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-primary-pink rounded focus:ring-primary-pink"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const isSelected = localFilters.size && localFilters.size.split(',').includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-medium transition-colors ${isSelected
                          ? 'border-primary-pink bg-pink-50 text-primary-pink dark:bg-pink-900/30'
                          : 'border-gray-200 text-gray-600 hover:border-primary-pink dark:border-gray-700 dark:text-gray-400'
                          }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Min Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={priceRange.min}
                      onChange={(e) =>
                        handlePriceChange('min', e.target.value)
                      }
                      onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-pink dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Max Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={priceRange.max}
                      onChange={(e) =>
                        handlePriceChange('max', e.target.value)
                      }
                      onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                      placeholder="1000"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-pink dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Apply/Clear Filters */}
              <div className="space-y-3">
                <button
                  onClick={applyFilters}
                  className="w-full py-3 px-4 bg-primary-pink text-white rounded-lg hover:bg-pink-400 font-medium shadow-md transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;

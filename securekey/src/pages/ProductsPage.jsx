// import React, { useState, useMemo, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { Search, Grid, List, ChevronDown, ShoppingCart, Filter, Eye, ChevronLeft, ChevronRight, ShoppingBag, Crown, Loader2, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Slider } from '@/components/ui/slider';
// import { Input } from '@/components/ui/input';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import { useCart } from '@/context/CartContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useToast } from '@/components/ui/use-toast';
// import ProductDetailModal from '@/components/ProductDetailModal';
// import initialProductsData from '@/data/products.json';
// import { useLanguage } from '@/context/LanguageContext';

// const ProductsPage = () => {
//     const { addToCart } = useCart();
//     const { toast } = useToast();
//     const { t } = useLanguage();
//     const [viewMode, setViewMode] = useState('grid');
    
//     // Filter States
//     const [searchQuery, setSearchQuery] = useState('');
//     const [priceRange, setPriceRange] = useState([0, 1500]);
//     const [minPriceInput, setMinPriceInput] = useState('0');
//     const [maxPriceInput, setMaxPriceInput] = useState('1500');
//     const [selectedCategories, setSelectedCategories] = useState([]);
    
//     const [sortBy, setSortBy] = useState('featured');
//     const [itemsPerPage, setItemsPerPage] = useState(12);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

//     // Modal State
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     // Data State - Initialized directly with JSON data
//     const [products, setProducts] = useState(initialProductsData);
//     const [loading, setLoading] = useState(false);

//     const uniqueCategories = useMemo(() => {
//         const cats = products.map(p => p.category);
//         return [...new Set(cats)].sort();
//     }, [products]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchQuery, priceRange, sortBy, itemsPerPage, selectedCategories]);

//     useEffect(() => {
//         setMinPriceInput(priceRange[0].toString());
//         setMaxPriceInput(priceRange[1].toString());
//     }, [priceRange]);

//     const getPrice = (priceStr) => {
//         // Handle null, undefined, or empty values
//         if (priceStr === null || priceStr === undefined || priceStr === '') {
//             return 0;
//         }

//         // If it's already a number, return it directly
//         if (typeof priceStr === 'number') {
//             return priceStr;
//         }

//         // Convert to string and extract numeric value
//         const stringPrice = String(priceStr).trim();
//         const numericValue = parseFloat(stringPrice.replace(/[^0-9.-]+/g, ""));
        
//         // Return the numeric value or 0 if parsing failed
//         return isNaN(numericValue) ? 0 : numericValue;
//     };

//     const filteredProducts = useMemo(() => {
//         let result = products;

//         if (searchQuery) {
//             const lowerQuery = searchQuery.toLowerCase();
//             result = result.filter(p => 
//                 p.name.toLowerCase().includes(lowerQuery) || 
//                 p.category.toLowerCase().includes(lowerQuery) ||
//                 p.brand.toLowerCase().includes(lowerQuery) ||
//                 (p.description && p.description.toLowerCase().includes(lowerQuery))
//             );
//         }

//         if (selectedCategories.length > 0) {
//             result = result.filter(p => selectedCategories.includes(p.category));
//         }

//         result = result.filter(p => {
//             const price = getPrice(p.price);
//             return price >= priceRange[0] && price <= priceRange[1];
//         });

//         result = [...result].sort((a, b) => {
//             if (sortBy === 'price-asc') return getPrice(a.price) - getPrice(b.price);
//             if (sortBy === 'price-desc') return getPrice(b.price) - getPrice(a.price);
//             if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
//             if (sortBy === 'featured') return (b.featured === a.featured) ? 0 : b.featured ? 1 : -1;
//             return 0;
//         });

//         return result;
//     }, [searchQuery, priceRange, sortBy, selectedCategories, products]);

//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

//     const clearAllFilters = () => {
//         setSearchQuery('');
//         setPriceRange([0, 1500]);
//         setMinPriceInput('0');
//         setMaxPriceInput('1500');
//         setSortBy('featured');
//         setSelectedCategories([]);
//         setCurrentPage(1);
//         toast({
//             title: "Filters Cleared ✨",
//             description: "Showing all available products.",
//         });
//     };

//     const handleAddToCart = (product, e) => {
//         if(e) e.stopPropagation();
//         addToCart(product);
//     };

//     const openModal = (product) => {
//         setSelectedProduct(product);
//         setIsModalOpen(true);
//     };

//     const getSortLabel = (value) => {
//         switch(value) {
//             case 'price-asc': return t('productsPage.sort.priceLowHigh');
//             case 'price-desc': return t('productsPage.sort.priceHighLow');
//             case 'name-asc': return t('productsPage.sort.nameAZ');
//             default: return t('productsPage.sort.featured');
//         }
//     };

//     const handleMinPriceChange = (e) => {
//         const val = e.target.value;
//         setMinPriceInput(val);
//         const numVal = parseInt(val);
//         if (!isNaN(numVal) && numVal >= 0 && numVal <= priceRange[1]) {
//             setPriceRange([numVal, priceRange[1]]);
//         }
//     };

//     const handleMaxPriceChange = (e) => {
//         const val = e.target.value;
//         setMaxPriceInput(val);
//         const numVal = parseInt(val);
//         if (!isNaN(numVal) && numVal >= priceRange[0] && numVal <= 1500) {
//             setPriceRange([priceRange[0], numVal]);
//         }
//     };

//     const handlePriceInputBlur = () => {
//         let min = parseInt(minPriceInput);
//         let max = parseInt(maxPriceInput);

//         if (isNaN(min) || min < 0) min = 0;
//         if (isNaN(max) || max > 1500) max = 1500;
        
//         if (min > max) {
//             const temp = min;
//             min = max;
//             max = temp;
//         }

//         setPriceRange([min, max]);
//         setMinPriceInput(min.toString());
//         setMaxPriceInput(max.toString());
//     };

//     const toggleCategory = (category) => {
//         setSelectedCategories(prev => {
//             if (prev.includes(category)) {
//                 return prev.filter(c => c !== category);
//             } else {
//                 return [...prev, category];
//             }
//         });
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-slate-50">
//                 <div className="flex flex-col items-center gap-4">
//                     <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//                     <p className="text-slate-500 font-medium">Loading products...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen pt-24 pb-20 bg-sky-100 sm:bg-slate-50">
//             <Helmet>
//                 <title>SecureKey - Products | Buy Software Licenses</title>
//                 <meta name="description" content="Browse our wide selection of genuine software licenses including Windows, Office, Antivirus, and more. Instant digital delivery." />
//                 <link rel="canonical" href="https://securekey.online/products" />
//             </Helmet>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
//                 <div className="bg-[#6366f1] rounded-3xl p-6 md:p-12 mb-10 relative overflow-hidden shadow-xl">
//                     <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
//                         <Crown className="w-32 h-32 md:w-48 md:h-48 text-white rotate-12" />
//                     </div>
                    
//                     <div className="relative z-10 max-w-4xl">
//                         <div className="flex items-center gap-3 mb-2">
//                             <ShoppingBag className="w-6 h-6 text-white" />
//                             <h1 className="text-2xl md:text-3xl font-bold text-white">{t('productsPage.title')}</h1>
//                         </div>
//                         <p className="text-indigo-100 mb-8 text-base md:text-lg">{t('productsPage.subtitle')}</p>
                        
//                         <div className="relative max-w-2xl group">
//                             <div className="relative flex items-center bg-white rounded-lg shadow-lg">
//                                 <input 
//                                     type="text" 
//                                     placeholder={t('productsPage.searchPlaceholder')} 
//                                     className="w-full h-12 pl-6 pr-14 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 text-base rounded-l-lg"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                 />
//                                 {searchQuery && (
//                                     <button onClick={() => setSearchQuery('')} className="absolute right-14 p-2 hover:bg-slate-100 rounded-full text-slate-400">
//                                         <X className="w-4 h-4" />
//                                     </button>
//                                 )}
//                                 <button className="absolute right-1 h-10 w-10 bg-[#3b82f6] hover:bg-[#2563eb] flex items-center justify-center rounded-md text-white transition-colors">
//                                     <Search className="w-5 h-5" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-8">
//                     <div className="lg:hidden mb-4">
//                         <Button 
//                             variant="outline" 
//                             className="w-full flex justify-between items-center bg-white h-12"
//                             onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
//                         >
//                             <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> {t('common.filters')}</span>
//                             <ChevronDown className={`w-4 h-4 transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
//                         </Button>
//                     </div>

//                     <div className={`w-full lg:w-72 flex-shrink-0 space-y-8 lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
//                         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:sticky lg:top-24">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h3 className="font-bold text-slate-900 text-lg">{t('common.filters')}</h3>
//                                 <button 
//                                     onClick={clearAllFilters}
//                                     className="text-sm font-medium text-[#3b82f6] hover:text-blue-700 transition-colors"
//                                 >
//                                     {t('common.clearFilters')}
//                                 </button>
//                             </div>

//                             <div className="mb-6">
//                                 <h4 className="font-semibold text-slate-800 mb-4 text-sm">{t('productsPage.categories')}</h4>
//                                 <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
//                                     {uniqueCategories.map(category => (
//                                         <div key={category} className="flex items-center space-x-2">
//                                             <Checkbox 
//                                                 id={`cat-${category}`} 
//                                                 checked={selectedCategories.includes(category)}
//                                                 onCheckedChange={() => toggleCategory(category)}
//                                             />
//                                             <Label 
//                                                 htmlFor={`cat-${category}`} 
//                                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 cursor-pointer select-none"
//                                             >
//                                                 {category}
//                                             </Label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="border-t border-slate-100 my-6"></div>

//                             <div className="mb-6">
//                                 <h4 className="font-semibold text-slate-800 mb-4 text-sm">{t('productsPage.priceRange')}</h4>
//                                 <Slider
//                                     max={1500}
//                                     step={10}
//                                     value={priceRange}
//                                     onValueChange={setPriceRange}
//                                     className="mb-6"
//                                 />
//                                 <div className="flex items-center gap-3">
//                                     <div className="relative flex-1">
//                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
//                                         <Input
//                                             type="number"
//                                             min="0"
//                                             max="1500"
//                                             value={minPriceInput}
//                                             onChange={handleMinPriceChange}
//                                             onBlur={handlePriceInputBlur}
//                                             className="pl-6 h-9 text-sm border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-indigo-50 text-slate-900"
//                                         />
//                                     </div>
//                                     <span className="text-slate-400 font-medium">-</span>
//                                     <div className="relative flex-1">
//                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
//                                         <Input
//                                             type="number"
//                                             min="0"
//                                             max="1500"
//                                             value={maxPriceInput}
//                                             onChange={handleMaxPriceChange}
//                                             onBlur={handlePriceInputBlur}
//                                             className="pl-6 h-9 text-sm border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-indigo-50 text-slate-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex-1">
//                         <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//                             <span className="font-semibold text-slate-800 pl-2 text-sm sm:text-base">
//                                 {filteredProducts.length} {t('productsPage.productsFound')}
//                             </span>
                            
//                             <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
//                                 <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0">
//                                     <button 
//                                         onClick={() => setViewMode('grid')}
//                                         className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-[#3b82f6] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
//                                     >
//                                         <Grid className="w-4 h-4" />
//                                     </button>
//                                     <div className="w-px bg-slate-200"></div>
//                                     <button 
//                                         onClick={() => setViewMode('list')}
//                                         className={`p-2 transition-all ${viewMode === 'list' ? 'bg-[#3b82f6] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
//                                     >
//                                         <List className="w-4 h-4" />
//                                     </button>
//                                 </div>

//                                 <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                         <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex-1 sm:flex-none justify-center">
//                                             <span className="truncate max-w-[120px]">
//                                                 {sortBy === 'featured' ? <><span className="text-orange-500">🔥</span> {t('productsPage.sort.featured')}</> : getSortLabel(sortBy)}
//                                             </span>
//                                             <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
//                                         </button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent align="end" className="w-48">
//                                         <DropdownMenuItem onClick={() => setSortBy('featured')} className="cursor-pointer">🔥 {t('productsPage.sort.featured')}</DropdownMenuItem>
//                                         <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="cursor-pointer">💰 {t('productsPage.sort.priceLowHigh')}</DropdownMenuItem>
//                                         <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="cursor-pointer">💎 {t('productsPage.sort.priceHighLow')}</DropdownMenuItem>
//                                         <DropdownMenuItem onClick={() => setSortBy('name-asc')} className="cursor-pointer">📝 {t('productsPage.sort.nameAZ')}</DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                 </DropdownMenu>

//                                 <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                         <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors hidden sm:flex">
//                                             <span className="font-bold">{itemsPerPage}</span> <span className="hidden lg:inline">{t('common.perPage')}</span>
//                                             <ChevronDown className="w-3 h-3 text-slate-400" />
//                                         </button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent align="end" className="w-32">
//                                         {[4, 8, 12, 24].map(num => (
//                                             <DropdownMenuItem key={num} onClick={() => setItemsPerPage(num)} className="cursor-pointer">
//                                                 {num} {t('common.perPage')}
//                                             </DropdownMenuItem>
//                                         ))}
//                                     </DropdownMenuContent>
//                                 </DropdownMenu>
//                             </div>
//                         </div>

//                         <AnimatePresence mode="wait">
//                             {displayedProducts.length > 0 ? (
//                                 <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4 sm:gap-6`}>
//                                     {displayedProducts.map((product) => (
//                                         <motion.div 
//                                             key={product.id}
//                                             layout
//                                             initial={{ opacity: 0, scale: 0.95 }}
//                                             animate={{ opacity: 1, scale: 1 }}
//                                             exit={{ opacity: 0, scale: 0.95 }}
//                                             className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex ${viewMode === 'list' ? 'flex-col sm:flex-row p-4 items-center gap-6' : 'flex-col p-4'}`}
//                                             onClick={() => openModal(product)}
//                                         >
//                                             <div className={`relative overflow-hidden bg-slate-50 rounded-lg cursor-pointer ${viewMode === 'list' ? 'w-full sm:w-48 h-48 sm:h-32 flex-shrink-0' : 'aspect-[4/3] mb-4'}`}>
//                                                 <img 
//                                                     src={product.imgSrc} 
//                                                     alt={product.name} 
//                                                     className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
//                                                 />
//                                                 {!product.inStock && (
//                                                     <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
//                                                         <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
//                                                             {t('common.outOfStock')}
//                                                         </span>
//                                                     </div>
//                                                 )}
                                                
//                                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
//                                                      <button className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full font-medium text-xs shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 flex items-center gap-1">
//                                                         <Eye className="w-3 h-3" /> {t('common.quickView')}
//                                                      </button>
//                                                 </div>
//                                             </div>

//                                             <div className="flex flex-col flex-grow w-full">
//                                                 <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-[#6366f1] transition-colors cursor-pointer">
//                                                     {product.name}
//                                                 </h3>
                                                
//                                                 <div className="mt-auto pt-2 flex flex-col gap-3">
//                                                     <div className="flex flex-col">
//                                                         <span className="text-slate-400 text-xs line-through decoration-slate-400">
//                                                             {product.originalPrice}
//                                                         </span>
//                                                         <span className="text-lg font-bold text-[#ef4444]">
//                                                             {product.price}
//                                                         </span>
//                                                     </div>

//                                                     <Button 
//                                                         onClick={(e) => product.inStock && handleAddToCart(product, e)}
//                                                         disabled={!product.inStock}
//                                                         className={`w-full rounded-lg font-medium transition-all h-10 ${
//                                                             product.inStock 
//                                                             ? 'bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-sm' 
//                                                             : 'bg-slate-100 text-slate-400 cursor-not-allowed'
//                                                         }`}
//                                                     >
//                                                         {product.inStock ? (
//                                                             <>
//                                                                 <ShoppingCart className="w-4 h-4 mr-2" />
//                                                                 {t('bestsellers.addToCart')}
//                                                             </>
//                                                         ) : (
//                                                             t('common.soldOut')
//                                                         )}
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <motion.div 
//                                     initial={{ opacity: 0, y: 20 }} 
//                                     animate={{ opacity: 1, y: 0 }}
//                                     className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-dashed border-slate-200"
//                                 >
//                                     <div className="bg-indigo-50 p-6 rounded-full mb-6">
//                                         <Search className="w-12 h-12 text-[#6366f1]" />
//                                     </div>
//                                     <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('productsPage.noProducts')}</h3>
//                                     <p className="text-slate-500 max-w-md mx-auto mb-8 text-base">
//                                         {t('productsPage.noProductsDesc')}
//                                     </p>
//                                     <Button onClick={clearAllFilters} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8">
//                                         {t('common.clearFilters')}
//                                     </Button>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {filteredProducts.length > 0 && (
//                              <div className="mt-12 flex justify-center gap-2 flex-wrap">
//                                 <Button 
//                                     variant="outline" 
//                                     size="icon" 
//                                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                                     disabled={currentPage === 1}
//                                     className="rounded-lg bg-white border-slate-200"
//                                 >
//                                     <ChevronLeft className="w-4 h-4" />
//                                 </Button>
                                
//                                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                                     <Button 
//                                         key={page}
//                                         variant={currentPage === page ? "default" : "outline"}
//                                         onClick={() => setCurrentPage(page)}
//                                         className={`rounded-lg ${currentPage === page ? 'bg-[#6366f1] hover:bg-[#4f46e5] text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
//                                     >
//                                         {page}
//                                     </Button>
//                                 ))}

//                                 <Button 
//                                     variant="outline" 
//                                     size="icon" 
//                                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                                     disabled={currentPage === totalPages}
//                                     className="rounded-lg bg-white border-slate-200"
//                                 >
//                                     <ChevronRight className="w-4 h-4" />
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <ProductDetailModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 product={selectedProduct} 
//             />
//         </div>
//     );
// };

// export default ProductsPage;





import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Grid, List, ChevronDown, ShoppingCart, Filter, Eye, ChevronLeft, ChevronRight, ShoppingBag, Crown, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import ProductDetailModal from '@/components/ProductDetailModal';
import initialProductsData from '@/data/products.json';
import { useLanguage } from '@/context/LanguageContext';

const ProductsPage = () => {
    const { addToCart } = useCart();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState('grid');
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1500]);
    const [minPriceInput, setMinPriceInput] = useState('0');
    const [maxPriceInput, setMaxPriceInput] = useState('1500');
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const [sortBy, setSortBy] = useState('featured');
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Data State - Initialized directly with JSON data
    const [products, setProducts] = useState(initialProductsData);
    const [loading, setLoading] = useState(false);

    const uniqueCategories = useMemo(() => {
        const cats = products.map(p => p.category);
        return [...new Set(cats)].sort();
    }, [products]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, priceRange, sortBy, itemsPerPage, selectedCategories]);

    useEffect(() => {
        setMinPriceInput(priceRange[0].toString());
        setMaxPriceInput(priceRange[1].toString());
    }, [priceRange]);

    const getPrice = (priceStr) => {
        // Handle null, undefined, or empty values
        if (priceStr === null || priceStr === undefined || priceStr === '') {
            return 0;
        }

        // If it's already a number, return it directly
        if (typeof priceStr === 'number') {
            return priceStr;
        }

        // Convert to string and extract numeric value
        const stringPrice = String(priceStr).trim();
        const numericValue = parseFloat(stringPrice.replace(/[^0-9.-]+/g, ""));
        
        // Return the numeric value or 0 if parsing failed
        return isNaN(numericValue) ? 0 : numericValue;
    };

    const filteredProducts = useMemo(() => {
        let result = products;

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(lowerQuery) || 
                p.category.toLowerCase().includes(lowerQuery) ||
                p.brand.toLowerCase().includes(lowerQuery) ||
                (p.description && p.description.toLowerCase().includes(lowerQuery))
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        result = result.filter(p => {
            const price = getPrice(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        result = [...result].sort((a, b) => {
            if (sortBy === 'price-asc') return getPrice(a.price) - getPrice(b.price);
            if (sortBy === 'price-desc') return getPrice(b.price) - getPrice(a.price);
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
            if (sortBy === 'featured') return (b.featured === a.featured) ? 0 : b.featured ? 1 : -1;
            return 0;
        });

        return result;
    }, [searchQuery, priceRange, sortBy, selectedCategories, products]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const clearAllFilters = () => {
        setSearchQuery('');
        setPriceRange([0, 1500]);
        setMinPriceInput('0');
        setMaxPriceInput('1500');
        setSortBy('featured');
        setSelectedCategories([]);
        setCurrentPage(1);
        toast({
            title: "Filters Cleared ✨",
            description: "Showing all available products.",
        });
    };

    const handleAddToCart = (product, e) => {
        if(e) e.stopPropagation();
        addToCart(product);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const getSortLabel = (value) => {
        switch(value) {
            case 'price-asc': return t('productsPage.sort.priceLowHigh');
            case 'price-desc': return t('productsPage.sort.priceHighLow');
            case 'name-asc': return t('productsPage.sort.nameAZ');
            default: return t('productsPage.sort.featured');
        }
    };

    const handleMinPriceChange = (e) => {
        const val = e.target.value;
        setMinPriceInput(val);
        const numVal = parseInt(val);
        if (!isNaN(numVal) && numVal >= 0 && numVal <= priceRange[1]) {
            setPriceRange([numVal, priceRange[1]]);
        }
    };

    const handleMaxPriceChange = (e) => {
        const val = e.target.value;
        setMaxPriceInput(val);
        const numVal = parseInt(val);
        if (!isNaN(numVal) && numVal >= priceRange[0] && numVal <= 1500) {
            setPriceRange([priceRange[0], numVal]);
        }
    };

    const handlePriceInputBlur = () => {
        let min = parseInt(minPriceInput);
        let max = parseInt(maxPriceInput);

        if (isNaN(min) || min < 0) min = 0;
        if (isNaN(max) || max > 1500) max = 1500;
        
        if (min > max) {
            const temp = min;
            min = max;
            max = temp;
        }

        setPriceRange([min, max]);
        setMinPriceInput(min.toString());
        setMaxPriceInput(max.toString());
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    <p className="text-slate-500 font-medium">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-sky-100 sm:bg-slate-50">
            <Helmet>
                <title>SecureKey - Products | Buy Software Licenses</title>
                <meta name="description" content="Browse our wide selection of genuine software licenses including Windows, Office, Antivirus, and more. Instant digital delivery." />
                <link rel="canonical" href="https://securekey.online/products" />
                
                {/* Adterra Ad Scripts */}
                <script src="https://pl31181498.profitableratecpmnetwork.com/a0/7a/89/a07a89c664a104816037084740e67715.js" type="text/javascript" />
                <script src="https://pl31181497.profitableratecpmnetwork.com/bc/bb/ba/bcbbba9b9fe5dfa2ea029920fa1dda50.js" type="text/javascript" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="bg-[#6366f1] rounded-3xl p-6 md:p-12 mb-10 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Crown className="w-32 h-32 md:w-48 md:h-48 text-white rotate-12" />
                    </div>
                    
                    <div className="relative z-10 max-w-4xl">
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingBag className="w-6 h-6 text-white" />
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{t('productsPage.title')}</h1>
                        </div>
                        <p className="text-indigo-100 mb-8 text-base md:text-lg">{t('productsPage.subtitle')}</p>
                        
                        <div className="relative max-w-2xl group">
                            <div className="relative flex items-center bg-white rounded-lg shadow-lg">
                                <input 
                                    type="text" 
                                    placeholder={t('productsPage.searchPlaceholder')} 
                                    className="w-full h-12 pl-6 pr-14 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 text-base rounded-l-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-14 p-2 hover:bg-slate-100 rounded-full text-slate-400">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <button className="absolute right-1 h-10 w-10 bg-[#3b82f6] hover:bg-[#2563eb] flex items-center justify-center rounded-md text-white transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:hidden mb-4">
                        <Button 
                            variant="outline" 
                            className="w-full flex justify-between items-center bg-white h-12"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> {t('common.filters')}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
                        </Button>
                    </div>

                    <div className={`w-full lg:w-72 flex-shrink-0 space-y-8 lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:sticky lg:top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900 text-lg">{t('common.filters')}</h3>
                                <button 
                                    onClick={clearAllFilters}
                                    className="text-sm font-medium text-[#3b82f6] hover:text-blue-700 transition-colors"
                                >
                                    {t('common.clearFilters')}
                                </button>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-slate-800 mb-4 text-sm">{t('productsPage.categories')}</h4>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {uniqueCategories.map(category => (
                                        <div key={category} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`cat-${category}`} 
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={() => toggleCategory(category)}
                                            />
                                            <Label 
                                                htmlFor={`cat-${category}`} 
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 cursor-pointer select-none"
                                            >
                                                {category}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-slate-100 my-6"></div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-slate-800 mb-4 text-sm">{t('productsPage.priceRange')}</h4>
                                <Slider
                                    max={1500}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="mb-6"
                                />
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="1500"
                                            value={minPriceInput}
                                            onChange={handleMinPriceChange}
                                            onBlur={handlePriceInputBlur}
                                            className="pl-6 h-9 text-sm border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-indigo-50 text-slate-900"
                                        />
                                    </div>
                                    <span className="text-slate-400 font-medium">-</span>
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="1500"
                                            value={maxPriceInput}
                                            onChange={handleMaxPriceChange}
                                            onBlur={handlePriceInputBlur}
                                            className="pl-6 h-9 text-sm border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 bg-indigo-50 text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="font-semibold text-slate-800 pl-2 text-sm sm:text-base">
                                {filteredProducts.length} {t('productsPage.productsFound')}
                            </span>
                            
                            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-[#3b82f6] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <div className="w-px bg-slate-200"></div>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-all ${viewMode === 'list' ? 'bg-[#3b82f6] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex-1 sm:flex-none justify-center">
                                            <span className="truncate max-w-[120px]">
                                                {sortBy === 'featured' ? <><span className="text-orange-500">🔥</span> {t('productsPage.sort.featured')}</> : getSortLabel(sortBy)}
                                            </span>
                                            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => setSortBy('featured')} className="cursor-pointer">🔥 {t('productsPage.sort.featured')}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="cursor-pointer">💰 {t('productsPage.sort.priceLowHigh')}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="cursor-pointer">💎 {t('productsPage.sort.priceHighLow')}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('name-asc')} className="cursor-pointer">📝 {t('productsPage.sort.nameAZ')}</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors hidden sm:flex">
                                            <span className="font-bold">{itemsPerPage}</span> <span className="hidden lg:inline">{t('common.perPage')}</span>
                                            <ChevronDown className="w-3 h-3 text-slate-400" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-32">
                                        {[4, 8, 12, 24].map(num => (
                                            <DropdownMenuItem key={num} onClick={() => setItemsPerPage(num)} className="cursor-pointer">
                                                {num} {t('common.perPage')}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {displayedProducts.length > 0 ? (
                                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4 sm:gap-6`}>
                                    {displayedProducts.map((product) => (
                                        <motion.div 
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex ${viewMode === 'list' ? 'flex-col sm:flex-row p-4 items-center gap-6' : 'flex-col p-4'}`}
                                            onClick={() => openModal(product)}
                                        >
                                            <div className={`relative overflow-hidden bg-slate-50 rounded-lg cursor-pointer ${viewMode === 'list' ? 'w-full sm:w-48 h-48 sm:h-32 flex-shrink-0' : 'aspect-[4/3] mb-4'}`}>
                                                <img 
                                                    src={product.imgSrc} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {!product.inStock && (
                                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                            {t('common.outOfStock')}
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                     <button className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full font-medium text-xs shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 flex items-center gap-1">
                                                        <Eye className="w-3 h-3" /> {t('common.quickView')}
                                                     </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col flex-grow w-full">
                                                <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-[#6366f1] transition-colors cursor-pointer">
                                                    {product.name}
                                                </h3>
                                                
                                                <div className="mt-auto pt-2 flex flex-col gap-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-400 text-xs line-through decoration-slate-400">
                                                            {product.originalPrice}
                                                        </span>
                                                        <span className="text-lg font-bold text-[#ef4444]">
                                                            {product.price}
                                                        </span>
                                                    </div>

                                                    <Button 
                                                        onClick={(e) => product.inStock && handleAddToCart(product, e)}
                                                        disabled={!product.inStock}
                                                        className={`w-full rounded-lg font-medium transition-all h-10 ${
                                                            product.inStock 
                                                            ? 'bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-sm' 
                                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {product.inStock ? (
                                                            <>
                                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                                {t('bestsellers.addToCart')}
                                                            </>
                                                        ) : (
                                                            t('common.soldOut')
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-dashed border-slate-200"
                                >
                                    <div className="bg-indigo-50 p-6 rounded-full mb-6">
                                        <Search className="w-12 h-12 text-[#6366f1]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('productsPage.noProducts')}</h3>
                                    <p className="text-slate-500 max-w-md mx-auto mb-8 text-base">
                                        {t('productsPage.noProductsDesc')}
                                    </p>
                                    <Button onClick={clearAllFilters} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8">
                                        {t('common.clearFilters')}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {filteredProducts.length > 0 && (
                             <div className="mt-12 flex justify-center gap-2 flex-wrap">
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-lg bg-white border-slate-200"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <Button 
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        onClick={() => setCurrentPage(page)}
                                        className={`rounded-lg ${currentPage === page ? 'bg-[#6366f1] hover:bg-[#4f46e5] text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
                                    >
                                        {page}
                                    </Button>
                                ))}

                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-lg bg-white border-slate-200"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProductDetailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                product={selectedProduct} 
            />
        </div>
    );
};

export default ProductsPage;

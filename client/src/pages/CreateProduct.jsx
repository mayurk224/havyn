import { useState } from 'react';
import { productService } from '../services/product.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, X, Upload } from "lucide-react"

const CreateProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Core Product State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Shirts');
  
  // Images State
  const [images, setImages] = useState([]);

  // Variants State (Array of objects to handle Absolute Pricing)
  const [variants, setVariants] = useState([
    { size: 'M', color: 'Black', stock: 0, price: 0 }
  ]);

  // Variant Handlers
  const addVariant = () => {
    setVariants([...variants, { size: 'M', color: 'Black', stock: 0, price: 0 }]);
  };

  const removeVariant = (indexToRemove) => {
    setVariants(variants.filter((_, index) => index !== indexToRemove));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleImageSelect = (e) => {
    if (e.target.files) {
      // Convert FileList to an array
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const normalizedVariants = variants.map((variant) => ({
      ...variant,
      color: variant.color.trim(),
      stock: Number(variant.stock) || 0,
      price: Number(variant.price) || 0,
    }));

    if (!trimmedTitle || !trimmedDescription) {
      setError('Title and description are required.');
      setIsSubmitting(false);
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one product image.');
      setIsSubmitting(false);
      return;
    }

    const hasInvalidVariant = normalizedVariants.some(
      (variant) => !variant.color || !variant.size || variant.stock < 0 || variant.price < 0,
    );

    if (hasInvalidVariant) {
      setError('Each variant must include a size, color, stock, and valid price.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', trimmedTitle);
      formData.append('description', trimmedDescription);
      formData.append('category', category);
      formData.append(
        'basePrice',
        String(Math.min(...normalizedVariants.map((variant) => variant.price))),
      );
      formData.append('variants', JSON.stringify(normalizedVariants));

      images.forEach((image) => {
        formData.append('images', image);
      });

      await productService.createProduct(formData);
      setMessage('Product created successfully.');
      setTitle('');
      setDescription('');
      setCategory('Shirts');
      setImages([]);
      setVariants([{ size: 'M', color: 'Black', stock: 0, price: 0 }]);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Listing</h1>
        <p className="text-muted-foreground mt-2">Add a new item to your store inventory.</p>
      </div>

      {message && (
        <div className="p-4 bg-muted text-muted-foreground rounded-md text-sm font-medium text-center">
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* --- Section 1: Core Details --- */}
        <Card>
          <CardHeader>
            <CardTitle>Core Details</CardTitle>
            <CardDescription>Essential information about your product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input 
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shirts">Shirts</SelectItem>
                  <SelectItem value="Pants">Pants</SelectItem>
                  <SelectItem value="Outerwear">Outerwear</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                placeholder="Describe your product..."
              />
            </div>
          </CardContent>
        </Card>

        {/* --- Section 2: Media --- */}
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>Upload up to 5 images of your product.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="images" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center min-h-[150px] border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                  <span className="text-sm font-medium">Click to upload images</span>
                  <span className="text-sm text-muted-foreground mt-1">PNG, JPG, JPEG</span>
                </div>
              </Label>
              <Input 
                id="images"
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                {images.length > 0 ? `${images.length} file(s) selected.` : 'No files selected.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- Section 3: Variants & Pricing --- */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle>Inventory & Pricing</CardTitle>
              <CardDescription>Add variants like size or color and set their prices.</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addVariant} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Variant
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {variants.map((variant, index) => (
              <div key={index} className="flex flex-wrap sm:flex-nowrap items-end gap-4 p-4 border rounded-lg bg-card">
                <div className="flex-1 min-w-[120px] space-y-2">
                  <Label>Color</Label>
                  <Input 
                    type="text" 
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    placeholder="e.g. Black"
                  />
                </div>
                <div className="w-full sm:w-24 space-y-2">
                  <Label>Size</Label>
                  <Select 
                    value={variant.size} 
                    onValueChange={(value) => handleVariantChange(index, 'size', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {["XS", "S", "M", "L", "XL", "XXL", "OS"].map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-24 space-y-2">
                  <Label>Stock</Label>
                  <Input 
                    type="number" 
                    min="0"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, 'stock', Number(e.target.value))}
                  />
                </div>
                <div className="w-full sm:w-32 space-y-2">
                  <Label>Price ($)</Label>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                  />
                </div>
                {variants.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeVariant(index)}
                    className="text-muted-foreground hover:text-destructive shrink-0 mt-4 sm:mt-0"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* --- Submit --- */}
        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : 'Publish Listing'}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default CreateProduct;

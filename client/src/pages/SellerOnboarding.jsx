import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Store, Loader2 } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import { vendorService } from '../services/vendor.service';

const SellerOnboarding = () => {
  const { user, setUser } = useAuth();

  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedStoreName = storeName.trim();
    const trimmedStoreDescription = storeDescription.trim();

    if (!agreedToTerms) {
      setError('You must agree to the terms and privacy policy to continue.');
      return;
    }

    if (!trimmedStoreName || !trimmedStoreDescription) {
      setError('Store name and description are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await vendorService.applyToSell({
        storeName: trimmedStoreName,
        storeDescription: trimmedStoreDescription,
      });

      if (data?.success && data.user) {
        setUser(data.user);
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl text-center flex flex-col items-center pt-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <CardHeader className="pt-0 items-center">
            <CardTitle className="text-2xl font-semibold mb-2 ">Application Received</CardTitle>
            <CardDescription className="text-center">
              Our team is reviewing your store details. We will notify you via email once you are approved to start listing products.
            </CardDescription>
          </CardHeader>
          <CardFooter className="w-full pb-8 pt-4">
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full transition-colors"
            >
              Return to Shopping
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-2xl ">
        <CardHeader className="space-y-1 pb-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="p-2  rounded-lg border ">
              <Store className="w-5 h-5 " />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight ">Launch Your Store</CardTitle>
          </div>
          <CardDescription className="text-sm ">
            Fill out your brand details to start selling on Havyn.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identity Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider ">Owner Name</Label>
                  <Input
                    disabled
                    value={user?.fullName || ''}
                    className=" cursor-not-allowed focus-visible:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider ">Contact Email</Label>
                  <Input
                    disabled
                    value={user?.email || ''}
                    className=" cursor-not-allowed focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Store Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-sm font-medium ">
                  Store Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="storeName"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g., Midnight Denim"
                  className="transition-all shadow-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription" className="text-sm font-medium">
                  Store Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="storeDescription"
                  required
                  rows={5}
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Tell us about the clothing you sell..."
                  className="transition-all resize-none shadow-none"
                />
                <p className="text-[0.8rem] text-muted-foreground">This will be shown on your store profile.</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 mt-2">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
                  className="mt-1"
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-normal cursor-pointer"
                  >
                    Accept terms and conditions
                  </Label>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[95%]">
                    I agree to the <a href="#" className="flex-none underline underline-offset-4 hover:text-primary">Terms of Service</a> and acknowledge the <a href="#" className="flex-none underline underline-offset-4 hover:text-primary">Privacy Policy</a> regarding seller data collection.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 active:scale-[0.98] transition-all font-medium text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin disabled:opacity-50" />
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOnboarding;


-- Create portfolio content table
CREATE TABLE public.portfolio_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Anyone can view portfolio content"
  ON public.portfolio_content FOR SELECT
  USING (true);

-- Authenticated users can manage (admin)
CREATE POLICY "Authenticated users can insert content"
  ON public.portfolio_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update content"
  ON public.portfolio_content FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete content"
  ON public.portfolio_content FOR DELETE
  TO authenticated
  USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portfolio_content_updated_at
  BEFORE UPDATE ON public.portfolio_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

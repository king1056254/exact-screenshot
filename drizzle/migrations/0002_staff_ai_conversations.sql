CREATE TABLE public.ai_conversations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 staff_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
 title text NOT NULL DEFAULT 'New conversation',
 messages jsonb NOT NULL DEFAULT '[]'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_conversations TO authenticated;
GRANT ALL ON public.ai_conversations TO service_role;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff own conversations" ON public.ai_conversations FOR ALL TO authenticated USING (staff_id = auth.uid() AND public.is_staff(auth.uid())) WITH CHECK (staff_id = auth.uid() AND public.is_staff(auth.uid()));
CREATE TRIGGER ai_conversations_updated BEFORE UPDATE ON public.ai_conversations FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX ai_conversations_owner_updated ON public.ai_conversations(staff_id, updated_at DESC);
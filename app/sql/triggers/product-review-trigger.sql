drop function if exists public.handle_review() CASCADE;
CREATE FUNCTION public.handle_review()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products
    SET stats = jsonb_set(stats, '{reviews}', (COALESCE(stats->>'reviews', '0')::int + 1)::text::jsonb)
    WHERE product_id = NEW.product_id;

    RETURN NEW;
END;
$$;


CREATE TRIGGER review_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.handle_review();

drop function if exists public.handle_review_delete() CASCADE;
CREATE FUNCTION public.handle_review_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products
    SET stats = jsonb_set(stats, '{reviews}', (COALESCE(stats->>'reviews', '0')::int - 1)::text::jsonb)
    WHERE product_id = OLD.product_id;

    RETURN OLD;
END;
$$;

CREATE TRIGGER review_delete_trigger
AFTER DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.handle_review_delete();
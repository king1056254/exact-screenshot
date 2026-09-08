
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.is_staff(uuid) from public, anon;
revoke execute on function public.is_admin(uuid) from public, anon;
revoke execute on function public.owns_client(uuid) from public, anon;
revoke execute on function public.owns_project(uuid) from public, anon;
revoke execute on function public.owns_invoice(uuid) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.is_staff(uuid) to authenticated;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.owns_client(uuid) to authenticated;
grant execute on function public.owns_project(uuid) to authenticated;
grant execute on function public.owns_invoice(uuid) to authenticated;

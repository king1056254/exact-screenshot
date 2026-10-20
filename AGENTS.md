<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Staff AI conversations use route-derived IDs and owner-scoped Cloud records with AI SDK UIMessage streams, so history remains isolated across devices.
- AI providers and credentials remain in server-only helpers; authenticated streaming handlers verify staff membership before any model call.
- Presentation records use explicit demo markers and dependency-aware cleanup; never generate fake authentication accounts.

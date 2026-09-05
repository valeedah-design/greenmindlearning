import { Compass } from "lucide-react";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink } from "@/components/site/ui";

export default function NotFound() {
  return (
    <div className="bg-mist px-6 py-28 lg:py-36" data-testid="not-found-page">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-light text-forest">
            <Compass className="h-10 w-10" />
          </span>
        </Reveal>
        <MaskedLines
          className="mt-8 font-display text-6xl font-black tracking-tight text-ink md:text-7xl"
          lines={[<>4<span className="text-forest">0</span>4</>]}
        />
        <Reveal delay={0.2}>
          <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
            This page took a wrong turn.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-body">
            The page you're looking for wilted away — or never sprouted. Let's get you back on the path.
          </p>
          <div className="mt-8">
            <ButtonLink to="/" variant="primary" testid="not-found-home-button" arrow>
              Back to Home
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
